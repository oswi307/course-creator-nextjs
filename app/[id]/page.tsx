// app/notes/[id]/page.tsx (Server Component)
import NoteClient from "./NoteClient";



export default function Page({ params }: { params: { id: string } })  {
  return <NoteClient id={params.id} />
}
