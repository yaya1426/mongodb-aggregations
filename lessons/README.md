# Lessons

Follow these folders in order. Each lesson has a short `README.md` and one or more runnable example files.

## How To Study Each Lesson

1. Read the lesson `README.md`.
2. Open the `.mongodb.js` file in the same folder.
3. Run one example at a time in Atlas, Compass, or MongoDB Shell.
4. Look at the output before moving to the next example.
5. Try changing one value, such as a genre, book ID, limit, or sort order.

## Lesson Roadmap

1. `00-setup-and-seed-data` prepares the Atlas database and sample data.
2. `01-query-api-basics` introduces simple reads with the Query API.
3. `02-crud-for-library-books` covers create, update, and delete operations.
4. `03-querying-like-a-website` shows Query API examples that feel like website features.
5. `04-why-aggregation` compares Query API output with an aggregation-shaped response.
6. `05-aggregation-basics` introduces the pipeline structure.
7. `06-filter-sort-project` builds better list responses.
8. `07-grouping-stats` creates summary data for genres.
9. `08-lookup-authors` joins books to authors and includes a scale discussion about reducing `$lookup`.
10. `09-reviews-and-ratings` calculates review summaries.
11. `10-homepage-with-facet` returns multiple homepage sections in one query.
12. `11-nodejs-library-api` uses the pipelines in a running Express app.
13. `12-library-frontend` visualizes the API as a small React website.

## Workshop Tip

Do not try to memorize every aggregation operator. Focus on the question each stage answers:

- `$match`: Which documents do we keep?
- `$sort`: In what order?
- `$project`: What should each output document look like?
- `$group`: What summary do we want?
- `$lookup`: What related data do we need?
- `$facet`: Which multiple result sets do we want at the same time?

## Final Demo Flow

Use the last two lessons together:

1. Start the backend from `11-nodejs-library-api`.
2. Start the frontend from `12-library-frontend`.
3. Open the frontend and connect what you see on screen to the aggregation endpoints.
