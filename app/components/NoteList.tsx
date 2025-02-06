import type { NoteDocument } from "../../lib/db";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NoteListProps {
  notes: NoteDocument[]
  onDelete: (id: string) => void
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent className="grow">
            <p className="line-clamp-3">{note.body}</p>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button asChild size="sm">
              <Link href={`/edit/${note.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(note.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

