# Lesson 11: Node.js Library API

## Problem

Now we want to use aggregation pipelines from application code.

This small Express app connects to MongoDB Atlas and exposes API endpoints for the book website.

## Endpoints

- `GET /health`
- `GET /books`
- `GET /books/:id`
- `GET /homepage`
- `GET /genres/stats`
- `GET /authors/:id/books`
- `GET /books/:id/reviews-summary`

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection string.

```bash
npm run seed
npm run dev
```

Open:

```text
http://localhost:3000/books
http://localhost:3000/homepage
http://localhost:3000/genres/stats
```

## Teaching Goal

Students should understand that aggregation pipelines are normal JavaScript arrays when used with the MongoDB Node.js driver.

The same stages they practiced in Atlas can power real backend endpoints.
