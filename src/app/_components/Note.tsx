"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

interface NoteProps {
    value: string;
    noteId: number;
}

export function Note({ value, noteId }: NoteProps) {
    const router = useRouter();
    const [note, setNote] = useState(value);
    const [submitType, setSubmitType] = useState({
        save: false,
        delete: false,
    });

    const updateNote = api.note.update.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    const deleteNote = api.note.delete.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submitType.save === true
                    ? updateNote.mutate({ text: note, id: noteId })
                    : deleteNote.mutate({ id: noteId });
            }}
            className="flex flex-col gap-2 shrink-0 m-2 w-60 h-64 bg-orange-400"
        >
            <textarea
                placeholder="Title"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="grow w-full h-auto resize-none px-4 py-2 text-black placeholder-black placeholder:italic bg-transparent"
            ></textarea>
            <div className="flex mt-auto justify-end gap-2">
                <button
                    type="submit"
                    className="bg-slate-300 px-1 py-2 w-3/12 rounded-t-md font-semibold transition hover:bg-white/20"
                    onClick={() => {
                        setSubmitType((prev) => ({ ...prev, delete: true }));
                    }}
                    disabled={deleteNote.isLoading}
                >
                    {deleteNote.isLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                    type="submit"
                    className="bg-slate-300 px-1 py-2 w-3/12 rounded-tl-md font-semibold transition hover:bg-white/20"
                    onClick={() => {
                        setSubmitType((prev) => ({ ...prev, save: true }));
                    }}
                    disabled={updateNote.isLoading}
                >
                    {updateNote.isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}