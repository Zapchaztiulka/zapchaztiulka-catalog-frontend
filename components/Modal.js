'use client';
import { useOnKeyDown } from '@/hooks/useOnClickOutside';
import { CloseModal } from '@/public/icons';
import ReactDOM from 'react-dom';

const Modal = ({ onClose, hideCloseBtn = false, children }) => {
  useOnKeyDown(onClose);

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={() => {
        onClose();
        document.body.classList.remove('stop-scrolling');
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
            {!hideCloseBtn && (
              <button
                onClick={() => {
                  onClose();
                  document.body.classList.remove('stop-scrolling');
                }}
                className="hover:bg-borderDisabled p-xs4 hover:rounded-minimal"
              >
                <CloseModal
                  width={24}
                  height={24}
                  className="stroke-iconPrimary"
                />
              </button>
            )}
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
};

export default Modal;
