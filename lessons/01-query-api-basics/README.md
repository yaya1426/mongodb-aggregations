# Lesson 01: Query API Basics

Before learning aggregation, start with the normal MongoDB Query API.

The library website needs simple pages such as "show me all books" and "show me one book." The Query API is perfect for this kind of direct document access.

## Run This File

Open and run examples from:

```text
queries.mongodb.js
```

Run one query at a time so you can inspect the result.

## Connect With `mongosh`

`mongosh` is the MongoDB Shell. It lets you connect to MongoDB Atlas from your terminal and run the same queries you see in this lesson.

Install it from the MongoDB docs if you do not already have it:

```text
https://www.mongodb.com/docs/mongodb-shell/install/
```

Connection format:

```bash
mongosh "mongodb+srv://<cluster-host>/" --apiVersion 1 --username <username>
```

For this workshop, the Atlas cluster connection looks like this:

```bash
mongosh "mongodb+srv://wazifa-production.jdvjgn8.mongodb.net/" --apiVersion 1 --username wazifa_db_user
```

`mongosh` will ask you to enter the password after you run the command. This keeps the password out of the command history and out of GitHub.

After connecting, select the workshop database:

```js
use("library_workshop");
```

Then run a quick check:

```js
db.books.findOne();
```

Important: do not commit a real password to GitHub. If you create a temporary student database user, share the username and password during the session and rotate or delete that user after the workshop.

## What You Will Learn

- How to use `find()` to return many documents.
- How to use `findOne()` to return one document.
- How filters select matching documents.
- How projections choose which fields to return.
- How `sort()` and `limit()` affect the result.

## Collection Used

- `books`

## Key Idea

A MongoDB query usually answers:

```text
Which documents do I want?
Which fields do I want back?
```

For example, a book listing page may not need the full description. It might only need the title, genre, price, stock, and cover image.

## Tips

- MongoDB returns `_id` by default unless you hide it with `_id: 0`.
- Projection values like `title: 1` mean "include this field."
- Filters are exact by default. `genre: "Technology"` will not match `"technology"`.
- Use `limit()` while learning so the result stays easy to read.

## Try It Yourself

Change the genre from `Technology` to `Cooking`, `Mystery`, or `Science Fiction` and rerun the query.
