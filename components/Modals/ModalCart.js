import Modal from '../Modal';
import { EmptyCartIcon } from '@/public/icons';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const ModalCart = ({ onClose }) => {
  const { resetLocalStorage, backToHomeUrl, setShowModalCart } =
    useContext(StatusContext);

  return (
    <div className="tablet1024:fixed tablet1024:inset-0 tablet1024:flex tablet1024:items-center tablet1024:justify-center tablet1024:bg-black tablet1024:bg-opacity-50 z-50">
      <div
        className="tablet1024:fixed tablet1024:top-1/2 tablet1024:left-1/2 tablet1024:transform tablet1024:-translate-x-1/2 tablet1024:-translate-y-1/2 bg-white
       flex flex-col h-[93vh] items-center tablet1024:border-[1px] tablet1024:border-borderDefault tablet1024:rounded-[8px]
        p-[16px] mobile480:px-[24px] mobile480:py-[16px] tablet600:px-[24px] tablet600:py-[20px]
        tablet1024:px-[48px] desktop1440:py-[40px] w-full tablet1024:w-[976px] tablet1024:h-[546px] desktop1440:h-[780px]"
      >
        <div className="flex flex-col h-full w-full">
          <div
            className="self-start flex items-center w-full"
            //mobile320:gap-[8px] mobile320:flex-row tablet600:justify-between pr-[30px]
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
            <CloseIcon />
          </div>
          <div className="flex flex-col items-center w-full mt-auto mb-auto">
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
      </div>
    </div>
  );
};

export default ModalCart;
