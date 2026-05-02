use("library_workshop");

// 1. Create a draft book from the admin dashboard.
db.books.insertOne({
  _id: "book-demo-admin-draft",
  title: "Demo Admin Draft",
  subtitle: "A temporary book for CRUD practice",
  description: "This document is used during the lesson and can be deleted at the end.",
  authorIds: ["author-maya-hart"],
  genre: "Technology",
  tags: ["demo", "admin"],
  publishedYear: 2026,
  pageCount: 120,
  language: "English",
  price: 12.99,
  stock: 3,
  featured: false,
  coverUrl: "https://example.com/covers/demo-admin-draft.jpg",
  createdAt: new Date().toISOString()
});

// 2. Read the book back.
db.books.findOne({
  _id: "book-demo-admin-draft"
});

// 3. Update fields when the admin edits the book.
db.books.updateOne(
  { _id: "book-demo-admin-draft" },
  {
    $set: {
      title: "Demo Admin Draft Updated",
      price: 15.99,
      featured: true
    }
  }
);

// 4. Increase stock after receiving more copies.
db.books.updateOne(
  { _id: "book-demo-admin-draft" },
  {
    $inc: {
      stock: 5
    }
  }
);

// 5. Delete the demo document when the lesson is done.
db.books.deleteOne({
  _id: "book-demo-admin-draft"
});
