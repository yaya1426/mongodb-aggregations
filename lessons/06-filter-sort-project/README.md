# Lesson 06: Filter, Sort, And Project

This lesson improves the book listing page with filters and calculated labels.

The website wants affordable Science Fiction books that are in stock. It also wants a friendly availability label for each book card.

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How to write a more expressive `$match`.
- How to combine conditions with `$and`.
- How to create conditional fields with `$cond`.
- How to join strings with `$concat`.
- How to return frontend-friendly fields with `$project`.

## Collection Used

- `books`

## Key Idea

Aggregation can filter documents and create values that do not exist as stored fields.

For example, `availabilityLabel` is calculated from `stock`.

## Tips

- `$and` is useful when you want to make multiple conditions explicit.
- `$cond` works like an if/else expression.
- `$concat` only works with strings. Convert numbers first if you want to concatenate them.
- Keep calculated field names clear, because the frontend may use them directly.

## Try It Yourself

Change the genre to `Cooking` and the maximum price to `30`. Then adjust the `availabilityLabel` threshold from `10` to `5`.
