# Bookmark Manager

A small React app for saving, organizing and finding useful links.
Homework project for the 10x FrontEnd course (React module).

**Live demo:** https://2026-09-19-homework-react-project.vercel.app
**Repository:** https://github.com/kiberdave/2026.09.19.Homework-React-Project

## Features

- **Bookmark list** — cards with title, URL, description and tags, rendered with `.map()` and a stable `key` (bookmark `id`)
- **Add bookmark** — controlled form in a modal window
- **Validation** — title is required, URL is required and must start with `http://` or `https://`, at least one tag is required; errors are shown under each field
- **Edit bookmark** — the same form opens pre-filled with the current values
- **Delete bookmark** — with a confirmation dialog
- **Pin / Unpin** — pinned bookmarks always stay at the top of the list
- **Archive / Restore** — separate *All bookmarks* and *Archived* views
- **Search** — by title and description, updates while you type
- **Filter by tag** — including an *All* option
- **Sorting** — Newest, Oldest, A–Z, Z–A
- **Empty states** — for an empty list, an empty search result and an empty archive
- **Loading state** — shown on first load (network delay simulated with `setTimeout`)
- **localStorage** — bookmarks and theme survive a page refresh
- **Light / Dark theme** — toggle in the header

## Tech stack

- React 19 (functional components, `useState`, `useEffect`)
- Vite
- Plain CSS with CSS variables for theming
- `fetch` + `localStorage`

No external state managers or form libraries are used.

## How data works

`public/data/bookmarks.json` contains 24 starter bookmarks. On the very first launch the app loads them with `fetch("/data/bookmarks.json")`. After that every change is saved to `localStorage`, and on the next visit the app reads from `localStorage` instead of the JSON file.

To reset to the starter data: DevTools → Application → Local Storage → delete the `bookmarks` key and refresh.

## Component structure

```
App
├── Layout
│   ├── Sidebar
│   │   └── FilterBar
│   └── Header
│       └── SearchBar
├── SortSelect
├── Loader / EmptyState
├── BookmarkList
│   └── BookmarkCard
│       └── TagList
└── Modal
    └── BookmarkForm
```

`App` holds the state and event handlers. The other components receive data through props and report user actions back through callback props. `Layout`, `Header`, `Sidebar` and `Modal` use `props.children`.

## Run locally

```bash
git clone https://github.com/kiberdave/2026.09.19.Homework-React-Project.git
cd 2026.09.19.Homework-React-Project
npm install
npm run dev
```

Then open http://localhost:5173

Production build:

```bash
npm run build
npm run preview
```
