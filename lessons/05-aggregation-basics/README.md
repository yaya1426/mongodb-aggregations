# Lesson 05: Aggregation Basics

This lesson builds a clean book listing response with a basic aggregation pipeline.

The website does not need every field from every book document. It needs a small response for a public listing page.

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How stage order affects the result.
- How `$match` filters documents.
- How `$sort` orders documents.
- How `$limit` keeps the result small.
- How `$project` returns only the fields needed by the frontend.

## Collection Used

- `books`

## Key Idea

Think of the pipeline as a series of steps:

```text
Start with books -> keep available books -> sort newest first -> take 6 -> shape the output
```

Each step receives the output from the previous step.

## Tips

- Put `$match` early when possible.
- Put `$limit` before expensive later work when you only need a small number of documents.
- Use `$project` at the end to make the response easier for the frontend to consume.
- The order of stages is part of the design. Moving a stage can change the result.

## Try It Yourself

Change `$limit` from `6` to `3`, then change the sort from `createdAt` to `price`.
