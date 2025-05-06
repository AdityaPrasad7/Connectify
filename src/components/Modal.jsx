import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 grid place-items-center backdrop-blur px-4">

          <div className="relative z-50 m-auto w-full max-w-sm p-4 rounded shadow">

            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="self-end text-2xl text-white" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;