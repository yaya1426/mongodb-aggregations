import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";

const {
  MONGODB_URI,
  DB_NAME = "library_workshop",
  PORT = 3000
} = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Copy .env.example to .env and add your Atlas connection string.");
}

const app = express();
const client = new MongoClient(MONGODB_URI);

function db() {
  return client.db(DB_NAME);
}

function bookCardProject() {
  return {
    _id: 1,
    title: 1,
    subtitle: 1,
    genre: 1,
    price: 1,
    coverUrl: 1,
    stock: 1,
    averageRating: 1,
    reviewCount: 1,
    authors: {
      $map: {
        input: "$authors",
        as: "author",
        in: {
          id: "$$author._id",
          name: "$$author.name"
        }
      }
    }
  };
}

function withAuthorsAndRatings() {
  return [
    {
      $lookup: {
        from: "authors",
        localField: "authorIds",
        foreignField: "_id",
        as: "authors"
      }
    },
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
    }
  ];
}

app.get("/health", async (req, res, next) => {
  try {
    await db().command({ ping: 1 });
    res.json({ ok: true, database: DB_NAME });
  } catch (error) {
    next(error);
  }
});

app.get("/books", async (req, res, next) => {
  try {
    const { genre } = req.query;

    const pipeline = [
      {
        $match: {
          stock: { $gt: 0 },
          ...(genre ? { genre } : {})
        }
      },
      ...withAuthorsAndRatings(),
      {
        $sort: {
          title: 1
        }
      },
      {
        $project: bookCardProject()
      }
    ];

    const books = await db().collection("books").aggregate(pipeline).toArray();

    res.json({ books });
  } catch (error) {
    next(error);
  }
});

app.get("/books/:id", async (req, res, next) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: req.params.id
        }
      },
      ...withAuthorsAndRatings(),
      {
        $project: {
          ...bookCardProject(),
          description: 1,
          publishedYear: 1,
          pageCount: 1,
          language: 1,
          tags: 1
        }
      }
    ];

    const [book] = await db().collection("books").aggregate(pipeline).toArray();

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json({ book });
  } catch (error) {
    next(error);
  }
});

app.get("/books/:id/reviews-summary", async (req, res, next) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: req.params.id
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
    ];

    const [summary] = await db().collection("books").aggregate(pipeline).toArray();

    if (!summary) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.json({ summary });
  } catch (error) {
    next(error);
  }
});

app.get("/authors/:id/books", async (req, res, next) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: req.params.id
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "authorIds",
          as: "books"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          country: 1,
          bookCount: {
            $size: "$books"
          },
          books: {
            $map: {
              input: "$books",
              as: "book",
              in: {
                id: "$$book._id",
                title: "$$book.title",
                genre: "$$book.genre",
                publishedYear: "$$book.publishedYear"
              }
            }
          }
        }
      }
    ];

    const [author] = await db().collection("authors").aggregate(pipeline).toArray();

    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res.json({ author });
  } catch (error) {
    next(error);
  }
});

app.get("/genres/stats", async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$genre",
          bookCount: { $sum: 1 },
          availableBooks: {
            $sum: {
              $cond: [{ $gt: ["$stock", 0] }, 1, 0]
            }
          },
          averagePrice: { $avg: "$price" },
          totalStock: { $sum: "$stock" }
        }
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          bookCount: 1,
          availableBooks: 1,
          averagePrice: {
            $round: ["$averagePrice", 2]
          },
          totalStock: 1
        }
      },
      {
        $sort: {
          bookCount: -1,
          genre: 1
        }
      }
    ];

    const genres = await db().collection("books").aggregate(pipeline).toArray();

    res.json({ genres });
  } catch (error) {
    next(error);
  }
});

app.get("/homepage", async (req, res, next) => {
  try {
    const pipeline = [
      ...withAuthorsAndRatings(),
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
              $project: bookCardProject()
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
              $project: bookCardProject()
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
              $project: bookCardProject()
            }
          ]
        }
      }
    ];

    const [homepage] = await db().collection("books").aggregate(pipeline).toArray();

    res.json(homepage);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: "Something went wrong",
    error: error.message
  });
});

await client.connect();

app.listen(PORT, () => {
  console.log(`Library API running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_NAME}`);
});
