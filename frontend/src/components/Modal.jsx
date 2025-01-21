import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '', onClose }) {
    const dialog = useRef();

    useEffect(() => {

        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`bg-pink-100 rounded-md shadow-md p-4 h-50 w-10/12 max-w-2xl backdrop-blur  ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}