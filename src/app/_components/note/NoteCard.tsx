import { Permanent_Marker } from 'next/font/google';

  const permanentMarker = Permanent_Marker({
      weight: '400',
      subsets: ["latin"],
  });
  
  interface NoteCardProps {
    children: React.ReactNode;
    cardColor: string;
  }

export default function NoteCard({children, cardColor}: NoteCardProps) {
    return (
        <div className={`${permanentMarker.className} flex flex-col gap-2 shrink-0 px-4 pt-4 w-64 h-72 ${cardColor}`}>
            {children}
        </div>
    )
}
