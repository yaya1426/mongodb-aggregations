use("library_workshop");

// Aggregation version:
// The database returns documents already shaped for the website book card.
db.books.aggregate([
  // Stage 1: $match filters the collection.
  // Only books with stock greater than 0 continue to the next stage.
  {
    $match: {
      stock: { $gt: 0 }
    }
  },
  // Stage 2: $project controls the final shape of each document.
  // Here we include existing fields and create calculated fields for the UI.
  {
    $project: {
      _id: 1,
      title: 1,
      genre: 1,
      coverUrl: 1,
      // $gt compares stock with 0 and returns true or false.
      isInStock: {
        $gt: ["$stock", 0]
      },
      // $size counts how many values are inside the tags array.
      tagCount: {
        $size: "$tags"
      },
      // $concat joins strings. $literal tells MongoDB "$" is text, not a field path.
      // $toString converts the number price into text.
      displayPrice: {
        $concat: [
          {
            $literal: "$"
          },
          {
            $toString: "$price"
          }
        ]
      }
    }
  }
]);
