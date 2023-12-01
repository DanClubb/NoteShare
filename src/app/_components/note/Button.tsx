import React from 'react';
import { IconType } from 'react-icons';
import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
    buttonType: "button" | "submit";
    submitType?: "delete" | "save"
    icon: {
        img: any;
        caption: string;
    };
    isLoading?: boolean;
    setShowShareNoteModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitType?: React.Dispatch<React.SetStateAction<{
        save: boolean;
        delete: boolean;
    }>>;
}

export default function Button({buttonType, submitType, icon, isLoading, setShowShareNoteModal, setSubmitType}: ButtonProps) {

    const handleOnClick = () => {
        if(setShowShareNoteModal) {
            setShowShareNoteModal(true)
        }
        if (setSubmitType && submitType === "save") {
            setSubmitType((prev) => ({ ...prev, save: true }));
        }

        if (setSubmitType && submitType === "delete") {
            setSubmitType((prev) => ({ ...prev, delete: true }));
        }
    }

    return (
        <button type={`${buttonType}`}
        className={`flex flex-col items-center px-1 py-2 w-3/12 ${submitType === 'save' ? 'rounded-tl-md' : 'rounded-t-md'} transition hover:bg-white/20`}
        onClick={handleOnClick}
        >

        <figure className="flex flex-col items-center">
            {<icon.img />}
            <figcaption className="text-xs">
                {isLoading ? <LoadingSpinner /> : icon.caption}
            </figcaption>
        </figure>
    </button>
    )
}
