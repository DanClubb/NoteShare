"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import Button from "./Button";
import NoteCard from './NoteCard';

export default function CreateNewNote() {
    const router = useRouter();
    const [noteText, setNoteText] = useState("");

    const createNote = api.note.create.useMutation({
        onSuccess: () => {
        router.refresh();
        setNoteText("");
        },
    });

    const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createNote.mutate({ text: noteText });
    }

    return (
       <NoteCard cardColor="bg-orange-300">
            <form
                onSubmit={(e) => handleCreateNote(e)}
                className="flex flex-col h-full"
            >
                <textarea
                    placeholder="Create new note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="grow w-full resize-none bg-transparent placeholder:text-slate-500 placeholder:italic"
                ></textarea>
                <div className="flex justify-end -mr-4">
                     <Button buttonType='submit' icon={{img: 'create', caption: 'Create'}} isLoading={createNote.isLoading} />
                </div>
               
            </form>
       </NoteCard>
    )
}
