use("library_workshop");

// Genre stats for a website category menu or admin dashboard.
db.books.aggregate([
  // Stage 1: $group turns many book documents into one summary per genre.
  // _id is the grouping key, so _id: "$genre" means "group by genre".
  {
    $group: {
      _id: "$genre",
      // $sum: 1 counts how many documents are in each group.
      bookCount: { $sum: 1 },
      // $avg calculates the average price in each genre.
      averagePrice: { $avg: "$price" },
      // $sum can also add numeric field values, not just count documents.
      totalStock: { $sum: "$stock" },
      // $max finds the newest published year in each genre.
      newestPublishedYear: { $max: "$publishedYear" }
    }
  },
  // Stage 2: $project renames and formats the grouped result.
  // The grouped genre currently lives in _id, so we move it to genre.
  {
    $project: {
      _id: 0,
      genre: "$_id",
      bookCount: 1,
      // $round keeps the average price readable for the UI.
      averagePrice: {
        $round: ["$averagePrice", 2]
      },
      totalStock: 1,
      newestPublishedYear: 1
    }
  },
  // Stage 3: $sort orders genres by popularity, then alphabetically.
  {
    $sort: {
      bookCount: -1,
      genre: 1
    }
  }
]);
