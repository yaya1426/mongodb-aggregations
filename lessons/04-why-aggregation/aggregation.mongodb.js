use("library_workshop");

// Aggregation version:
// The database returns documents already shaped for the website book card.
db.books.aggregate([
  {
    $match: {
      stock: { $gt: 0 }
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      genre: 1,
      coverUrl: 1,
      isInStock: {
        $gt: ["$stock", 0]
      },
      tagCount: {
        $size: "$tags"
      },
      displayPrice: {
        $concat: [
          "$",
          {
            $toString: "$price"
          }
        ]
      }
    }
  }
]);
