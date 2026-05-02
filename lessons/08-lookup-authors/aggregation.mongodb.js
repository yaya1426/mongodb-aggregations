use("library_workshop");

// Book cards with author details.
db.books.aggregate([
  // Stage 1: $match filters books before doing the join.
  // This keeps the $lookup stage from processing out-of-stock books.
  {
    $match: {
      stock: { $gt: 0 }
    }
  },
  // Stage 2: $lookup joins each book with matching author documents.
  // localField is books.authorIds, foreignField is authors._id.
  // The matched author documents are added as a new authors array.
  {
    $lookup: {
      from: "authors",
      localField: "authorIds",
      foreignField: "_id",
      as: "authors"
    }
  },
  // Stage 3: $project shapes the final book card response.
  // $map loops through the joined authors array and keeps only display fields.
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      genre: 1,
      price: 1,
      coverUrl: 1,
      authors: {
        // $map transforms each author document into a smaller object.
        $map: {
          input: "$authors",
          as: "author",
          in: {
            id: "$$author._id",
            name: "$$author.name",
            country: "$$author.country"
          }
        }
      }
    }
  },
  // Stage 4: $sort orders the final book cards by title.
  {
    $sort: {
      title: 1
    }
  }
]);
