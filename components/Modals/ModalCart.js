import Modal from '../Modal';
import { EmptyCartIcon } from '@/public/icons';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';

const ModalCart = ({ onClose }) => {
  const { resetLocalStorage, backToHomeUrl, setShowModalCart } =
    useContext(StatusContext);

  return (
    <Modal onClose={onClose}>
      <div
        className="w-screen flex flex-col
        mobile320:p-[16px] mobile480:px-[24px] mobile480:py-[16px] tablet600:px-[24px] tablet600:py-[20px]
        tablet1024:px-[48px] desktop1440:py-[40px] tablet1024:w-[976px]
        mobile320:h-[424px] mobile375:h-[756px] mobile480:h-[876px] tablet600:h-[904px]
        tablet768:h-[1077px] tablet1024:h-[546px] desktop1440:h-[780px]"
      >
        <div
          className="self-start flex mobile320:flex-row tablet600:justify-between 
        items-center mobile320:gap-[8px] w-full pr-[30px]"
        >
          <h5
            className="decoration-textPrimary mobile320:font-medium mobile320:text-[18px] mobile320:leading-[25.2px]
           tablet600:text-[28px] tablet600:leading-[33.6px] desktop1440:font-normal desktop1440:text-[36px] desktop1440:leading-[46.8px]"
          >
            Кошик
          </h5>
          <button
            className="disabled-button text-textBrand w-[152px] h-[40px] font-medium text-[16px] leading-[22.4px]"
            //text-textBrand
            type="button"
          >
            Очистити кошик
          </button>
        </div>
        <div className="mt-auto mb-auto flex flex-col items-center w-full">
          <div className="flex items-center justify-center mb-[8px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
            <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
              <EmptyCartIcon width={24} height={24} />
            </div>
          </div>
          <p className="mb-[8px] decoration-textPrimary font-normal mobile320:text-[24px] mobile320:leading-[28.8px] tablet1024:text-[28px] tablet1024:leading-[36.4px]">
            Кошик порожній
          </p>
          <p className="mb-[24px] decoration-textTertiary font-normal mobile320:text-[15px] mobile320:leading-[21px] tablet1024:text-[16px] tablet1024:leading-[24px]">
            Почніть додавати товари прямо зараз!
          </p>
          <button
            type="submit"
            className="state-button w-full tablet600:w-[285px] h-[48px] font-medium text-[16px] leading-[22.4px] text-textContrast"
            onClick={() => {
              if (typeof window !== 'undefined') {
                resetLocalStorage();
                backToHomeUrl();
                document.body.classList.remove('stop-scrolling');
                setShowModalCart(false);
              }
            }}
          >
            Перейти до каталогу
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCart;
