# Sample Data

Use these files to seed the `library_workshop` database.

Each file contains a JSON array for one collection:

- `authors.json` -> `authors`
- `books.json` -> `books`
- `users.json` -> `users`
- `reviews.json` -> `reviews`
- `reading_events.json` -> `reading_events`

The examples use readable string IDs instead of `ObjectId` so relationships are easy to explain during the workshop.

If you use the final Node.js app, run `npm run seed` from `lessons/11-nodejs-library-api/` and it will insert these files automatically.
