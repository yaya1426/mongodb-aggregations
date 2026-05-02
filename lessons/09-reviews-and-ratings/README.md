# Lesson 09: Reviews And Ratings

This lesson builds a book detail response with review information.

The book detail page needs:

- Average rating.
- Number of reviews.
- Latest review comments.

Reviews are stored in the `reviews` collection, so the book document does not have this summary by itself.

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How to use `$lookup` with a pipeline.
- How `$expr` compares fields and variables.
- How `$size` counts array items.
- How `$avg` calculates a rating average.
- How `$ifNull` handles books with no reviews.
- How `$slice` limits an array in the output.

## Collections Used

- `books`
- `reviews`

## Key Idea

Aggregation can prepare a complete detail page response in one database call.

The API does not need to fetch the book, then fetch reviews, then calculate ratings in application code.

## Tips

- `$lookup` with `pipeline` is useful when the joined data needs filtering or sorting.
- `$ifNull` is helpful when optional data may not exist.
- `$avg: "$reviews.rating"` can average numeric values inside an array of joined documents.
- Use `$slice` when the UI only needs the latest few items.

## Try It Yourself

Change the book ID in `$match` to `book-the-moon-garden` or `book-clean-architecture-for-teams` and compare the review summary.
