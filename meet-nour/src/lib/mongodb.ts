import "server-only";
import mongoose from "mongoose";

export async function connectionDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  const connection = await mongoose.connect(uri);
  const db = connection.connection.db;
  if (!db) {
    throw new Error("MongoDB connection did not provide a database");
  }

  return db;
}
