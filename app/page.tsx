"use client";

import { useState, useEffect } from "react";
import { fetchNotes, deleteNote } from "../lib/api";
import type { NoteDocument } from "../lib/db";
import NoteList from "./components/NoteList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [notes, setNotes] = useState<NoteDocument[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const fetchedNotes = await fetchNotes();
    setNotes(fetchedNotes);
  }

  async function handleDeleteNote(id: string) {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notes App</h1>
      <div className="mb-4">
        <Button asChild>
          <Link href="/create">Create New Note</Link>
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Notes</h2>
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      </div>
    </div>
  );
}

