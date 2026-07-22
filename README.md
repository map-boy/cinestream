# CineStream

A modern, high-performance film streaming platform with a sleek dark UI, built with React, TypeScript, and Tailwind CSS. Movie and TV data is powered by The Movie Database (TMDB).

Built by VAF Ubwenge Tech.

## Features

- Dark, Netflix-style UI with smooth animations (Framer Motion)
- Hero carousel, trending/popular/latest rows, genre browsing
- Search with live filters (genre, rating, year, sort)
- Movie detail pages with related titles
- Custom video player with progress tracking
- Continue Watching and My List powered by Firebase Auth and Firestore
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

- Frontend: React 19, TypeScript, Tailwind CSS, Framer Motion
- Data: TMDB API
- Backend: Firebase (Authentication and Firestore)
- Build tool: Vite

## Run Locally

Prerequisites: Node.js

1. Install dependencies:
   npm install

2. Create a .env file in the project root (see .env.example) and add your TMDB API key:
   VITE_TMDB_API_KEY=your_tmdb_api_key_here

   Get a free key at themoviedb.org, under Settings then API.

3. Run the app:
   npm run dev

## Deployment

This project is set up to deploy easily on Vercel. Add VITE_TMDB_API_KEY as an environment variable in your Vercel project settings.

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

## License

All rights reserved 2026 VAF Ubwenge Tech.
