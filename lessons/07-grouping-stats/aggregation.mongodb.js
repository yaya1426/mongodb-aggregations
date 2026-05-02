use("library_workshop");

// Genre stats for a website category menu or admin dashboard.
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      bookCount: { $sum: 1 },
      averagePrice: { $avg: "$price" },
      totalStock: { $sum: "$stock" },
      newestPublishedYear: { $max: "$publishedYear" }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      bookCount: 1,
      averagePrice: {
        $round: ["$averagePrice", 2]
      },
      totalStock: 1,
      newestPublishedYear: 1
    }
  },
  {
    $sort: {
      bookCount: -1,
      genre: 1
    }
  }
]);
