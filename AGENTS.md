# Repository guide

This is a dependency-free bilingual static site for an occupational therapy practice.

- English is served from `/`; Hebrew is served from `/he/` with RTL layout.
- Keep both pages structurally equivalent and keep their copy aligned with `en.json` and `he.json`.
- Preserve the privacy-first design: no cookies, analytics, external fonts, CDNs, or client-side JavaScript unless explicitly requested.
- Strip location and camera metadata from new images before committing them.
- Run `npm test` after every content, navigation, styling, or deployment change.
- Deployment is handled only by `.github/workflows/pages.yml`; do not add Azure workflows or a `CNAME` file.
