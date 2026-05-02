use("library_workshop");

// Homepage data in one aggregation.
db.books.aggregate([
  // Stage 1: $lookup joins reviews onto every book.
  // We do this first because multiple homepage sections need rating data.
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "bookId",
      as: "reviews"
    }
  },
  // Stage 2: $addFields adds calculated fields while keeping existing fields.
  // reviewCount and averageRating can now be reused inside the $facet sections.
  {
    $addFields: {
      // $size counts the joined reviews array.
      reviewCount: {
        $size: "$reviews"
      },
      // $avg calculates the average review rating.
      // $ifNull handles books with no reviews, and $round formats the result.
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
  // Stage 3: $facet runs multiple sub-pipelines in parallel.
  // The output is one document with arrays such as featuredBooks and topRated.
  {
    $facet: {
      // Facet 1: featured books for a homepage carousel.
      featuredBooks: [
        // Keep only featured books that are available.
        {
          $match: {
            featured: true,
            stock: { $gt: 0 }
          }
        },
        // Newest featured books first.
        {
          $sort: {
            createdAt: -1
          }
        },
        // Only return a small homepage section.
        {
          $limit: 4
        },
        // Shape the card data for the frontend.
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
      // Facet 2: newest available books.
      newArrivals: [
        // Keep available books.
        {
          $match: {
            stock: { $gt: 0 }
          }
        },
        // Newest createdAt values first.
        {
          $sort: {
            createdAt: -1
          }
        },
        // Keep the section small.
        {
          $limit: 4
        },
        // Return only fields needed by the frontend.
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
      // Facet 3: top-rated books based on calculated rating fields.
      topRated: [
        // Ignore books with no reviews.
        {
          $match: {
            reviewCount: { $gt: 0 }
          }
        },
        // Highest rating first. If tied, more reviews wins.
        {
          $sort: {
            averageRating: -1,
            reviewCount: -1
          }
        },
        // Keep the section small.
        {
          $limit: 4
        },
        // Return fields needed for the top-rated card.
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
      // Facet 4: genre summary cards for navigation or analytics.
      genreStats: [
        // Group all books by genre.
        {
          $group: {
            _id: "$genre",
            bookCount: { $sum: 1 },
            // Count only books whose stock is greater than 0.
            availableBooks: {
              $sum: {
                $cond: [{ $gt: ["$stock", 0] }, 1, 0]
              }
            }
          }
        },
        // Rename _id to genre and remove the technical _id field.
        {
          $project: {
            _id: 0,
            genre: "$_id",
            bookCount: 1,
            availableBooks: 1
          }
        },
        // Sort the most common genres first.
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
