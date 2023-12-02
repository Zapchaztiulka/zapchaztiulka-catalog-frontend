"use client";
import { useOnKeyDown } from "@/hooks/useOnClickOutside";
import { CloseModal } from "@/public/icons";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
  useOnKeyDown(onClose);

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={() => {
        onClose();
      }}
    >
      <div className="modal-wrapper">
        <div
          className="modal"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="modal-header">
            <button
              onClick={() => onClose()}
              className="hover:bg-borderDisabled p-xs4 hover:rounded-minimal"
            >
              <CloseModal
                width={24}
                height={24}
                className="stroke-iconPrimary"
              />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
