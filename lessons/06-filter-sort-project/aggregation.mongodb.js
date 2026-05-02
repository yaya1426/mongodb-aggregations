use("library_workshop");

// Filtered genre page for affordable Science Fiction books.
db.books.aggregate([
  // Stage 1: $match filters books using multiple conditions.
  // $and makes it clear that all three conditions must be true.
  {
    $match: {
      $and: [
        { genre: "Science Fiction" },
        { stock: { $gt: 0 } },
        { price: { $lte: 25 } }
      ]
    }
  },
  // Stage 2: $sort orders matching books by published year.
  // -1 means newest published books appear first.
  {
    $sort: {
      publishedYear: -1
    }
  },
  // Stage 3: $project creates the exact book-card response.
  // It includes stored fields and calculated fields.
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      coverUrl: 1,
      price: 1,
      // $cond works like if/else.
      // If stock is greater than 10, show "Available now"; otherwise "Low stock".
      availabilityLabel: {
        $cond: {
          if: { $gt: ["$stock", 10] },
          then: "Available now",
          else: "Low stock"
        }
      },
      // $concat combines title and subtitle into one display string.
      bookCardTitle: {
        $concat: ["$title", " - ", "$subtitle"]
      }
    }
  }
]);
