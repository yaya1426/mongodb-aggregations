# Lesson 10: Homepage With Facet

## Problem

The website homepage needs multiple sections:

- Featured books
- New arrivals
- Top-rated books
- Genre stats

Without aggregation, the backend might run several separate queries and combine them in code.

## Concepts

- `$facet`
- Parallel sub-pipelines
- Reusing previous stages
- Building one API-shaped response

## Collections Used

- `books`
- `reviews`

## Teaching Goal

Students should see how aggregation can return a complete page model for a real website.
