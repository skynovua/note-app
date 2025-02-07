"use client";

import { use, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { NoteForm } from "@/components/note-form";
import { Button } from "@/components/ui/button";
import { EditableNote, NoteDocument } from "@/types/note";

import { fetchNotes, updateNote } from "../../../lib/api";

export default function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [note, setNote] = useState<NoteDocument | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadNote() {
      const notes = await fetchNotes();
      const foundNote = notes.find((n) => n.id === id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        router.push("/");
      }
    }
    loadNote();
  }, [id, router]);

  async function handleUpdateNote(updatedNote: EditableNote) {
    if (note) {
      await updateNote({ ...updatedNote, id: note.id, numericId: note.numericId });
      router.push("/");
    }
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <NoteForm note={note} onSubmit={handleUpdateNote} />
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Notes
        </Button>
      </div>
    </div>
  );
}
