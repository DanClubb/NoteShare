import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";
import User from '../../types/User';


interface ShareNoteModalProps {
    users: User[];
    noteId: number;
    setShowShareNoteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterUsers = (users: User[], currentInput: string): User[] | string => {
    users = []
if(users.length > 0) return users
else return "Can't find user!"
}

export default function ShareNoteModal({users, noteId, setShowShareNoteModal}: ShareNoteModalProps) {
    const [email, setEmail] = useState('')

    const shareNote = api.note.share.useMutation()
    
    return (
        <div className="absolute top-0 left-0 z-10 w-full h-full">
                <form className="flex flex-col items-center mx-auto p-4 w-4/12 h-2/6 absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-20 bg-slate-200" onSubmit={(e) => {
                    e.preventDefault()
                    shareNote.mutate({id: noteId, email: email})
                }
                }>
                    <button className="mb-2 ml-auto" 
                        onClick={() => setShowShareNoteModal(false)}
                    >
                        <IoClose size='2rem' />
                    </button>
                    <div className="w-full">
                        <label>Who would you like to share with?</label>
                        <input className="mt-2 py-2 px-4 w-full rounded-sm shadow-slate-600 outline-slate-600" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className={`${(email === users[0]?.email || email.length === 0) && 'invisible'} bg-slate-100 rounded-sm border-2 border-slate-300 cursor-pointer`}>
                            {users.map((user) => (
                            <p key={user.email} className="py-2 px-4" onClick={(e) => setEmail(e.currentTarget.textContent!)}>{user.email}</p>
                        ))}
                        </div>
                        
                    </div>
                    <button type="submit" className="mt-auto mr-auto px-2 py-1 rounded-sm border-2 border-slate-600 shadow-lg shadow-cyan-200 hover:shadow hover:shadow-cyan-200 hover:scale-95 hover:transition">Share</button>
                </form>
            <div className="bg-slate-600 w-full h-full opacity-80"></div>
        </div>
        
    )
}
