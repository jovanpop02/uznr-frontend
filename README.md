# UZNR — Frontend

Vue 3 + Vite frontend for Udruženje zaštite na radu Crne Gore.

## Local development

```sh
npm install
npm run dev
```

The dev server proxies nothing; API calls go straight to the URL in
`VITE_API_BASE_URL`, falling back to `http://localhost:8000` (see `src/api.js`).

## Deployment

Deploys are automatic. Pushing to `master` on
[jovanpop02/uznr-frontend](https://github.com/jovanpop02/uznr-frontend)
triggers a Netlify build of https://uznr.netlify.app — no manual
`netlify deploy` step is needed.

Build settings live in `netlify.toml`. SPA routing is handled by
`public/_redirects`, which Vite copies into `dist/` at build time.

The production API base URL is committed in `.env.production`, so the build
needs no environment variables configured on Netlify.

## Backend

The API is a Django app deployed on Render's free tier, which spins down after
~15 minutes of inactivity. The first request after an idle period waits for a
cold start, so news and announcements can take up to a minute to appear.
