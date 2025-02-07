"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { toast } from "sonner";

import { NoteList } from "@/components/note-list";
import { Button } from "@/components/ui/button";
import { NoteDocument } from "@/types/note";

import { deleteNote, fetchNotes } from "../lib/api";

export default function Home() {
  const [notes, setNotes] = useState<NoteDocument[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    setLoading(true);
    try {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteNote(id: string) {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Notes App</h1>
      <div className="mb-4">
        <Button asChild>
          <Link href="/create">Create New Note</Link>
        </Button>
      </div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Your Notes</h2>
        <NoteList isLoading={isLoading} notes={notes} onDeleteNote={handleDeleteNote} />
      </div>
    </div>
  );
}
