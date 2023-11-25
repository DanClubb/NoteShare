"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateNote() {
  const router = useRouter();
  const [note, setNote] = useState("");

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setNote("");
    },
  });

  return (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            createNote.mutate({ text: note });
        }}
        className="flex flex-col gap-2 m-2 w-60 h-64 bg-orange-400"
    >
        <textarea
            placeholder="Create new note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-auto resize-none px-4 py-2 text-black placeholder-slate-600 placeholder:italic bg-transparent"
        ></textarea>
        <button
            type="submit"
            className="bg-slate-300 mt-auto ml-auto px-1 py-2 w-3/12 rounded-tl-md  font-semibold transition hover:bg-white/20"
            disabled={createNote.isLoading}
        >
            {createNote.isLoading ? "Creating..." : "Create"}
        </button>
    </form>
);
}
