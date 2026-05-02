# Lesson 04: Why Aggregation?

## Problem

The website now needs a book card that shows:

- The title
- The genre
- Whether the book is in stock
- A short display price
- The number of tags

The Query API can fetch documents, but it cannot easily reshape and calculate fields for the response.

## Concepts

- Why aggregation exists
- Pipeline thinking
- `$match`
- `$project`
- Computed fields

## Collections Used

- `books`

## Teaching Goal

Students should understand that an aggregation pipeline processes documents step by step, like an assembly line for data.
