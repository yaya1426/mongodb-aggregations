use("library_workshop");

// Book detail response with review summary.
db.books.aggregate([
  // Stage 1: $match selects the one book detail page we want to load.
  {
    $match: {
      _id: "book-the-archive-room"
    }
  },
  // Stage 2: $lookup joins reviews for this book.
  // This version uses a lookup pipeline so the joined reviews can be sorted.
  {
    $lookup: {
      from: "reviews",
      // let creates a variable from the current book document.
      // Inside the lookup pipeline, $$bookId means "the current book's _id".
      let: {
        bookId: "$_id"
      },
      pipeline: [
        // Inner stage 1: keep only reviews whose bookId equals the current book ID.
        // $expr allows us to compare a field value with a variable.
        {
          $match: {
            $expr: {
              $eq: ["$bookId", "$$bookId"]
            }
          }
        },
        // Inner stage 2: sort newest reviews first before they are attached.
        {
          $sort: {
            createdAt: -1
          }
        }
      ],
      as: "reviews"
    }
  },
  // Stage 3: $project builds a book detail response.
  // It includes book fields and calculates review summary fields.
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      description: 1,
      genre: 1,
      price: 1,
      coverUrl: 1,
      // $size counts how many review documents were joined.
      reviewCount: {
        $size: "$reviews"
      },
      // $avg calculates the average rating from the joined reviews.
      // $ifNull returns 0 when there are no reviews.
      // $round keeps the rating display friendly.
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
      // $map reshapes each review, and $slice keeps only the first 3.
      // Because reviews were sorted newest first, these are the latest reviews.
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
