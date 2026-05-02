use("library_workshop");

// Filtered genre page for affordable Science Fiction books.
db.books.aggregate([
  {
    $match: {
      $and: [
        { genre: "Science Fiction" },
        { stock: { $gt: 0 } },
        { price: { $lte: 25 } }
      ]
    }
  },
  {
    $sort: {
      publishedYear: -1
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      coverUrl: 1,
      price: 1,
      availabilityLabel: {
        $cond: {
          if: { $gt: ["$stock", 10] },
          then: "Available now",
          else: "Low stock"
        }
      },
      bookCardTitle: {
        $concat: ["$title", " - ", "$subtitle"]
      }
    }
  }
]);
