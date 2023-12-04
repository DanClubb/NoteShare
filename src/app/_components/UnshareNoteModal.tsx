import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import LoadingSpinner from "./LoadingSpinner";

interface UnshareNoteModal {
    noteId: number;
    shared: string | null;
}

export default function UnshareNoteModal({noteId, shared}: UnshareNoteModal) {
    const router = useRouter();
    const [unwantedUser, setUnwantedUser] = useState(shared)

    const unshareNote = api.note.unshare.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    })
    return (
        
            <form className="flex flex-col items-center gap-6 mx-auto p-4" 
                onSubmit={(e) => {
                    e.preventDefault()
                    unshareNote.mutate({id: noteId})
                }
            }>
                <h1 className="px-4 text-center lg:p-0">Are you sure you want to remove <span className="font-bold italic">{unwantedUser}</span> access?</h1>
                
                <button className="py-1 px-2 rounded-md bg-red-600 text-white">{unshareNote.isLoading ? <LoadingSpinner /> : "Yes, unshare"}</button>
                {unshareNote.isSuccess && <p className="text-lime-600">Successfully removed {unwantedUser} access</p>}
                {unshareNote.isError && <p className="text-red-600">Failed to remove {unwantedUser} access</p>}
               
                
            </form>
    )
}
