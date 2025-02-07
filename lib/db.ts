import { createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

const noteSchema = {
  title: "note schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
      primary: true,
    },
    numericId: {
      type: "number",
    },
    title: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
  required: ["id", "title", "body"],
};

/**
 * A promise that resolves to an instance of RxDatabase.
 * Initially set to null, it will be assigned a promise when the database is being initialized.
 * 
 * @type {Promise<RxDatabase> | null}
 */
let dbPromise: Promise<RxDatabase> | null = null;

export const getDB = async () => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: "notesdb",
      storage: getRxStorageDexie(),
    }).then(async (db) => {
      await db.addCollections({
        notes: {
          schema: noteSchema,
        },
      });
      return db;
    });
  }
  return dbPromise;
};

