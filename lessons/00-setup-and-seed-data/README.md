# Lesson 00: Setup And Seed Data

## Problem

Before writing queries, we need a small database that feels like a real website.

The app idea is a library website where users can browse books, see authors, read ratings, and discover popular books.

## Atlas Setup

1. Create or open a MongoDB Atlas cluster.
2. Create a database named `library_workshop`.
3. Create these collections:
   - `authors`
   - `books`
   - `users`
   - `reviews`
   - `reading_events`
4. Insert the matching JSON from the `data/` folder into each collection.

## Why String IDs?

The sample data uses readable string IDs such as `book-the-moon-garden` and `author-leo-rivera`.

This makes the workshop easier to teach because students can understand relationships before learning about `ObjectId`.

## What Students Should Know By The End

Students should understand that MongoDB stores related business data as documents in collections, and that the same dataset can be queried in different ways depending on the product feature.
