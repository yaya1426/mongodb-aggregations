# Lesson 01: Query API Basics

Before learning aggregation, start with the normal MongoDB Query API.

The library website needs simple pages such as "show me all books" and "show me one book." The Query API is perfect for this kind of direct document access.

## Run This File

Open and run examples from:

```text
queries.mongodb.js
```

Run one query at a time so you can inspect the result.

## What You Will Learn

- How to use `find()` to return many documents.
- How to use `findOne()` to return one document.
- How filters select matching documents.
- How projections choose which fields to return.
- How `sort()` and `limit()` affect the result.

## Collection Used

- `books`

## Key Idea

A MongoDB query usually answers:

```text
Which documents do I want?
Which fields do I want back?
```

For example, a book listing page may not need the full description. It might only need the title, genre, price, stock, and cover image.

## Tips

- MongoDB returns `_id` by default unless you hide it with `_id: 0`.
- Projection values like `title: 1` mean "include this field."
- Filters are exact by default. `genre: "Technology"` will not match `"technology"`.
- Use `limit()` while learning so the result stays easy to read.

## Try It Yourself

Change the genre from `Technology` to `Cooking`, `Mystery`, or `Science Fiction` and rerun the query.
