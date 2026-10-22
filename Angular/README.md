# Syncfusion Angular Scheduler – Evaluation Guide (Performance)

Angular port of the React `evaluation-guide` sample. Only the **Performance** tab is migrated.

## Run
```
npm install
npm start        # http://localhost:4200
```

## Structure
| React | Angular |
|---|---|
| `App.jsx` / `App.css` | `src/app/app.ts`, `app.html`, `app.css` |
| `schedule-samples/Performance/Performance.jsx` | `src/app/schedule-samples/performance/performance.component.ts` + `.html` |
| `schedule-samples/Performance/Performance.css` | `src/app/schedule-samples/performance/performance.component.css` |
| `schedule-samples/Performance/performance-datasource.ts` | same file, unchanged |
| `styles/Performance.css` | `src/styles/Performance.css` (imported in `src/styles.css`) |
| `index.html` (tailwind3 CDN theme 33.1.44) | `src/index.html` (same CDN theme) |

Syncfusion packages are pinned to 33.1.44 to match the React sample's theme. Register your license key in `src/main.ts`.
