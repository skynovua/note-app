import { getDB, type NoteDocument } from "./db";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchNotes(): Promise<NoteDocument[]> {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    const db = await getDB();

    // Store fetched notes in RxDB
    await Promise.all(
      data.map(async (note: any) => {
        await db.notes.upsert({
          id: note.id.toString(),
          title: note.title,
          body: note.body,
        });
      }),
    );

    return db.notes.find().exec();
  } catch (error) {
    console.error("Error fetching notes:", error);
    const db = await getDB();
    return db.notes.find().exec();
  }
}

export async function createNote(note: Omit<NoteDocument, "id">): Promise<NoteDocument> {
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
      id: data.id.toString(),
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
    const response = await fetch(`${API_BASE_URL}/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
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

