import Modal from '../Modal';
import { EmptyCartIcon } from '@/public/icons';

const ModalCart = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div
        className="flex flex-col items-center justify-end px-[16px] py-[24px] w-screen
       mobile320:w-[320px] mobile320:h-[424px] mobile375:w-[357px] mobile375:h-[756px] mobile480:w-[480px] mobile480:h-[876px]
       tablet600:w-[600px] tablet600:h-[904px] tablet768:w-[768px] tablet768:h-[1077px] tablet1024:w-[976px] tablet1024:h-[546px]
       desktop1440:w-[976px] desktop1440:w-[780px]"
      >
        <h5>Кошик</h5>
        <button type="button">Очистити кошик</button>

        <div className="flex items-center justify-center mb-[22px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
            <EmptyCartIcon width={24} height={24} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCart;
