# Ming Yang, portfolio

Live at **https://myc208.github.io/portfolio/**

A single-page portfolio with a scroll-scrubbed hero video, a WebGL lattice
background, and eighteen projects that open in place. Plain HTML, CSS and
vanilla JavaScript. No framework, no build step, no npm install. What is in
this repository is exactly what the browser runs.

---

## Editing it

Everything you would want to change lives in one file:

```
assets/content.js
```

Your words and your filenames, no code. Change something, save, refresh.
`EDITING.md` walks through adding a project, a role, a testimonial or a
picture, and explains which choices are deliberate.

You never need to open `index.html`.

---

## What is in here

| | |
|---|---|
| `index.html` | The whole site: markup, styles and behaviour in one file |
| `assets/content.js` | **Every word and filename on the site.** The file you edit |
| `assets/field.js` | The WebGL lattice behind the page, hand written, no library |
| `assets/hero-scrub.mp4` | The hero footage, encoded for scroll scrubbing |
| `assets/hero-poster.jpg` | First frame, shown while the video streams in |
| `assets/hero-ending.jpg` | Last frame, used as the phone hero and the link preview |
| `assets/img/` | Project screenshots, logos, portrait |
| `assets/gif/` | Short clips, as silent MP4 rather than GIF |
| `check.html` | A diagnostic page that reports what your browser is doing |
| `tools/` | A drop-folder and script that shrinks images before you add them |
| `.nojekyll` | Stops GitHub Pages hiding files that start with an underscore |

---

## Running it locally

Double-clicking `index.html` shows the site with a **still** hero, because
browsers block video loading from a file opened directly. That state is
designed and looks fine, it just is not the full thing.

For the real thing, serve the folder:

```bash
npx http-server -p 8787 -c-1
```

Then open `http://localhost:8787`.

---

## Two things worth knowing

**The hero does not play by itself.** It is a scrubber: it moves as you
scroll, forward going down and backward going up, and stops when you stop. A
bouncing arrow says so until your first scroll.

**Motion is on by default,** with a switch in the footer to turn it off. Most
sites follow the system reduce-motion setting automatically. This one does not,
because that made the site invisible to its own owner. The switch is the way
out, and the choice is remembered per browser.

---

## Moving to a custom domain

Two absolute URLs at the top of `index.html`, `og:url` and `og:image`, point at
the GitHub Pages address. Change both to the new domain and link previews keep
working. Nothing else in the site uses an absolute path.
