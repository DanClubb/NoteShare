"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { api } from "~/trpc/react";
import User from "~/types/User";
import Modal from "../Modal";
import ShareNoteModal from "../ShareNoteModal";
import UnshareNoteModal from "../UnshareNoteModal";
import Button from './Button';
import NoteCard from './NoteCard';
interface UserNoteProps {
    noteText: string;
    noteId: number;
    users: User[]
    shared: string | null;
}

export default function UserNote({noteText, noteId, users, shared}: UserNoteProps) {
    const router = useRouter();
    const [currentNoteText, setCurrentNoteText] = useState(noteText);
    const [showShareNoteModal, setShowShareNoteModal] = useState(false)
    const [showUnshareNoteModal, setShowUnshareNoteModal] = useState(false)
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

    const handleNoteAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                submitType.save === true
                    && updateNote.mutate({ text: noteText, id: noteId })
                submitType.delete === true
                    && deleteNote.mutate({ id: noteId });
    }
    return (
        <NoteCard cardColor="bg-orange-300"> 
        <form
            className="flex flex-col h-full"
            onSubmit={(e) => handleNoteAction(e)}
        >
            <textarea
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                className="grow w-full resize-none bg-transparent"
            ></textarea>
            <div className="flex justify-end -mr-4 mt-auto">
                {shared ?
                    <Button buttonType='submit' icon={{img: 'unshare', caption: 'Unshare'}} setShowModal={setShowUnshareNoteModal} />
                    :
                    <Button buttonType='button' icon={{img: 'share', caption: 'Share'}} setShowModal={setShowShareNoteModal} />
                }                
                <Button buttonType='submit' submitType="delete" icon={{img: 'delete', caption: 'Delete'}} setSubmitType={setSubmitType} isLoading={deleteNote.isLoading} />
                <Button buttonType='submit' submitType="save" icon={{img: 'save', caption: 'Save'}} setSubmitType={setSubmitType} isLoading={updateNote.isLoading} />
            </div>
        </form>

            {
              showShareNoteModal && (
                    createPortal(
                        <Modal setShowModal={setShowShareNoteModal}>
                            <ShareNoteModal noteId={noteId} users={users} />
                        </Modal>
                        ,document.body 
                    )
              )
            }

            {
              showUnshareNoteModal && (
                    createPortal(
                        <Modal setShowModal={setShowUnshareNoteModal}>
                            <UnshareNoteModal noteId={noteId} shared={shared} />
                        </Modal>
                        ,document.body 
                    )
              )
            }
        </NoteCard>
    )
}
