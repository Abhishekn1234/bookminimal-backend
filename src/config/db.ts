import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { DatabaseSchema } from "../types";

const adapter = new JSONFile<DatabaseSchema>("db.json");

export const db = new Low<DatabaseSchema>(adapter, {
  books: []
});

export async function initDB() {
  await db.read();
  await db.write(); 
}