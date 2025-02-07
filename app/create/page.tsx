"use client";

import { useRouter } from "next/navigation";

import { NoteForm } from "@/components/note-form";
import { Button } from "@/components/ui/button";

import { createNote } from "../../lib/api";

export default function CreateNotePage() {
  const router = useRouter();

  async function handleCreateNote(note: { title: string; body: string }) {
    await createNote(note);
    router.push("/");
  }

  return (
    <div className="container mx-auto p-4">
      <NoteForm onSubmit={handleCreateNote} />
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Notes
        </Button>
      </div>
    </div>
  );
}
