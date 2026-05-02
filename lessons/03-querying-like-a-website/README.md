# Lesson 03: Querying Like A Website

Now use the Query API to solve problems that look like real website features.

The public website needs a book listing page, a genre page, a featured books section, tag filtering, and pagination.

## Run This File

Open and run examples from:

```text
queries.mongodb.js
```

## What You Will Learn

- How to combine multiple filter conditions.
- How to match values inside an array.
- How to paginate with `skip()` and `limit()`.
- How to sort by fields such as `createdAt`, `publishedYear`, and `title`.

## Collection Used

- `books`

## Key Idea

The Query API works very well when the result looks mostly like the original documents.

For example, this is easy:

```text
Find available Science Fiction books and show only a few fields.
```

But soon we will need questions like:

```text
What is the average rating for each book?
How many books are in each genre?
Can one query return all homepage sections?
```

Those questions are where aggregation becomes useful.

## Tips

- `tags: "library"` matches documents where the `tags` array contains `"library"`.
- `skip()` is fine for learning and small demos. For very large production datasets, cursor-based pagination is often better.
- Sort order matters: `1` means ascending, `-1` means descending.

## Try It Yourself

Change the featured books query so it only returns featured books in the `Mystery` genre.
