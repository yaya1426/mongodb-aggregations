# Lesson 11: Node.js Library API

This final lesson uses aggregation pipelines from a real Node.js application.

The app is intentionally small. The goal is not to learn Express deeply, but to see that MongoDB aggregation pipelines can power real API endpoints.

## What You Will Learn

- How to connect a Node.js app to MongoDB Atlas.
- How aggregation pipelines are written as JavaScript arrays.
- How API routes can return data shaped by `$lookup`, `$group`, `$project`, and `$facet`.
- How the same ideas from Atlas or Compass move into application code.

## Setup

From this folder:

```bash
npm install
cp .env.example .env
```

Open `.env` and replace the placeholder connection string with your MongoDB Atlas URI:

```text
MONGODB_URI=mongodb+srv://...
DB_NAME=library_workshop
PORT=3000
```

Then seed and run the app:

```bash
npm run seed
npm run dev
```

## Endpoints To Try

Open these URLs in your browser:

```text
http://localhost:3000/health
http://localhost:3000/books
http://localhost:3000/books?genre=Mystery
http://localhost:3000/homepage
http://localhost:3000/genres/stats
http://localhost:3000/authors/author-omar-farouk/books
http://localhost:3000/books/book-the-archive-room/reviews-summary
http://localhost:3000/courses/featured
```

## Endpoint Guide

- `GET /health` checks that the app can reach MongoDB.
- `GET /books` returns book cards with authors and ratings.
- `GET /books?genre=Mystery` filters the book cards by genre.
- `GET /books/:id` returns one book detail response.
- `GET /homepage` returns several homepage sections using `$facet`.
- `GET /genres/stats` returns grouped genre summary data.
- `GET /authors/:id/books` returns one author and their books.
- `GET /books/:id/reviews-summary` returns rating and review summary data.
- `GET /courses/featured` returns Yehia Tech course cards for the frontend demo.

## Key Idea

In Node.js, an aggregation pipeline is just an array:

```js
const pipeline = [
  { $match: { stock: { $gt: 0 } } },
  { $sort: { title: 1 } }
];

const books = await db.collection("books").aggregate(pipeline).toArray();
```

This is the same pipeline style you used in the earlier lessons.

## Tips

- Never commit your real `.env` file to GitHub.
- If `/health` fails, check your Atlas connection string, database user, password, and network access settings.
- If an endpoint returns empty arrays, run `npm run seed` again and confirm `DB_NAME=library_workshop`.
- Start by reading the `/books` route in `server.mjs`; it combines many ideas from previous lessons.

## Next Lesson

Keep this API running, then open `../12-library-frontend` to see these aggregation responses rendered as a website.
