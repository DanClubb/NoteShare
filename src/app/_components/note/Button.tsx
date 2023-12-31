import { useRouter } from "next/navigation";
import { BiSolidShare } from "react-icons/bi";
import { IoIosShareAlt, IoIosTrash } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineSaveAlt } from "react-icons/md";
import { api } from "~/trpc/react";
import LoadingSpinner from '../LoadingSpinner';

interface ButtonProps {
    buttonType: "button" | "submit";
    submitType?: "delete" | "save"; 
    icon: {
        img: "share" | "unshare" | "delete" | "save" | "create";
        caption: string;
    };
    isLoading?: boolean;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitType?: React.Dispatch<React.SetStateAction<{
        save: boolean;
        delete: boolean;
    }>>;
}

export default function Button({buttonType, submitType, icon, isLoading, setShowModal, setSubmitType}: ButtonProps) {
    const router = useRouter();

    const handleOnClick = () => {
        if(setShowModal) {
            setShowModal(true)
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
            {icon.img === 'save' && <MdOutlineSaveAlt />}
            {icon.img === 'share' && <IoIosShareAlt />}
            {icon.img === 'unshare' && <BiSolidShare />}
            {icon.img === 'delete' && <IoIosTrash />}
            {icon.img === 'create'&& <IoCreateOutline />}
            <figcaption className="text-xs">
                {isLoading ? <LoadingSpinner /> : icon.caption}
            </figcaption>
        </figure>
    </button>
    )
}
