use("library_workshop");

// Book detail response with review summary.
db.books.aggregate([
  {
    $match: {
      _id: "book-the-archive-room"
    }
  },
  {
    $lookup: {
      from: "reviews",
      let: {
        bookId: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$bookId", "$$bookId"]
            }
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        }
      ],
      as: "reviews"
    }
  },
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      description: 1,
      genre: 1,
      price: 1,
      coverUrl: 1,
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
      },
      latestReviews: {
        $slice: [
          {
            $map: {
              input: "$reviews",
              as: "review",
              in: {
                rating: "$$review.rating",
                comment: "$$review.comment",
                createdAt: "$$review.createdAt"
              }
            }
          },
          3
        ]
      }
    }
  }
]);
