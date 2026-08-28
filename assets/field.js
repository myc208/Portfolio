/* ===========================================================================
   FIELD.JS  -  the live lattice behind the whole site.

   Planes of connected points receding into depth. Scrolling flies you through
   them, the cursor tilts the whole field, and a handful of nodes are flagged
   red. It is the hero's closing shot turned into something you move through,
   so the page below the video stays in the same world.

   Hand-written WebGL, about 8KB, no library. If the browser cannot do WebGL,
   or the visitor asked for reduced motion, this does nothing at all and the
   drawn CSS grid carries the background on its own.
   =========================================================================== */
(function () {
  'use strict';

  // the page owns the motion decision; this just follows it
  var root = document.documentElement;
  var reduce = { get matches(){ return root.getAttribute('data-motion') === 'off' } };
  var canvas = document.getElementById('fieldCanvas');
  if (!canvas) return;

  var gl, progP, progL, bufP, bufL, nP = 0, nL = 0, raf = null;
  var lp = {}, ll = {}, running = false, ready = false, failed = false;
  var DEPTH = 5.4;

  /* Both programs share this vertex maths, so a node and the lines meeting at
     it always land on exactly the same pixel. The seed comes from the node's
     grid position rather than from a random per vertex, which is what keeps
     the drift identical at both ends of every line. */
  var COMMON = [
    'attribute vec3 aPos;',
    'attribute float aSeed;',
    'uniform float uTravel;',
    'uniform float uDepth;',
    'uniform vec2  uRes;',
    'uniform vec2  uCursor;',
    'uniform float uTime;',
    'varying float vFade;',
    'varying float vSeed;',
    'vec2 project(vec3 pos, float seed, out float z){',
    '  z = mod(pos.z - uTravel, uDepth);',
    '  z = max(z, 0.16);',
    '  vec2 p = pos.xy;',
    '  p.x += sin(uTime * 0.13 + seed * 6.2831) * 0.05;',
    '  p.y += cos(uTime * 0.10 + seed * 6.2831) * 0.05;',
    '  p += uCursor * (0.26 * (1.0 - z / uDepth));',
    '  vec2 proj = p * 1.05 / z;',
    '  proj.x /= (uRes.x / uRes.y);',
    '  return proj;',
    '}',
    'float depthFade(float z){',
    '  float far  = 1.0 - smoothstep(uDepth * 0.55, uDepth, z);',
    '  float near = smoothstep(0.18, 0.95, z);',
    '  return far * near;',
    '}'
  ].join('\n');

  var VERT_P = COMMON + [
    'void main(){',
    '  float z; vec2 proj = project(aPos, aSeed, z);',
    '  gl_Position = vec4(proj, 0.0, 1.0);',
    '  vFade = depthFade(z);',
    '  vSeed = aSeed;',
    '  gl_PointSize = clamp(11.0 / z, 1.5, 34.0) * (uRes.y / 900.0);',
    '}'
  ].join('\n');

  var FRAG_P = [
    'precision mediump float;',
    'varying float vFade;',
    'varying float vSeed;',
    'uniform vec3 uTrace;',
    'uniform vec3 uFlag;',
    'uniform float uAlpha;',
    'void main(){',
    '  vec2 d = gl_PointCoord - 0.5;',
    '  float r = length(d);',
    '  if (r > 0.5) discard;',
    '  float core = smoothstep(0.5, 0.0, r);',
    '  core = core * core;',
    '  float glow = smoothstep(0.5, 0.12, r) * 0.4;',
    '  vec3 col = mix(uTrace, uFlag, step(0.982, vSeed));',
    '  gl_FragColor = vec4(col, (core + glow) * vFade * uAlpha);',
    '}'
  ].join('\n');

  var VERT_L = COMMON + [
    'void main(){',
    '  float z; vec2 proj = project(aPos, aSeed, z);',
    '  gl_Position = vec4(proj, 0.0, 1.0);',
    '  vFade = depthFade(z);',
    '  vSeed = aSeed;',
    '}'
  ].join('\n');

  var FRAG_L = [
    'precision mediump float;',
    'varying float vFade;',
    'varying float vSeed;',
    'uniform vec3 uTrace;',
    'uniform float uAlpha;',
    'void main(){',
    '  gl_FragColor = vec4(uTrace, vFade * uAlpha);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  }
  function link(vsrc, fsrc) {
    var vs = compile(gl.VERTEX_SHADER, vsrc), fs = compile(gl.FRAGMENT_SHADER, fsrc);
    if (!vs || !fs) return null;
    var p = gl.createProgram();
    gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }
  function uniforms(p, into) {
    ['uTravel','uDepth','uRes','uCursor','uTime','uTrace','uFlag','uAlpha']
      .forEach(function (n) { into[n] = gl.getUniformLocation(p, n); });
  }

  function build() {
    var small = innerWidth < 900;
    var PLANES = small ? 8 : 13;        // how many lattice planes are in flight
    var G = small ? 8 : 12;             // nodes per side, per plane
    var SPAN = 2.35;
    var pts = [], lines = [];

    // a stable hash so a node and every line touching it agree exactly
    function seedOf(ix, iy, iz) {
      var h = (ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791);
      h = (h ^ (h >>> 13)) >>> 0;
      return (h % 100000) / 100000;
    }
    function node(ix, iy, iz) {
      var s = seedOf(ix, iy, iz);
      var jx = (seedOf(ix + 7, iy, iz) - 0.5) * 0.13;
      var jy = (seedOf(ix, iy + 7, iz) - 0.5) * 0.13;
      return [
        (ix / (G - 1) * 2 - 1) * SPAN + jx,
        (iy / (G - 1) * 2 - 1) * SPAN + jy,
        iz / PLANES * DEPTH,
        s
      ];
    }
    for (var iz = 0; iz < PLANES; iz++) {
      for (var iy = 0; iy < G; iy++) {
        for (var ix = 0; ix < G; ix++) {
          var a = node(ix, iy, iz);
          pts.push(a[0], a[1], a[2], a[3]);
          if (ix < G - 1) { var r = node(ix + 1, iy, iz);
            lines.push(a[0], a[1], a[2], a[3], r[0], r[1], r[2], r[3]); }
          if (iy < G - 1) { var d = node(ix, iy + 1, iz);
            lines.push(a[0], a[1], a[2], a[3], d[0], d[1], d[2], d[3]); }
        }
      }
    }
    nP = pts.length / 4; nL = lines.length / 4;

    bufP = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufP);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.STATIC_DRAW);
    bufL = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufL);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
  }

  function init() {
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: false,
                                        premultipliedAlpha: false, powerPreference: 'low-power' })
        || canvas.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    if (!gl) return false;
    progP = link(VERT_P, FRAG_P);
    progL = link(VERT_L, FRAG_L);
    if (!progP || !progL) return false;
    uniforms(progP, lp); uniforms(progL, ll);
    build();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);         // additive, so crossings glow
    gl.clearColor(0, 0, 0, 0);
    return true;
  }

  var dpr = 1, W = 0, H = 0;
  function resize() {
    if (!gl) return;                 // nothing to size until the context exists
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    var w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = W = w; canvas.height = H = h;
      gl.viewport(0, 0, W, H);
    }
  }

  var travel = 0, travelTarget = 0, cx = 0, cy = 0, tcx = 0, tcy = 0, t0 = 0;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    travelTarget = (h > 0 ? scrollY / h : 0) * 5.5;
  }
  function onMove(e) {
    tcx = (e.clientX / innerWidth) * 2 - 1;
    tcy = -((e.clientY / innerHeight) * 2 - 1);
  }

  function setAll(loc, t, time, alpha) {
    gl.uniform1f(loc.uTravel, t);
    gl.uniform1f(loc.uDepth, DEPTH);
    gl.uniform2f(loc.uRes, W, H);
    gl.uniform2f(loc.uCursor, cx, cy);
    gl.uniform1f(loc.uTime, time);
    gl.uniform3f(loc.uTrace, 0.498, 0.698, 0.871);   // --trace  #7FB2DE
    gl.uniform3f(loc.uFlag,  1.000, 0.310, 0.247);   // --accent #FF4F3F
    gl.uniform1f(loc.uAlpha, alpha);
  }
  function bind(prog, buffer) {
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    var a = gl.getAttribLocation(prog, 'aPos'), s = gl.getAttribLocation(prog, 'aSeed');
    gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 3, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(s); gl.vertexAttribPointer(s, 1, gl.FLOAT, false, 16, 12);
  }

  function frame(now) {
    if (!running) { raf = null; return; }
    if (!t0) t0 = now;
    var time = (now - t0) / 1000;
    // a flick of the wheel stretches the field forward, then it settles back
    var vel = parseFloat(getComputedStyle(root).getPropertyValue('--scrollvel')) || 0;
    travel += (travelTarget - travel) * 0.055;
    cx += (tcx - cx) * 0.04;
    cy += (tcy - cy) * 0.04;
    resize();
    var t = travel + time * 0.055;                   // keeps drifting at rest
    gl.clear(gl.COLOR_BUFFER_BIT);
    bind(progL, bufL); setAll(ll, t, time, 0.62 + vel * 0.55); gl.drawArrays(gl.LINES, 0, nL);
    bind(progP, bufP); setAll(lp, t, time, 1.00 + vel * 0.45); gl.drawArrays(gl.POINTS, 0, nP);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduce.matches || failed) return;
    if (!ready && !boot()) return;   // first run, or motion switched on later
    if (running) return;
    running = true; canvas.classList.add('on');
    if (raf === null) raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    t0 = 0;
  }

  // Returns whether the field is ready to draw. Safe to call repeatedly: it
  // sets up once, and gives up permanently only if WebGL itself is missing.
  function boot() {
    if (ready) return true;
    if (failed || reduce.matches) return false;
    if (!init()) { failed = true; return false }   // no WebGL: the CSS grid carries it
    ready = true;
    resize(); onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', resize, { passive: true });
    if (matchMedia('(hover:hover) and (pointer:fine)').matches)
      addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    return true;
  }

  // let the page paint and the hero start streaming before spending anything here
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2200 });
  else setTimeout(start, 1000);

  // watch the attribute the page sets, so the motion toggle reaches here too
  new MutationObserver(function () {
    if (reduce.matches) { stop(); canvas.classList.remove('on'); }
    else start();                    // boots on the spot if it never did
  }).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
})();
