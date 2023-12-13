import Modal from '../Modal';

const ModalCart = ({ showModalCart, onClose }) => {
  return (
    showModalCart && (
      <Modal onClose={onClose}>
        <div
          className="flex flex-col items-center justify-end px-[16px] py-[24px] h-[410px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
        >
          Cart
        </div>
      </Modal>
    )
  );
};

export default ModalCart;
