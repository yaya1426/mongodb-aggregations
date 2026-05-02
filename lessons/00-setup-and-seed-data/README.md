# Lesson 00: Setup And Seed Data

In this lesson, you prepare the MongoDB database used by the whole workshop.

We are building a small library website. The website has books, authors, users, reviews, and reading activity.

## Goal

By the end of this lesson, your Atlas database should contain sample data that all later lessons can query.

## Collections

Create a database named `library_workshop` with these collections:

- `authors`
- `books`
- `users`
- `reviews`
- `reading_events`

## Seed The Data

Copy each JSON file from `data/` into its matching collection:

- `data/authors.json` -> `authors`
- `data/books.json` -> `books`
- `data/users.json` -> `users`
- `data/reviews.json` -> `reviews`
- `data/reading_events.json` -> `reading_events`

If your Atlas screen only accepts one document at a time, use MongoDB Compass import or the seed script in `lessons/11-nodejs-library-api/`.

## Why The IDs Are Strings

MongoDB requires every document to have a unique `_id` inside its collection. That `_id` does not have to be an `ObjectId`.

This workshop uses readable string IDs such as:

```json
"_id": "book-the-moon-garden"
```

That makes relationships easier to see when we later join collections:

```json
"authorIds": ["author-leo-rivera"]
```

## Quick Check

After inserting the data, run this in Atlas, Compass, or MongoDB Shell:

```js
use("library_workshop");

db.books.countDocuments();
db.authors.countDocuments();
```

You should see books and authors in the database before continuing.

## Tip

If a later query returns no results, come back here and confirm you are using the `library_workshop` database and that the collection names are spelled exactly as shown.
