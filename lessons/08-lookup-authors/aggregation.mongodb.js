use("library_workshop");

// Book cards with author details.
db.books.aggregate([
  {
    $match: {
      stock: { $gt: 0 }
    }
  },
  {
    $lookup: {
      from: "authors",
      localField: "authorIds",
      foreignField: "_id",
      as: "authors"
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      genre: 1,
      price: 1,
      coverUrl: 1,
      authors: {
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
  {
    $sort: {
      title: 1
    }
  }
]);
