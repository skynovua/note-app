"use client";
import { useRouter } from "next/navigation";
import { createNote } from "../../lib/api";
import NoteForm from "../components/NoteForm";
import { Button } from "@/components/ui/button";

export default function CreateNotePage() {
  const router = useRouter();

  async function handleCreateNote(note: { title: string; body: string }) {
    await createNote(note);
    router.push("/");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Note</h1>
      <NoteForm onSubmit={handleCreateNote} />
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Notes
        </Button>
      </div>
    </div>
  );
}

