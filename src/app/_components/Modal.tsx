import { Inter } from "next/font/google";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    children: React.ReactNode;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
  });

export default function Modal({children, setShowModal}: ModalProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);
    return (
        <div className={`${inter.className} fixed top-0 left-0 z-10 w-full h-full`}>
            <div className="w-11/12 sm:w-4/12 absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 z-20 bg-slate-200">
                <button className="block mt-2 mr-2 ml-auto" 
                    onClick={() => {
                        console.log('hit')
                        setShowModal(false)}}
                >
                    <IoClose size='2rem' />
                </button>
                {children}
            </div>

                
            <div className="bg-slate-600 w-full h-full opacity-80"></div>
        </div>  
    )
}








