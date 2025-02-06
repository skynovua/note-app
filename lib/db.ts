import { createRxDatabase, addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";

addRxPlugin(RxDBDevModePlugin);

const noteSchema = {
  title: "note schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
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

export type NoteDocument = {
  id: string
  title: string
  body: string
}

let dbPromise: Promise<any> | null = null;

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

