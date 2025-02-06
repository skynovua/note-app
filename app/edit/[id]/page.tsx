"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NoteDocument } from "../../../lib/db";
import { fetchNotes, updateNote } from "../../../lib/api";
import NoteForm from "../../components/NoteForm";
import { Button } from "@/components/ui/button";

export default function EditNotePage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<NoteDocument | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadNote() {
      const notes = await fetchNotes();
      const foundNote = notes.find((n) => n.id === params.id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        router.push("/");
      }
    }
    loadNote();
  }, [params.id, router]);

  async function handleUpdateNote(updatedNote: Omit<NoteDocument, "id">) {
    if (note) {
      await updateNote({ ...updatedNote, id: note.id });
      router.push("/");
    }
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Note</h1>
      <NoteForm note={note} onSubmit={handleUpdateNote} />
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Notes
        </Button>
      </div>
    </div>
  );
}

