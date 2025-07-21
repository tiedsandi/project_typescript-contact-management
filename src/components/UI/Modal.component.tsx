import ReactDOM from "react-dom";
import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-[90%] max-w-lg"
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
