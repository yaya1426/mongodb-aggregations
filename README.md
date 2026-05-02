# MongoDB Aggregations Library Workshop

This workspace is a lesson-by-lesson workshop for teaching MongoDB from the Query API to aggregation pipelines.

The example problem is a small book showcase website. Visitors can browse books, filter by genre, view author details, see ratings, and load homepage sections such as featured books and top-rated books.

## How To Use This Workshop

1. Create a MongoDB Atlas cluster.
2. Create a database named `library_workshop`.
3. Create these collections:
   - `books`
   - `authors`
   - `users`
   - `reviews`
   - `reading_events`
4. Copy the JSON arrays from the files in `data/` into the matching collections.
5. Walk through the folders in `lessons/` in order.

## Lesson Path

The first lessons use the MongoDB Query API for CRUD operations. This helps explain what MongoDB can already do with normal document queries.

After that, the lessons introduce aggregation pipelines to solve problems that are difficult or awkward with simple CRUD queries, such as grouping, joining, calculating ratings, and building a homepage response.

## Folder Guide

- `data/` contains copy-paste sample JSON documents.
- `lessons/` contains short lesson notes and runnable MongoDB examples.
- `lessons/11-nodejs-library-api/` contains a small Express app that connects to MongoDB Atlas and uses aggregation pipelines in API routes.

## Teaching Note

For beginners, run the examples first in MongoDB Atlas Data Explorer or MongoDB Compass. Once the pipeline stages are familiar, show the final Node.js project to demonstrate how the same ideas power real backend endpoints.
