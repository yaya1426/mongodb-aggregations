# Lesson 02: CRUD For Library Books

CRUD means create, read, update, and delete.

In a real library website, an admin might add a new book, update its price, increase stock, or remove a draft.

## Run This File

Open and run examples from:

```text
queries.mongodb.js
```

This lesson creates a temporary demo book and deletes it at the end.

## What You Will Learn

- How to insert one document with `insertOne()`.
- How to update fields with `$set`.
- How to increase a number with `$inc`.
- How to remove one document with `deleteOne()`.

## Collection Used

- `books`

## Key Idea

CRUD changes stored documents. Aggregation usually reads, transforms, and summarizes documents.

Aggregation is not a replacement for CRUD. It solves different problems.

## Tips

- `$set` replaces or creates specific fields without replacing the whole document.
- `$inc` is useful for counters, stock, view counts, and numeric changes.
- Always include a careful filter in `updateOne()` and `deleteOne()`.
- In this lesson, the demo document uses `_id: "book-demo-admin-draft"` so it is easy to find and remove.

## Try It Yourself

Before deleting the demo book, run a `findOne()` query to confirm the price and stock changed.
