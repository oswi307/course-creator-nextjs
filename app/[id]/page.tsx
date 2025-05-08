// app/notes/[id]/page.tsx (Server Component)
import NoteClient from "./NoteClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <NoteClient id={params.id} />
}
