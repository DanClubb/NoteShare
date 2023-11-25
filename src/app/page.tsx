import { CreateNote } from "~/app/_components/CreateNote";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Note } from "./_components/Note";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) return <div className="text-center">Not logged in</div>

  const userNotes = await api.note.get.query({id: session?.user.id!})
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {userNotes.map((note) => (
        <Note noteId={note.noteId} value={note.text} key={note.noteId} />
      ))}
      <CreateNote />
    </div>  
  );
}
