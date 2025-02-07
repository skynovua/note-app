import { NoteCard } from "@/components/note-card";
import { NoteSkeleton } from "@/components/note-skeleton";
import { NoteDocument } from "@/types/note";

interface NoteListProps {
  notes: NoteDocument[];
  isLoading?: boolean;
  onDeleteNote: (id: string) => void;
}

export function NoteList({ notes, isLoading, onDeleteNote }: NoteListProps) {
  if (isLoading && notes.length === 0) {
    return <NoteSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} />
      ))}
    </div>
  );
}
