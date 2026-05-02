use("library_workshop");

// Public book listing:
// 1. Keep books that are in stock.
// 2. Show newest books first.
// 3. Limit the response.
// 4. Return only frontend-friendly fields.
db.books.aggregate([
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
    $limit: 6
  },
  {
    $project: {
      _id: 1,
      title: 1,
      subtitle: 1,
      genre: 1,
      price: 1,
      coverUrl: 1
    }
  }
]);
