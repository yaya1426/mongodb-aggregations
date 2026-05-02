# Lesson 10: Homepage With Facet

This lesson builds a homepage response in one aggregation.

The library homepage needs multiple sections:

- Featured books.
- New arrivals.
- Top-rated books.
- Genre stats.

Without aggregation, the backend might run several separate queries and combine the results in code.

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How `$facet` runs multiple sub-pipelines.
- How `$addFields` can prepare values before `$facet`.
- How to reuse previous ideas such as `$lookup`, `$group`, `$sort`, and `$project`.
- How to return an API-shaped response for a full page.

## Collections Used

- `books`
- `reviews`

## Key Idea

`$facet` lets one aggregation return multiple result arrays.

That is useful when one page needs several independent sections.

## Tips

- Stages before `$facet` run once and feed every facet.
- Each field inside `$facet` is its own mini pipeline.
- Keep each facet small with `$limit` when building homepage sections.
- Use clear facet names such as `featuredBooks`, `newArrivals`, and `topRated`.

## Try It Yourself

Add another facet named `lowStockBooks` that returns books where `stock` is greater than `0` and less than or equal to `10`.
