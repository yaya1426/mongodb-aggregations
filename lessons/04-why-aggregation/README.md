# Lesson 04: Why Aggregation?

This lesson explains why aggregation pipelines exist.

The website now needs book cards with calculated fields:

- The book title.
- The genre.
- Whether the book is in stock.
- A display price.
- The number of tags.

The Query API can fetch the document, but the application would still need to calculate and reshape the response.

## Run These Files

First run:

```text
queries.mongodb.js
```

Then run:

```text
aggregation.mongodb.js
```

Compare the output.

## What You Will Learn

- The difference between fetching documents and shaping a response.
- How an aggregation pipeline is an array of stages.
- How `$match` filters documents.
- How `$project` controls and calculates output fields.

## Collection Used

- `books`

## Key Idea

Aggregation lets MongoDB transform data before it reaches your application.

Instead of fetching raw documents and writing extra JavaScript, you can ask MongoDB to return documents already shaped for your page or API.

## Tips

- A pipeline runs from top to bottom.
- Each stage starts with a `$` operator, such as `$match` or `$project`.
- `$project` can include existing fields and create new calculated fields.
- If a pipeline feels confusing, temporarily remove later stages and run it again.

## Try It Yourself

Add `publishedYear` to the aggregation output, then rerun the pipeline.
