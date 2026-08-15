# Head of House Election Ballot (Vite + TypeScript)

A simple voting app built with **Vite**, **TypeScript**, and **Tailwind CSS**, using plain DOM manipulation instead of a UI framework. Voters pick their name and a candidate from two dropdowns, cast a vote, and view live results in a modal — all client-side, no backend required.

![Hackathon 3.0](https://img.shields.io/badge/Hackathon-3.0-132743?style=flat-square&labelColor=132743&color=f59e0b)

## Features

- 🗳️ **Cast a vote** — select a voter and a candidate, then submit the ballot
- 🚫 **Duplicate-vote prevention** — each voter can only vote once; re-selecting a voter who has already voted is blocked
- 📊 **Results modal** — view total votes, a per-candidate breakdown, and the current winner in a popup dialog
- ✅ **Input validation** — alerts if a voter or candidate hasn't been selected
- ⚡ **No framework** — built with vanilla TypeScript and direct DOM manipulation (`document.getElementById`, event listeners, etc.)
- 🎨 **Styled with Tailwind CSS**

## Tech Stack

| Layer | Technology |
|---|---|
| Build tool | [Vite](https://vitejs.dev) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Vanilla DOM APIs (no framework) |

## Project Structure

```
voting-UI-DOM/
├── index.html         # App markup — dropdowns, buttons, and results modal
├── src/
│   ├── main.ts          # All voting logic — state, validation, rendering results
│   └── style.css        # Tailwind entry point
├── public/               # Static assets (favicon, icons)
├── package.json
└── tsconfig.json
```

> Note: the `DOM/` folder in this repo contains earlier drafts/experiments and isn't part of the running app — the entry point is the root `index.html` / `src/main.ts`.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- npm

### Installation

```bash
git clone https://github.com/nnamdi-security/voting-UI-DOM.git
cd voting-UI-DOM
npm install
```

### Run the development server

```bash
npm run dev
```

Vite will print a local URL (typically [http://localhost:5173](http://localhost:5173)) — open it in your browser.

### Other scripts

```bash
npm run build      # Type-check and build for production
npm run preview    # Preview the production build locally
```

## How It Works

- The list of eligible **voters** and **candidates** is hardcoded at the top of `src/main.ts`.
- On load, the script populates the voter and candidate `<select>` elements from those arrays.
- Clicking **Cast Vote**:
  - Validates that both a voter and a candidate are selected
  - Blocks the vote if the selected voter has already voted (tracked in a `Set`)
  - Increments the candidate's tally and the total vote count
- Clicking **Show Results** opens a modal showing each candidate's vote count, the total votes cast, and the current winner.
- All state lives in memory (plain variables/objects in `main.ts`) — refreshing the page resets everything, since there's no database or persistence layer.

## Known Limitations

- No persistence — votes and "who has voted" tracking are lost on page refresh
- Voter and candidate lists are static and must be edited directly in the code
- Results are shown via `alert()`/modal rather than a dedicated results view

## Possible Improvements

- Add persistent storage (e.g. `localStorage` or a backend database)
- Make candidates and voters configurable via an admin view or API
- Replace `alert()` calls with in-page toast notifications
- Add authentication for voters

## License

This project was built for Hackathon 3.0 and is available for learning and reference purposes.

## Author

**Nnamdi** ([@nnamdi-security](https://github.com/nnamdi-security))
