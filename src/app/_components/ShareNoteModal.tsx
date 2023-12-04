import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import User from '../../types/User';
import LoadingSpinner from "./LoadingSpinner";



interface ShareNoteModalProps {
    users: User[];
    noteId: number;
}

const filterUsers = (users: User[], currentInput: string): User[] => {
   const filteredUsers = users.filter((user) => {
       return user.email.toLowerCase().includes(currentInput.toLowerCase())
   })
if(filterUsers.length > 0) return filteredUsers
else return []
}

export default function ShareNoteModal({users, noteId}: ShareNoteModalProps) {
    const router = useRouter();
    const [email, setEmail] = useState('')

    const shareNote = api.note.share.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    })

    return (
        <form className="flex flex-col items-center mx-auto p-4 h-96"
            onSubmit={(e) => {
                e.preventDefault()
                shareNote.mutate({id: noteId, email: email})
            }
        }>
            <div className="flex flex-col w-full">
                <label>Who would you like to share with?</label>
                <input className="mt-2 py-2 px-4 w-full rounded-sm shadow-slate-600 outline-slate-600" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
                <div className={`${(email === filterUsers(users, email)[0]?.email || email.length === 0) && 'invisible'} max-h-44 bg-slate-100 rounded-sm border-2 border-slate-300 overflow-auto cursor-pointer`}>
                    {filterUsers(users, email).length === 0 ? 
                        <p className="py-2 px-4 text-red-600">User not found</p> :
                        filterUsers(users, email).map((user) => (
                            <p key={user.email} className="py-2 px-4 border-b" onClick={(e) => setEmail(e.currentTarget.textContent!)}>{user.email}</p>
                        ))
                    }
                </div>
                
            </div>
            <div className="flex items-center gap-4 mt-auto mr-auto">
                <button type="submit" className="flex justify-center items-center w-16 h-10 rounded-sm border-2 border-slate-600 shadow-md shadow-cyan-200 active:shadow active:shadow-cyan-200 active:scale-95 hover:transition">
                    {shareNote.isLoading ? <LoadingSpinner /> : 'Share'}
                </button>
                {shareNote.isSuccess && <p className="text-lime-600">Shared successfully</p>}
                {shareNote.isError && <p className="text-red-600">Failed to share</p>}
            </div>
        </form>
    )


}
