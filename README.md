# CineStream

A film and television discovery platform with a dark, responsive UI, built with React, TypeScript and Tailwind CSS. Metadata is powered by The Movie Database (TMDB); full-length playback is limited to public domain titles served from the Internet Archive.

Built by VAF Ubwenge Tech, Kigali, Rwanda.

## Features

- Hero carousel, trending/popular/latest rows and genre browsing
- Search with live filters (genre, rating, year, sort)
- Detail pages with synopsis, cast, ratings and reviews
- Trailer playback via YouTube embeds; full films via the Internet Archive for public domain titles only
- Continue Watching and My List backed by Firebase Auth and Firestore
- Catalogue views at their own URLs (`/movies`, `/tv-shows`, `/trending`, `/my-list`), each prerendered with its own title, description and intro
- Full-film playback limited to titles verified against the Internet Archive, labelled "Full film" wherever they appear; every other title is labelled trailer-only
- A 25-article blog, prerendered to static HTML at build time for crawlers
- Static company and legal pages: about, contact, FAQ, privacy, cookies, terms, disclaimer/DMCA

## Tech Stack

- Frontend: React 19, TypeScript, Tailwind CSS, Motion
- Data: TMDB API
- Backend: Firebase Authentication and Firestore
- Build: Vite, with a post-build prerender step (`scripts/prerender.ts`)

## Run Locally

Prerequisites: Node.js 20+.

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in the values (see below).
3. Start the dev server: `npm run dev`

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_TMDB_API_KEY` | Yes | TMDB API key. Without it the catalogue cannot load and the home page shows an explanatory notice instead. Get one free at themoviedb.org under Settings → API. |
| `VITE_ADSENSE_CLIENT_ID` | No | AdSense publisher ID (`ca-pub-…`). Falls back to the ID hardcoded in `vite.config.ts`, which must match `public/ads.txt`. |
| `VITE_AD_SLOTS` | No | Manual ad units, as `placement:slotId` pairs (`home-mid`, `home-footer`, `blog-index`, `article-inline`, `article-end`), e.g. `home-mid:1234567890`. Placements with no real slot ID render nothing; the loader script and Auto ads work regardless. |
| `VITE_INFOLINKS_PUB_ID` | No | Infolinks publisher ID. Left blank, the Infolinks script is stripped from the build entirely. |
| `VITE_MEDIANET_CID` | No | Media.net customer ID. Left blank, the Media.net script is stripped from the build entirely. |

Leaving the secondary ad networks unset is recommended while an AdSense site review is pending: unconfigured scripts produce broken third-party requests and unfilled slots.

## Build

```
npm run build      # vite build, then prerender blog pages and regenerate sitemap.xml
npm run lint       # tsc --noEmit
npm run preview    # serve dist/ locally
```

The prerender step writes a static HTML snapshot of `/blog` and every article into `dist/`, each with its own title, meta description, canonical URL and BlogPosting structured data, and rewrites both `dist/sitemap.xml` and `public/sitemap.xml`. React replaces the snapshot markup on hydration, so visitors still get the full application while crawlers that do not execute JavaScript see the article text.

## Deployment

Deploys to Vercel. `vercel.json` provides the SPA rewrite (needed for `/blog/*` to resolve on a direct hit), asset caching and the `ads.txt` content type. Set `VITE_TMDB_API_KEY` in the Vercel project's environment variables.

## Content and advertising policy

- Full-length playback is offered only for titles verified against the Internet Archive as public domain. No unlicensed third-party embeds are used, and no video is hosted here.
- Ad placements are labelled and separated from content. Nothing in the rankings, ratings or articles is influenced by an advertiser.
- Every blog article is written by the team. See `public/disclaimer.html` for the copyright and takedown procedure.

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

## License

All rights reserved, VAF Ubwenge Tech.
