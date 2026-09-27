# GeoLab — O/L Geography

A Next.js prototype for a textbook-grounded O/L Geography study workspace using the supplied Grade 10 and Grade 11 English Geography textbooks.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/app/page.tsx` — Geography workspace UI
- `src/app/globals.css` — visual system
- `src/app/api/ask/route.ts` — source-aware study API
- `public/books/` — textbook shelf (add supplied PDFs here)
- `public/data/` — extracted textbook indexes (add supplied text indexes here)
