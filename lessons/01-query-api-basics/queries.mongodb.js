use("library_workshop");

// 1. Find every book.
db.books.find();

// 2. Find one book by its ID.
db.books.findOne({
  _id: "book-the-moon-garden"
});

// 3. Find books in one genre.
db.books.find({
  genre: "Technology"
});

// 4. Return only the fields needed for a simple book list.
db.books.find(
  {},
  {
    title: 1,
    genre: 1,
    price: 1,
    stock: 1
  }
);

// 5. Sort newest books first and show only 5.
db.books
  .find(
    {},
    {
      title: 1,
      publishedYear: 1,
      createdAt: 1
    }
  )
  .sort({ publishedYear: -1 })
  .limit(5);

// 6. Find books that are available to buy.
db.books.find({
  stock: { $gt: 0 }
});
