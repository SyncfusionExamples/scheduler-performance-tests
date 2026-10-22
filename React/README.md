# Syncfusion React Scheduler – Evaluation Guide (Performance)

Standalone React app (Vite) containing only the **Performance** module of the React `evaluation-guide` sample.

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
| Original evaluation guide | Standalone app |
|---|---|
| `App.jsx` (5 tabs) / `App.css` | `src/App.jsx` (Performance tab only) / `src/App.css` |
| `index.html` → `./main.jsx` | `index.html`, `src/main.jsx` |
| `schedule-samples/Performance/*` | `src/schedule-samples/Performance/*` (unchanged except a stray `debugger` removed) |
| `styles/Performance.css` | `src/styles/Performance.css` |

Syncfusion packages pinned to 33.1.44 with the tailwind3 CDN theme. Register your license key in `src/main.jsx`.
