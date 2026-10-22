# Syncfusion TypeScript Scheduler – Evaluation Guide (Performance)

Plain TypeScript (no framework) port of the React `evaluation-guide` sample, built with Vite. Only the **Performance** tab is migrated.

## Run
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure
| React | TypeScript |
|---|---|
| `App.jsx` / `App.css` | `src/main.ts`, `src/app.css`, `index.html` |
| `schedule-samples/Performance/Performance.jsx` | `src/schedule-samples/performance/performance.ts` |
| `schedule-samples/Performance/Performance.css` | `src/schedule-samples/performance/performance.css` |
| `schedule-samples/Performance/performance-datasource.ts` | same file, unchanged |
| `styles/Performance.css` | `src/styles/Performance.css` |

Uses `@syncfusion/ej2-schedule`, `ej2-navigations`, `ej2-buttons`, `ej2-dropdowns` pinned to 33.1.44 with the tailwind3 CDN theme (same as the React sample). Register your license key in `src/main.ts`.
