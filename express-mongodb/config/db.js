// config/db.js
import { MongoClient } from 'mongodb';

let db;

export async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db(); // usa el nombre de la DB del URI
  console.log('✅ Conectado a MongoDB');
}

export function getDB() {
  if (!db) throw new Error('❌ La base de datos no está conectada');
  return db;
}