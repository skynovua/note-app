"use client";

import { useState, useEffect } from "react";
import type { NoteDocument } from "../../lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface NoteFormProps {
  note?: NoteDocument
  onSubmit: (note: Omit<NoteDocument, "id">) => void
}

export default function NoteForm({ note, onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, body });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Note Content"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{note ? "Update" : "Create"} Note</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

