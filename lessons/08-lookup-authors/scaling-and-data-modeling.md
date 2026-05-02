# Scaling Note: When `$lookup` Becomes A Problem

`$lookup` is useful and important to learn. It lets an aggregation pipeline join related data from another collection.

But `$lookup` is not free. At scale, frequent joins can become slower and more expensive than querying one well-designed document.

## What MongoDB Says

MongoDB's `$lookup` documentation says:

> Excessive use of `$lookup` may slow down query performance. To reduce reliance on `$lookup`, consider an embedded data model to store related data in a single collection.

MongoDB's schema design anti-pattern docs also say that `$lookup` is useful when used infrequently, but can be slow and resource-intensive compared to operations that query a single collection.

## Why `$lookup` Can Hurt At Scale

`$lookup` can become expensive because MongoDB has to read from the source collection and the joined collection.

Common problems:

- The API runs the same `$lookup` on every page load.
- The pipeline sends too many documents into `$lookup`.
- The joined collection does not have a supporting index on the `foreignField`.
- The app uses a relational-style schema where every screen requires multiple joins.
- The result is easy to query, but not shaped around the application's most common read paths.

For example, joining authors into every book card is fine for a workshop and small data. But a busy homepage with thousands or millions of books should not repeatedly join author display fields if those fields are needed on every request.

## When `$lookup` Is Still Reasonable

Do not teach that `$lookup` is bad. Teach that it is a tool with tradeoffs.

`$lookup` is often reasonable when:

- The join is infrequent.
- The source side has already been reduced with `$match`, `$sort`, or `$limit`.
- The joined collection has the right indexes.
- The feature is an admin report or occasional detail page.
- You truly need current data from the related collection.

## Better Pipeline Habits

If you use `$lookup`, reduce the work before joining:

```js
db.books.aggregate([
  {
    $match: {
      genre: "Mystery",
      stock: { $gt: 0 }
    }
  },
  {
    $limit: 20
  },
  {
    $lookup: {
      from: "authors",
      localField: "authorIds",
      foreignField: "_id",
      as: "authors"
    }
  }
]);
```

This is usually better than joining every book first and filtering later.

Also make sure the joined field is indexed. In this workshop, `authors._id` is automatically indexed because `_id` always has a unique index.

## Solving The Problem With Data Modeling

MongoDB schema design starts with how your application reads data.

If the application frequently reads two pieces of data together, consider storing them together.

### Current Workshop Model

The current normalized model keeps authors separate:

```json
{
  "_id": "book-the-archive-room",
  "title": "The Archive Room",
  "authorIds": ["author-omar-farouk"]
}
```

To display author names on book cards, we use `$lookup`.

### Read-Optimized Model

For a high-traffic book listing page, store the fields needed by the UI directly on the book:

```json
{
  "_id": "book-the-archive-room",
  "title": "The Archive Room",
  "genre": "Mystery",
  "authors": [
    {
      "_id": "author-omar-farouk",
      "name": "Omar Farouk",
      "country": "Egypt"
    }
  ]
}
```

Now the book card page can query `books` only. No `$lookup` is needed for author display names.

This is sometimes called an extended reference: keep the full author document in `authors`, but copy the small fields you frequently need into `books`.

## Add Information Where You Need It

For MongoDB, a practical rule is:

```text
Store data where the application needs to read it.
```

That may mean duplicating small, stable fields.

Good fields to duplicate:

- Author name
- Author country
- Book title
- Cover URL
- Genre label
- Historical display values

Fields to be careful duplicating:

- Stock counts
- Prices that change often
- User profile fields that change often
- Large descriptions
- Large arrays that can grow without limit

Duplication improves reads, but it adds write responsibility. If an author's name changes, the application may need to update every copied author name in `books`.

## Ratings Example: Use Computed Fields

In lesson 09, we calculate ratings from `reviews`:

```text
books + reviews -> averageRating + reviewCount
```

That is useful for learning aggregation. At scale, doing this calculation on every book card request can be wasteful.

A read-optimized book document might store:

```json
{
  "_id": "book-the-archive-room",
  "title": "The Archive Room",
  "ratingSummary": {
    "averageRating": 5,
    "reviewCount": 2
  }
}
```

Then when a new review is inserted, the app updates the book's `ratingSummary`. Another option is to run a scheduled aggregation that recomputes summaries periodically.

This is the computed pattern: calculate once during writes or background jobs, then read the result quickly many times.

## Tradeoffs To Explain

Embedding and denormalization are not magic. They trade write complexity and storage for faster reads.

Mention these tradeoffs:

- Duplicated fields must be kept consistent.
- Documents have a 16 MiB size limit.
- Avoid unbounded arrays that grow forever.
- Frequently changing duplicated fields can make writes expensive.
- References are still better when related data is large, high-cardinality, or queried independently.

## Library Website Recommendation

For this workshop, keeping `authors` and `reviews` separate helps students learn `$lookup`.

For a production version of the library website:

- Keep `authors` as the source of truth.
- Copy small author display fields into each `book`.
- Keep `reviews` separate because reviews can grow without limit.
- Store `averageRating` and `reviewCount` on each `book`.
- Use `$lookup` for admin pages, back-office reports, and occasional detail screens where current related data is required.

## References

- MongoDB `$lookup` docs and performance considerations: https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
- MongoDB docs, Reduce `$lookup` Operations: https://www.mongodb.com/docs/manual/data-modeling/design-antipatterns/reduce-lookup-operations/
- MongoDB docs, Best Practices for Data Modeling: https://www.mongodb.com/docs/manual/data-modeling/concepts/embedding-vs-references/
- MongoDB docs, Embedded Data: https://www.mongodb.com/docs/manual/data-modeling/embedding/
- MongoDB docs, Referenced Data: https://www.mongodb.com/docs/manual/data-modeling/referencing/
- MongoDB docs, Store Computed Data: https://www.mongodb.com/docs/manual/data-modeling/design-patterns/computed-values/computed-schema-pattern/
