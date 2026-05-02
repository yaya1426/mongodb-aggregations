use("library_workshop");

// Query API version:
// This fetches the data, but the application still has to calculate
// isInStock, tagCount, and displayPrice after receiving the response.
db.books.find(
  {
    stock: { $gt: 0 }
  },
  {
    title: 1,
    genre: 1,
    price: 1,
    stock: 1,
    tags: 1
  }
);
