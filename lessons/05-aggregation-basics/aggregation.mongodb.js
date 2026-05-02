use("library_workshop");

// Public book listing:
// 1. Keep books that are in stock.
// 2. Show newest books first.
// 3. Limit the response.
// 4. Return only frontend-friendly fields.
db.books.aggregate([
  // Stage 1: $match filters documents.
  // Only books that are currently in stock continue through the pipeline.
  {
    $match: {
      stock: { $gt: 0 }
    }
  },
  // Stage 2: $sort orders the remaining documents.
  // -1 means descending, so newest createdAt values come first.
  {
    $sort: {
      createdAt: -1
    }
  },
  // Stage 3: $limit keeps only the first 6 documents after sorting.
  // This is useful for homepage sections or small list previews.
  {
    $limit: 6
  },
  // Stage 4: $project chooses which fields the frontend receives.
  // Fields with 1 are included; fields not listed are excluded.
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      genre: 1,
      price: 1,
      coverUrl: 1
    }
  }
]);
