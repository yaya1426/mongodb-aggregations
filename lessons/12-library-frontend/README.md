# Lesson 12: Library Frontend

This lesson adds a small React frontend for the library website.

The goal is to visualize what the aggregation API returns: homepage sections, genre stats, book cards, joined authors, and calculated ratings.

## What You Will Learn

- How a frontend consumes aggregation-powered API endpoints.
- How `$facet` output can become homepage sections.
- How `$group` output can become genre statistic cards.
- How `$lookup` output can become author names on book cards.
- How calculated fields such as `averageRating` and `reviewCount` are useful in UI.

## Start The Backend First

The frontend expects the lesson 11 API to be running on port `3000`.

In one terminal:

```bash
cd lessons/11-nodejs-library-api
npm install
cp .env.example .env
npm run seed
npm run dev
```

Make sure this URL works:

```text
http://localhost:3000/health
```

## Start The Frontend

In a second terminal:

```bash
cd lessons/12-library-frontend
npm install
cp .env.example .env
npm run dev
```

Open:

```text
http://localhost:5173
```

## How The Frontend Talks To The API

During development, Vite proxies frontend requests from:

```text
/api/books
```

to the backend:

```text
http://localhost:3000/books
```

This keeps the lesson simple and avoids adding CORS setup while students are focused on MongoDB.

## What To Click

- Click a genre card to filter the book catalog.
- Click a book card to open the detail drawer.
- Compare the homepage sections with the `/homepage` endpoint from lesson 11.
- Compare the genre cards with the `/genres/stats` endpoint from lesson 11.

## Key Idea

Aggregation pipelines are not just database exercises. They shape API responses that are convenient for real user interfaces.

For example:

- `$facet` creates multiple homepage sections in one response.
- `$lookup` adds author data to book cards.
- `$group` creates stats that are ready to render.
- `$project` keeps the response focused on what the UI needs.

## Tip

If the frontend shows an error, check these in order:

1. The lesson 11 API is running.
2. `http://localhost:3000/health` returns `{ "ok": true }`.
3. The frontend is running on `http://localhost:5173`.
4. The database has been seeded with `npm run seed`.
