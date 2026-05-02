# Lesson 07: Grouping Stats

This lesson creates summary data for the library website.

The website wants to show genre statistics:

- How many books are in each genre?
- What is the average price?
- How many total copies are in stock?
- What is the newest published year in each genre?

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How `$group` summarizes many documents.
- How `$sum` counts or totals values.
- How `$avg` calculates averages.
- How `$max` finds the largest value.
- How `$round` makes numbers easier to display.

## Collection Used

- `books`

## Key Idea

`$group` changes the shape of the data.

Before `$group`, each document is one book. After `$group`, each document is one genre summary.

## Tips

- The `_id` field inside `$group` is the grouping key.
- Use `_id: "$genre"` to create one group per genre.
- Use `_id: null` if you want one summary for all documents.
- After grouping, fields from the original documents are gone unless you calculate or carry them forward.

## Try It Yourself

Change the grouping key from `"$genre"` to `"$language"` and see how the result changes.
