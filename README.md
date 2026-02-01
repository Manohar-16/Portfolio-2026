# Manohar Rao – Portfolio

A modern, responsive personal portfolio for a Web / WordPress & Landing Page Developer. Built with **HTML**, **Tailwind CSS**, and **vanilla JavaScript** (no frameworks).

## Features

- **Dark / light theme** – Toggle with persistence (localStorage)
- **Animated hero** – Typing effect for roles (Web Developer, WordPress Specialist, etc.)
- **Sticky navbar** – Background on scroll, smooth anchor scrolling
- **Projects** – Card hover effects and modal preview on click; direct links to live sites
- **Skills** – Animated cards with Intersection Observer
- **Contact** – Form UI (no backend); email, phone, and location displayed
- **Accessible** – Skip link, semantic HTML, ARIA where needed, focus styles
- **Responsive** – Mobile, tablet, and desktop
- **Performance** – Minimal JS, passive scroll listener, reduced-motion support

## Project structure

```
portfolio-2026/
├── index.html      # Single-page markup, Tailwind config in head
├── css/
│   └── styles.css  # Custom animations, navbar, buttons, cards, form
├── js/
│   └── main.js     # Typing, theme, scroll, observer, modal, form
└── README.md
```

## Setup and run

1. **Clone or download** this folder.
2. **Open in browser**
   - Double-click `index.html`, or  
   - Use a local server (recommended for correct path resolution):
     - **Node:** `npx serve .` then open `http://localhost:3000`
     - **Python 3:** `python -m http.server 8000` then open `http://localhost:8000`
     - **VS Code:** Install “Live Server” and “Open with Live Server” on `index.html`

No build step or npm install is required. Tailwind is loaded via CDN in `index.html`.

## Tech stack

- HTML5 (semantic, SEO-friendly)
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- Vanilla JavaScript (ES5-style for broad support)
- Google Fonts: Outfit (body), JetBrains Mono (code/tech)

## Browser support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses `classList`, `IntersectionObserver`, and `localStorage`.

## License

Use and modify freely for your own portfolio.
