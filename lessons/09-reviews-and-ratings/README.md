# Lesson 09: Reviews And Ratings

## Problem

The book detail page needs review information:

- Average rating
- Number of reviews
- Latest review comments

This data lives in the `reviews` collection, not directly inside each book.

## Concepts

- `$lookup`
- `$size`
- `$avg`
- `$ifNull`
- `$slice`
- Nested projection

## Collections Used

- `books`
- `reviews`

## Teaching Goal

Students should learn how aggregation can prepare a complete detail page response in one database request.
