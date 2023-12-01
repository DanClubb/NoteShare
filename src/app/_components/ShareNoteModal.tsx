import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";
import User from '../../types/User';
import LoadingSpinner from "./LoadingSpinner";


interface ShareNoteModalProps {
    users: User[];
    noteId: number;
    setShowShareNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterUsers = (users: User[], currentInput: string): User[] => {
   const filteredUsers = users.filter((user) => {
       return user.email.toLowerCase().includes(currentInput.toLowerCase())
   })
if(filterUsers.length > 0) return filteredUsers
else return []
}

export default function ShareNoteModal({users, noteId, setShowShareNoteModal}: ShareNoteModalProps) {
    const [email, setEmail] = useState('')

    const shareNote = api.note.share.useMutation()

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);
    
    return (
        <div className="absolute top-0 left-0 z-10 w-full h-full">
                <form className="flex flex-col items-center mx-auto p-4 w-11/12 sm:w-4/12 h-96 absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-20 bg-slate-200" onSubmit={(e) => {
                    e.preventDefault()
                    shareNote.mutate({id: noteId, email: email})
                }
                }>
                    <button className="mb-2 ml-auto" 
                        onClick={() => setShowShareNoteModal(false)}
                    >
                        <IoClose size='2rem' />
                    </button>
                    <div className="flex flex-col w-full">
                        <label>Who would you like to share with?</label>
                        <input className="mt-2 py-2 px-4 w-full rounded-sm shadow-slate-600 outline-slate-600" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                        <button type="submit" className="flex justify-center items-center w-16 h-10 rounded-sm border-2 border-slate-600 shadow-lg shadow-cyan-200 hover:shadow hover:shadow-cyan-200 active:scale-95 hover:transition">
                        {shareNote.isLoading ? <LoadingSpinner /> : 'Share'}
                    </button>
                    {shareNote.isSuccess && <p className="text-lime-600">Shared successfully</p>}
                    {shareNote.isError && <p className="text-red-600">Failed to share</p>}
                    </div>
                </form>
            <div className="bg-slate-600 w-full h-full opacity-80"></div>
        </div>
        
    )
}
