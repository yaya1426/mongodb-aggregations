import "dotenv/config";
import { readFile } from "node:fs/promises";
import { MongoClient } from "mongodb";

const { MONGODB_URI, DB_NAME = "library_workshop" } = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI. Copy .env.example to .env and add your Atlas connection string.");
}

const collections = [
  "authors",
  "books",
  "users",
  "reviews",
  "reading_events",
  "yehia_tech_courses"
];

async function readJsonCollection(collectionName) {
  const fileUrl = new URL(`../../data/${collectionName}.json`, import.meta.url);
  const contents = await readFile(fileUrl, "utf8");
  return JSON.parse(contents);
}

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();

  const db = client.db(DB_NAME);

  for (const collectionName of collections) {
    const docs = await readJsonCollection(collectionName);
    const collection = db.collection(collectionName);

    await collection.deleteMany({});

    if (docs.length > 0) {
      await collection.insertMany(docs);
    }

    console.log(`Seeded ${docs.length} documents into ${collectionName}`);
  }

  console.log(`Done. Database: ${DB_NAME}`);
} finally {
  await client.close();
}
