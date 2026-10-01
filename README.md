# Armstrong Gyasi — Portfolio

My personal portfolio website. Built by hand with plain HTML, CSS, and
JavaScript — no frameworks, no libraries, just the fundamentals.

## What's inside

```
portfolio/
│
├── index.html          # all sections: hero, about, skills, projects,
│                       # journey, principles, stats, contact
│
├── css/
│   └── style.css       # design tokens, layout, animations, responsive rules
│
├── js/
│   └── main.js         # nav, scroll reveals, counters, form validation
│
├── images/
│   └── projects/       # SVG previews for the three project cards
│
└── README.md           # this file
```

## Running it

No build step. Open `index.html` in a browser, or serve the folder with any
static server (e.g. `npx serve` or VS Code's Live Server).

## Design notes

- Dark theme with a restrained blue/purple accent system
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels)
- Scroll reveals use `IntersectionObserver`, counters use
  `requestAnimationFrame`
- `prefers-reduced-motion` is respected throughout
- Mobile menu kicks in below 720px; layouts are fluid between phone and desktop

## Things still to do

- [ ] Replace placeholder "Live Demo" / "View Code" links with real URLs
- [ ] Add real GitHub / LinkedIn / Email links
- [ ] Wire the contact form to a backend (once I build it — that's the plan)
- [ ] Add more projects as I build them
