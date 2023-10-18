import { useOnClickOutside2 } from "@/hooks/useOnClickOutside";
import { CloseModal } from "@/public/icons";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
   
   useOnClickOutside2(onClose)

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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-header">
            <button onClick={() => onClose()}>
              <CloseModal/>
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
