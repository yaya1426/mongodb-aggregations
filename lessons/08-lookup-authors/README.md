# Lesson 08: Lookup Authors

This lesson joins books with their authors.

The `books` collection stores author IDs, but the website needs to display author names on each book card.

## Run This File

Open and run examples from:

```text
aggregation.mongodb.js
```

## What You Will Learn

- How `$lookup` connects documents from another collection.
- How `localField` and `foreignField` match values.
- How to join when the local field is an array.
- How `$map` reshapes joined documents.

## Collections Used

- `books`
- `authors`

## Key Idea

MongoDB documents often store references to related documents. `$lookup` lets an aggregation pipeline fetch those related documents.

In this lesson:

```text
books.authorIds -> authors._id
```

## Tips

- `$lookup` returns an array, even if it finds only one matching document.
- The `from` value must be the collection name, not the database name.
- String IDs must match exactly.
- Use `$project` after `$lookup` to avoid returning large nested documents you do not need.
- `$lookup` is useful, but repeated joins can become expensive at scale. MongoDB recommends considering embedded or denormalized models when related data is frequently read together.

## Try It Yourself

Add `bio` to the author output, then remove it again to keep the book card response small.

## Scale Discussion

After running the example, read `scaling-and-data-modeling.md`.

That note explains why `$lookup` can be a performance problem at scale, when it is still reasonable, and how to reduce joins by changing the MongoDB data model.
