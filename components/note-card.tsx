import { useTransition } from "react";

import { Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteDocument } from "@/types/note";

interface NoteCardProps {
  note: NoteDocument;
  onDeleteNote: (id: string) => void;
}

export const NoteCard = ({ note, onDeleteNote }: NoteCardProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = (id: string) => {
    startTransition(() => onDeleteNote(id));
  };

  return (
    <Card
      key={note.id}
      className="flex transform flex-col transition hover:scale-[1.02] hover:shadow-lg"
    >
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
        <Button
          className="cursor-pointer"
          variant="destructive"
          size="sm"
          onClick={() => handleDeleteNote(note.id)}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
