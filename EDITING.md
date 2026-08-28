# Editing your site

Everything you would want to change lives in **one file**:

```
mingyang-site/assets/content.js
```

Open it in any text editor (Notepad works, VS Code is nicer), change your words,
save, refresh the page in your browser. That is the entire workflow. You never
need to touch `index.html`.

---

## The three rules

1. **Keep the quote marks.** Every piece of text sits between `'` or `` ` `` marks.
   Change what is inside them, leave them alone.
2. **Keep the commas** between items in a list.
3. **If your text has an apostrophe, use backticks.** Backtick is the key above
   Tab. A normal apostrophe inside `'single quotes'` breaks the line:

   ```js
   summary: 'It's broken'      <-- this breaks
   summary: `It's fine`        <-- this works
   ```

**If something does break,** the site does not go blank. A red banner appears at
the top telling you what happened in plain words. Undo your last change, save,
refresh, and it comes straight back.

---

## Adding a project

Find the `projects:` list. Copy any block between `{` and `}`, paste it, and
change what is inside:

```js
{ id:'my-new-thing', cat:'ml',
  title:'What it is called',
  proves:'The one line a recruiter reads first',
  sum:'One or two sentences for the card.',
  img:'my-picture.webp',
  tags:['Python','Something else'],
  ctx:[`A paragraph about what it was and why.`,
       `Another paragraph if you want one.`],
  pts:[['Bold bit','the rest of the sentence.'],
       ['','A point with no bold bit.']],
  shots:[['img','picture-one.webp','Caption'],
         ['img','picture-two.webp','Another caption']] },
