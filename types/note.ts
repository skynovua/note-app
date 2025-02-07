export type NoteDocument = {
  id: string;
  numericId: number;
  title: string;
  body: string;
}

export type ServerNote = Omit<NoteDocument, "numericId">;

export type EditableNote = Omit<NoteDocument, "id" | "numericId">;