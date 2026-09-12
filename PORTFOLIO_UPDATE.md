# Portfolio update and QA — September 10, 2026

## Implemented
- Preserved Next.js 14, TypeScript, Tailwind, Framer Motion, Three.js and Zustand, with a polished navy/cyan OS interface.
- Rebuilt shared window geometry, viewport maximization, restore state, focus/stacking, pointer and keyboard movement/resizing, mobile layout, reduced-motion behavior and labeled controls.
- Corrected title, description, Open Graph and Twitter metadata to undergraduate/developer wording; added Person JSON-LD, sitemap, robots, favicon and loading/error surfaces.
- Updated education, all six skill groups, achievements, leadership, hackathons and two publication records.
- Added all TEN listed projects (nine repository projects and the wall-climbing robot without an invented repository). Used only supplied metrics.
- Added searchable/filterable Certificates & Badges app: six supplied certificates and verified Google Skills sentiment-analysis badge. Preserved originals and corrected upside-down display orientation. Did not misrepresent participation as winning.
- Replaced resume with uploaded HF_RESUME_9.pdf byte-for-byte; prominent direct download plus in-site viewer.
- Improved project search, mobile project selection, terminal commands/history, curated copilot, skills visualization, spacing, typography, focus styles and contrast.

## Verified
- Production build, TypeScript and lint pass.
- All eight window types passed measured fullscreen and restore at 360×800, 390×844, 768×1024 and 1024×768 in a Chromium iframe with a real responsive viewport.
- All eight passed an earlier 1440×900 transition check. Additional desktop/ultrawide tests are included in window-qa.json; the complete 56-case matrix is NOT certified because the browser harness intermittently did not activate the Research toggle at large widths.
- Standalone Research maximize/restore and Certificates fullscreen worked in the actual browser. Certificate screenshot measures exactly x=0,y=0,width=1363,height=936, matching the browser viewport.
- No horizontal overflow on measured window containers. This is not a guarantee for every nested state or physical mobile browser.
- Seven certificate/badge images loaded successfully with descriptive alt text.
- Resume bytes match the uploaded document exactly.
- GitHub profile and nine project repository URLs returned HTTP 200; LegalShe demo and Google badge returned 200. LinkedIn returned 999 and remains unverified. Mailto target was checked; no email was sent.
- Console inspection found browser-extension metadata errors; no application-origin errors were observed in checked interactions.

## Definition-of-done status
| Requirement | Status |
|---|---|
| Every window fullscreen/restore at every breakpoint | Mobile/tablet passed; desktop checks passed, exhaustive ultrawide verification incomplete |
| No console errors/warnings | No app-origin issues observed; extension noise present |
| Responsive 360px–ultrawide | Responsive implementation complete; exhaustive nested-content/device audit incomplete |
| All links | GitHub/demo/badge checked; LinkedIn unverified |
| Accurate metadata | Complete |
| Updated resume | Complete; exact byte match |
| Projects | All ten supplied entries implemented |
| Certificates | Complete; six supplied images plus Google badge |
| Typography | Shared font/spacing/heading system implemented |
| WCAG AA text contrast | Improved; complete measured AA certification not performed |
| Smooth animations | Short transitions/reduced-motion support; no instrumented 60fps certification |
| Favicon/loading state | Implemented |

## Remaining limits
Research paper PDFs/publication certificates were not attached, so publication records have no fabricated download links. No testimonials, metrics, analytics account or proficiency percentages were invented. Dark/light toggle and analytics were optional and were not added. No changes were pushed to GitHub or deployed to Vercel.

## Run
```bash
npm ci
npm run dev
npm run build
npm start
```
Development-only /audit provides the responsive test viewport. It returns not-found in production. Development and production build output directories are separated to avoid concurrent cache collisions.
