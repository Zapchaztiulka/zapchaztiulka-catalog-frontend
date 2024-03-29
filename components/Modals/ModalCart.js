// import Modal from '../Modal';
import ReactDOM from 'react-dom';
import { EmptyCartIcon } from '@/public/icons';
import { useContext, useState } from 'react';
import { StatusContext } from '@/context/statusContext';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import { useOnKeyDown } from '@/hooks/useOnClickOutside';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';
import ModalDeleteFromCart from '@/components/Modals/ModalDeleteFromCart';
import { CartCardList } from '@/components';
import Link from 'next/link';

const ModalCart = () => {
  const { resetLocalStorage, backToHomeUrl, showModalCart, setShowModalCart } =
    useContext(StatusContext);
  const [isOpen, setIsOpen] = useState(false);

  const { totalAmount } = useSelector(selectCart);

  const onClose = () => {
    setShowModalCart(!showModalCart);
    document.body.classList.remove('stop-scrolling');
  };

  useOnKeyDown(onClose);

  const modalContent = (
    <div
      onClick={() => {
        if (!isOpen) onClose();
      }}
      className="mt-[57px] custom-height tablet1024:h-full tablet1024:mt-0 flex fixed top-0 left-0 w-full
      tablet1024:inset-0 tablet1024:items-center tablet1024:justify-center 
      tablet1024:bg-bgModal tablet1024:bg-opacity-50 z-10"
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className="z-11 bg-white tablet1024:fixed tablet1024:top-[55%] tablet1024:left-1/2 tablet1024:transform tablet1024:-translate-x-1/2 tablet1024:-translate-y-1/2
        flex flex-col items-center 
        w-full tablet1024:w-[976px] tablet1024:h-[546px] desktop1440:h-[555px] tablet1024:rounded-lg"
      >
        <div className="flex flex-col justify-between h-full w-full ">
          <div
            className="flex items-center w-full mobile320:flex-row justify-between 
          px-[16px] py-[20px] mobile480:px-[24px] tablet600:px-[32px] tablet600:py-[28px]"
          >
            <h5
              className="mr-[8px] text-textPrimary mobile320:font-medium mobile320:text-[18px] mobile320:leading-[25.2px]
           tablet600:text-[28px] tablet600:leading-[33.6px] desktop1440:font-normal desktop1440:text-[36px] desktop1440:leading-[46.8px]"
            >
              Кошик
            </h5>
            {totalAmount ? (
              <button
                className="text-textBrand w-[152px] h-[40px] font-medium text-[16px] leading-[22.4px]
              mr-auto tablet600:mr-0 tablet600:ml-auto"
                type="button"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Очистити кошик
              </button>
            ) : (
              <button
                className="disabled-button text-textBrand w-[152px] h-[40px] font-medium text-[16px] leading-[22.4px]
              mr-auto tablet600:mr-0 tablet600:ml-auto"
                type="button"
              >
                Очистити кошик
              </button>
            )}

            <button className="ml-[12px]" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          {totalAmount ? (
            <div className="flex flex-col items-center w-full mb-auto overflow-y-auto overflow-y-scroll">
              <CartCardList />
            </div>
          ) : null}
          {!totalAmount && (
            <div className="flex flex-col items-center w-full mt-auto mb-auto px-[16px] mobile480:px-[24px]">
              <div className="flex items-center justify-center mb-[8px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
                <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
                  <EmptyCartIcon width={24} height={24} />
                </div>
              </div>
              <p className="mb-[8px] text-textPrimary font-normal mobile320:text-[24px] mobile320:leading-[28.8px] tablet1024:text-[28px] tablet1024:leading-[36.4px]">
                Кошик порожній
              </p>
              <p className="mb-[24px] text-textTertiary font-normal mobile320:text-[15px] mobile320:leading-[21px] tablet1024:text-[16px] tablet1024:leading-[24px]">
                Почніть додавати товари прямо зараз!
              </p>
              <button
                type="button"
                className="state-button w-full mobile480:w-[432px] tablet600:w-[285px] h-[48px] font-medium text-[16px] leading-[22.4px] text-textContrast"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    resetLocalStorage();
                    backToHomeUrl();
                    onClose();
                  }
                }}
              >
                Перейти до каталогу
              </button>
            </div>
          )}
          {totalAmount ? (
            <div
              className="flex flex-col tablet1024:flex-row tablet1024:justify-end items-center gap-[10px] tablet600:gap-[12px] tablet1024:gap-[20px] 
            h-[116px] tablet600:h-[125px] tablet1024:h-[88px] desktop1440:h-[128px] 
            p-[16px] mobile480:px-[24px] tablet1024:px-[32px] desktop1440:px-[48px] tablet600:py-[20px] desktop1440:py-[40px] border-t border-borderDefault"
            >
              <p className="font-medium text-[18px] leading-[25.2px] tablet1024:text-[24px] tablet1024:leading-[28.8px] text-textPrimary">
                Всього: <span>{totalAmount}</span> ₴
              </p>
              <Link
                href={{ pathname: `/checkout` }}
                className="w-full tablet600:w-[285px] "
              >
                <button
                  type="button"
                  className="state-button w-full tablet600:w-[285px] h-[48px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      onClose();
                    }
                  }}
                >
                  Офомити замовлення
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      {/* Modal for Delete all products from cart*/}
      {isOpen && (
        <ModalDeleteFromCart
          onClose={() => {
            setIsOpen(false);
            document.body.classList.add('stop-scrolling');
          }}
          hideCloseBtn
          title={'Очистити кошик'}
          desctription={
            'Ви впевнені, що хочете видалити товари? Відмінити цю дію неможливо.'
          }
          delButtonText={'Видалити товари'}
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-cart')
  );
};

export default ModalCart;
