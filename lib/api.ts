import { EditableNote, NoteDocument, ServerNote } from "@/types/note";
import { getDB } from "./db";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchNotes(): Promise<NoteDocument[]> {
  try {
    // Fetch notes from API
    const response = await fetch(`${API_BASE_URL}?_limit=5`);
    const data = await response.json() as ServerNote[];
    const db = await getDB();

    // Store fetched notes in RxDB
    const upsertPromises = data.map(async (note) => {
      const noteRecord = await db.notes.findOne({
        selector: { id: note.id.toString() }
      }).exec();

      if (!noteRecord) {
        await db.notes.upsert({
          id: note.id.toString(),
          numericId: note.id,
          title: note.title,
          body: note.body,
        });
      }
    });

    await Promise.all(upsertPromises);

    return db.notes.find({
      sort: [{ numericId: "desc" }],
    }).exec();
  } catch (error) {
    console.error("Error fetching notes:", error);
    const db = await getDB();
    return db.notes.find().exec();
  }
}

export async function createNote(note: EditableNote): Promise<NoteDocument> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    const db = await getDB();
    const newNote = {
      id: crypto.randomUUID(),
      numericId: new Date().getTime(),
      title: data.title,
      body: data.body,
    };
    await db.notes.insert(newNote);
    return newNote;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

export async function updateNote(note: NoteDocument): Promise<NoteDocument> {
  try {
    let noteData = note;

    // If the note was created locally, update it in the API
    // because the API returns 500 for PUT requests with numericId < 100
    if (noteData.numericId < 100) {
      const response = await fetch(`${API_BASE_URL}/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json() as NoteDocument;

      noteData = {
        id: data.id.toString(),
        numericId: data.numericId,
        title: data.title,
        body: data.body,
      };
    }

    const db = await getDB();
    await db.notes.upsert(note);

    return note;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const db = await getDB();
    await db.notes.findOne(id).remove();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

