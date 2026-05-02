# MongoDB Aggregations Library Workshop

Welcome. This repository is a beginner-friendly MongoDB workshop that starts with the Query API and gradually builds up to aggregation pipelines.

The example project is a small library website. Visitors can browse books, filter by genre, view authors, read ratings, and load homepage sections such as featured books and top-rated books.

## What You Will Learn

- How MongoDB stores data in collections and documents.
- How to use the Query API for basic CRUD operations.
- Why simple queries are not enough for some real website features.
- How aggregation pipelines process data step by step.
- How to use stages such as `$match`, `$project`, `$group`, `$lookup`, `$addFields`, and `$facet`.
- How to call aggregation pipelines from a small Node.js API.

## Requirements

- A MongoDB Atlas account and cluster.
- MongoDB Atlas Data Explorer, MongoDB Compass, or MongoDB Shell.
- Node.js installed locally for the final API lesson.

You can complete lessons `00` to `10` directly in Atlas or Compass without running any local application.

## Quick Start

1. Open your MongoDB Atlas cluster.
2. Create a database named `library_workshop`.
3. Create these collections:
   - `authors`
   - `books`
   - `users`
   - `reviews`
   - `reading_events`
4. Insert the matching JSON files from `data/` into each collection.
5. Open `lessons/README.md` and follow the lessons in order.

## Repository Guide

- `data/` contains ready-to-insert JSON sample data.
- `lessons/` contains the workshop lessons.
- `queries.mongodb.js` files use the normal MongoDB Query API.
- `aggregation.mongodb.js` files use pure MongoDB aggregation pipelines.
- `lessons/11-nodejs-library-api/` contains a small Express app using the MongoDB Node.js driver.

## How To Run Examples

For Atlas or Compass, copy one query or aggregation at a time from the lesson file and run it against the `library_workshop` database.

For MongoDB Shell, open a terminal connected to your Atlas cluster and run the `.mongodb.js` files manually or paste the examples section by section.

## Tips Before You Start

- Read aggregation pipelines from top to bottom. Each stage receives documents from the previous stage.
- Use `$match` early when possible. Filtering first usually means less data for later stages to process.
- Use `$project` to control the shape of the response sent to your application.
- `_id` does not have to be an `ObjectId`. In this workshop, readable string IDs make relationships easier to see.
- `_id` must still be unique inside each collection.
- If a pipeline returns no documents, first check the collection name, database name, and exact string values in `$match`.

## Final Project

The final lesson turns the aggregation examples into real API endpoints:

- `GET /books`
- `GET /books/:id`
- `GET /homepage`
- `GET /genres/stats`
- `GET /authors/:id/books`
- `GET /books/:id/reviews-summary`

This shows how aggregation pipelines move from the database UI into application code.
