import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import CreateNewNote from "./_components/note/CreateNewNote";
import NoteCard from "./_components/note/NoteCard";
import SharedNote from "./_components/note/SharedNote";
import UserNote from "./_components/note/UserNote";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) return <div className="text-center">Not logged in</div>

  const userNotes = await api.note.get.query()
  const users = await api.users.getAllUsers.query()
  const sharedNotes = await api.note.getSharedNotes.query()

  return (
    <div className="flex justify-center gap-4 flex-wrap">
        {userNotes.map((note) => (
        <UserNote noteId={note.noteId} noteText={note.text} users={users} shared={note.sharedWith} key={note.noteId} />
      ))}
    
      {sharedNotes.map((note) => (
        <SharedNote noteText={note.text} author={note.authorEmail} key={note.noteId} />
      ))}
      <CreateNewNote />
    </div>  
  );
}
