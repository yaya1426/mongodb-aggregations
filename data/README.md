# Sample Data

This folder contains the data used throughout the workshop.

Each file is a JSON array. Insert each file into the collection with the same name:

- `authors.json` -> `authors`
- `books.json` -> `books`
- `users.json` -> `users`
- `reviews.json` -> `reviews`
- `reading_events.json` -> `reading_events`
- `yehia_tech_courses.json` -> `yehia_tech_courses`

## How To Insert The Data

You have two options.

Option 1: use the final Node.js seed script.

```bash
cd lessons/11-nodejs-library-api
npm install
cp .env.example .env
npm run seed
```

Option 2: insert manually in Atlas or Compass.

1. Open your Atlas cluster or MongoDB Compass.
2. Create or open the `library_workshop` database.
3. Create the collection you want to seed.
4. Import or paste the JSON array from the matching file.
5. Repeat this for each collection.

If your UI only accepts one document at a time, use the Node.js seed script or MongoDB Compass import.

## Important Data Notes

The examples use readable string IDs instead of generated `ObjectId` values. This is valid MongoDB data and makes joins easier to understand:

```json
"authorIds": ["author-maya-hart"]
```

The `_id` value must still be unique inside its collection.

## Relationship Map

- `books.authorIds` connects books to `authors._id`.
- `reviews.bookId` connects reviews to `books._id`.
- `reviews.userId` connects reviews to `users._id`.
- `reading_events.bookId` connects reading activity to `books._id`.
- `reading_events.userId` connects reading activity to `users._id`.
- `yehia_tech_courses` is standalone website content used by the frontend demo.

## Tip

If a `$lookup` returns an empty array, check that the IDs match exactly. MongoDB matches strings case-sensitively, so `author-maya-hart` and `Author-Maya-Hart` are different values.

If you use the final Node.js app, you can seed all collections automatically by running `npm run seed` from `lessons/11-nodejs-library-api/`.
