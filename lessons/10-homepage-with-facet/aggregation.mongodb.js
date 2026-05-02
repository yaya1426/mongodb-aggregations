use("library_workshop");

// Homepage data in one aggregation.
db.books.aggregate([
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "bookId",
      as: "reviews"
    }
  },
  {
    $addFields: {
      reviewCount: {
        $size: "$reviews"
      },
      averageRating: {
        $round: [
          {
            $ifNull: [
              {
                $avg: "$reviews.rating"
              },
              0
            ]
          },
          2
        ]
      }
    }
  },
  {
    $facet: {
      featuredBooks: [
        {
          $match: {
            featured: true,
            stock: { $gt: 0 }
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 4
        },
        {
          $project: {
            _id: 1,
            title: 1,
            genre: 1,
            coverUrl: 1,
            averageRating: 1
          }
        }
      ],
      newArrivals: [
        {
          $match: {
            stock: { $gt: 0 }
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 4
        },
        {
          $project: {
            _id: 1,
            title: 1,
            publishedYear: 1,
            price: 1,
            coverUrl: 1
          }
        }
      ],
      topRated: [
        {
          $match: {
            reviewCount: { $gt: 0 }
          }
        },
        {
          $sort: {
            averageRating: -1,
            reviewCount: -1
          }
        },
        {
          $limit: 4
        },
        {
          $project: {
            _id: 1,
            title: 1,
            genre: 1,
            averageRating: 1,
            reviewCount: 1
          }
        }
      ],
      genreStats: [
        {
          $group: {
            _id: "$genre",
            bookCount: { $sum: 1 },
            availableBooks: {
              $sum: {
                $cond: [{ $gt: ["$stock", 0] }, 1, 0]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            genre: "$_id",
            bookCount: 1,
            availableBooks: 1
          }
        },
        {
          $sort: {
            bookCount: -1,
            genre: 1
          }
        }
      ]
    }
  }
]);
