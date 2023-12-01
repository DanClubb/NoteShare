import NoteCard from './NoteCard';

interface UserNoteProps {
    noteText: string;
    author: string | null;
}

export default async function SharedNote({noteText, author}: UserNoteProps) {
    return (
        <NoteCard cardColor='cyan' textColor="black"> 
            <p className="grow w-full h-auto resize-none text-black bg-transparent">{noteText}</p>
            <p className="flex mt-auto pb-2 justify-end text-zinc-600 text-xs italic">
                shared by: {author ?? 'danclubb18@gmail.com'}
            </p>
        </NoteCard>
    )
}