use("library_workshop");

// 1. Product listing page: available books, newest first.
db.books
  .find(
    {
      stock: { $gt: 0 }
    },
    {
      title: 1,
      genre: 1,
      price: 1,
      stock: 1,
      coverUrl: 1,
      publishedYear: 1
    }
  )
  .sort({ createdAt: -1 });

// 2. Genre page: only Science Fiction books.
db.books
  .find(
    {
      genre: "Science Fiction",
      stock: { $gt: 0 }
    },
    {
      title: 1,
      subtitle: 1,
      price: 1,
      coverUrl: 1
    }
  )
  .sort({ publishedYear: -1 });

// 3. Homepage section: featured books.
db.books
  .find(
    {
      featured: true,
      stock: { $gt: 0 }
    },
    {
      title: 1,
      genre: 1,
      price: 1,
      coverUrl: 1
    }
  )
  .limit(6);

// 4. Search by a tag in the tags array.
db.books.find({
  tags: "library"
});

// 5. Simple pagination: page 2 with 4 books per page.
db.books
  .find(
    {},
    {
      title: 1,
      genre: 1,
      price: 1
    }
  )
  .sort({ title: 1 })
  .skip(4)
  .limit(4);