```

- `id` just has to be unique. Lowercase, no spaces.
- `cat` decides which filter it shows under: `ml`, `data`, `systems` or `web`.
- The count in the heading and on the **All** button update themselves.

**Write `proves` last, and write it hardest.** The research behind this site
said recruiters skip portfolios where they cannot point at a project and say
*this proves they can do the job*. That one line is doing most of the work.

---

## Adding an internship or a role

Find `experience:`. Newest goes at the top. Every role has the **same shape**,
which is what makes them read as one set rather than four different things:

```js
{
  when:    'Jan 2027 to Jun 2027',
  role:    'What you were called',
  org:     'Where',
  logo:    'logo-something.png',
  summary: 'One line. What the job actually was.',
  win:     'The single result worth knowing. This is the red line on the card.',
  detail: {
    intro: [
      `A paragraph of what it really involved.`,
      `A second one if it needs it.`
    ],
    points: [
      ['Automation', 'what you automated and what it saved.'],
      ['Something else', 'the next thing.']
    ],
    stack: ['Excel VBA','SQL'],
    quote: { text: 'Something a manager wrote.', who: 'Their name, their title' },
    shots: [ ['img','a-picture.webp','What it shows'] ]
  }
}
```

**The card shows only the top half:** logo, role, org, `summary`, `win`. Everything
inside `detail` stays hidden until someone clicks the plus. That is deliberate.
A recruiter skimming gets four cards that look alike and compare cleanly, and
only opens the one they care about.

So keep `summary` to one line and `win` to one result. If you find yourself
writing three sentences into `summary`, it belongs in `detail.intro` instead.

Everything inside `detail` is optional. Leave `detail` out entirely and the card
simply does not open, and still looks right next to the others.

Move `lead: true` onto whichever role is newest. That is what puts the
**Most recent** badge on it. Only one role should have it.

**No logo?** Leave the `logo` line out. Do not leave one role logo-less while its
neighbours have one, though. Either all of them carry a mark or none do,
otherwise the odd one reads as a mistake.

## Adding a testimonial

Find `testimonials:`.

```js
{
  quote: [
    'The first paragraph of what they said.',
    'A second paragraph if there is one.'
  ],
  who:  'Their name',
  role: 'Their job title, their company',
  photo: 'their-headshot.webp'      // optional, leave it out if you have none
}
```

**To hold a slot for one you are still waiting on:**

```js
{
  pending: true,
  note: 'Reserved for the X team. On its way.',
  who:  'Company name',
  role: 'Their department'
}
```

That renders as a designed reserved slot, dashed and hatched, so it reads as
deliberate rather than broken. Delete `pending` and `note` and add `quote` when
the real one arrives.

---

## Adding pictures and clips

**The easy way.** Drop your files into:

```
mingyang-site/tools/incoming/
```

Then double-click:

```
mingyang-site/tools/optimise-images.cmd
```

It shrinks everything, files it in the right folder, and prints the exact line
to paste into `content.js`. Your originals get moved to
`tools/incoming/_originals` so nothing is lost.

This matters more than it sounds. A phone photo is often 4 MB. The same picture
as a `.webp` is about 80 KB and looks identical on screen. When I first built
this site your project images totalled 43 MB. They are 2 MB now, with nothing
visibly lost.

**Then use them** in any `shots` list, anywhere on the site:

```js
shots: [
  ['img', 'my-picture.webp', 'Caption under the picture'],
  ['vid', 'my-clip.mp4',     'Caption under the clip']
]
```

Every `shots` list holds as many as you like and becomes a gallery. Clicking any
of them opens the full-size viewer, with arrow keys and Escape.

**Doing it by hand instead?** Pictures go in `assets/img/`, clips go in
`assets/gif/` as silent `.mp4`. Never ship a `.gif`. The six GIFs from your old
site were 13.5 MB; as MP4s they are 757 KB.

---

## Changing your details

The `identity:` block at the top holds your name, email, resume filename and
social links. Change the email there and every link on the page follows,
including the contact form.

To swap your resume: put the new PDF in `assets/`, then point `resume:` at its
filename.

---

## Changing the hero

The `hero:` block holds the four lines that ride over the scrolling video.

Keep them short. They are read in a flick of the scroll wheel, not sat with.
`band2` is already the longest line the layout takes comfortably, so treat it
as the ceiling.

One thing worth knowing if you rewrite them: each line is timed to a moment in
the footage. `band3` sits exactly on the moment the camera punches through the
board surface, which is why its words are about going down and looking. If you
change that line, keep it about the same idea or it stops matching the picture.

---

## The moving background

The lattice drifting behind the whole site is `assets/field.js`. It is
hand-written WebGL, about 3.5 KB compressed, and it draws planes of connected
nodes receding into depth. Scrolling flies you through them, the cursor tilts
the field, and roughly one node in fifty is flagged red.

It switches itself off entirely for anyone who has asked their computer for
reduced motion, and for any browser without WebGL, in which case the drawn CSS
grid carries the background on its own.

If you ever want to tune it, three numbers near the top of `build()` do almost
everything:

- `PLANES` how many lattice planes are in flight at once
- `G` how many nodes across each plane
- `SPAN` how wide a plane is, so smaller means denser on screen

And in `frame()`, the two `setAll(...)` calls end in the line and node
brightness, currently `0.42` and `0.95`. Turn both down if you ever want it
quieter behind a new section.

To remove it completely, delete the one line in `index.html` that loads
`field.js`. Nothing else depends on it.

---

## Things that are deliberate, so you know before changing them

- **Only one number in the proof strip is red.** That is the `accent: true` flag.
  An accent that is everywhere is not an accent.
- **The form goes to your email app,** because a static site has no server. The
  success message says exactly that, on purpose. A fake "message sent" on a page
  aimed at recruiters would be dishonest.
- **Phones get a still image instead of the scrolling video.** That is a design
  decision, not a bug, and it is why the site loads in a quarter of a second on
  a phone.
- **The footer says the hero footage is generated.** Worth keeping.
- **The reticle cursor replaces the normal pointer** on a mouse. It is the
  site's signature element doing a second job. It never blocks a click, and it
  is gone the moment motion is off or the visitor is on a touch screen.
- **Headings resolve from scrambled characters.** That is the site's one idea,
  noise becoming signal, performed by the type. Screen readers get the real
  words the whole time, never the scramble.
- **The scrim over the hero video is a one-sided ramp,** dark across the left
  where the words sit and completely clear on the right where the descent and
  the red point are. It is tuned by measurement: every headline is checked
  against the brightest pixel it can ever sit on. If you make it lighter the
  words start to fail, and if you make it heavier the footage goes muddy.

---

## The motion switch

**Motion is on by default for everyone.** The hero video scrubs, the lattice
drifts, the cursor is a reticle, headings resolve from noise. Nobody has to find
a setting to see the site as it was designed.

There is a small **Motion on / Motion off** switch in the footer. It exists
because `prefers-reduced-motion` is a real accessibility need: screen motion
genuinely makes some people unwell, and a site with no way out of it is a site
those people have to leave. The switch is the way out. It is remembered in that
visitor's browser and never touches a system setting.

Note that this is a deliberate departure from the usual convention. Most sites
follow the system setting automatically. This one does not, because doing so
made the site invisible to its own owner. The switch is the compromise: the
default is the full experience, and the exit is one click and always present.

What it controls:

| On | Off |
|---|---|
| The scrolling hero video | A still, composed hero image |
| The WebGL lattice background | The drawn grid |
| The reticle cursor | Your normal cursor |
| Headings resolving from noise | Headings just there |
| Pictures scanning in | Pictures just there |
| The reading highlight on the About paragraph | The whole paragraph lit |
| Film grain | No grain |
| Card tilt, magnetic buttons, entrances | Everything in its final state |
| Roles opening one at a time | All roles open |

---

## The hero does not play by itself, and the page says so

The hero is a **scrubber**, not a loop. It moves only as you scroll, forward
going down and backward going up, and it stops the moment you stop. Nothing is
broken when it sits still.

Three things now make that obvious rather than leaving a visitor waiting:

- **A bouncing arrow** reading "Scroll to descend" sits under the hero until
  the first scroll, and comes back whenever someone returns to the top.
- **A one-time nudge.** A second after the footage is ready, if nobody has
  scrolled yet, the descent moves forward slightly and falls back. It shows the
  hero responds, once, and then waits.
- **The first-visit notice** says the page moves as you scroll, before anything
  has had a chance to surprise anyone.

If the notice ever says motion is off, that is the whole answer: a previous
visit switched it off and the browser remembered.

---

## When the hero video does not look right

Open `check.html` on the site, for example `http://localhost:8787/check.html`.
It asks your own browser what it is doing and answers in plain words: whether
reduce motion is on, whether the window is triggering the still image, whether
the video downloaded, and whether your browser can seek it, which is the thing
scrubbing actually needs. There is a button to copy the result so you can send
it to me.

Two things worth knowing before you worry:

- **The video does not play by itself.** It moves only as you scroll, forward
  when you scroll down and backward when you scroll up. It is a scrubber, not a
  loop. If you stop scrolling it stops.
- **Reduce motion turns it off entirely,** by design. In Windows that is
  Settings, Accessibility, Visual effects, Animation effects.

---

## Checking your work

Double-clicking `index.html` shows the site with a still hero, because browsers
block video loading from a local file. That is expected.

To see it properly, open a terminal in the `mingyang-site` folder and run:

```bash
npx http-server -p 8787 -c-1
```

Then open `http://localhost:8787` in your browser.

---

## When you want a bigger change

Ask me. Layout, new sections, colours, the hero itself. Tell me what you want in
plain words and I will change it and push it live.
