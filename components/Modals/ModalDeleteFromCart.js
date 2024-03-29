import Modal from '../Modal';
import { AlertIcon } from 'universal-components-frontend/src/components/icons';
import { useDispatch } from 'react-redux';
import {
  clearTheCart,
  removeFromCart,
  getCartTotal,
} from '../../redux/cart/cartSlice';
import { clearCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { clearCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';

const ModalDeleteFromCart = ({
  onClose,
  hideCloseBtn,
  title,
  desctription,
  delButtonText,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal onClose={onClose} hideCloseBtn={hideCloseBtn}>
      <div
        className="z-12 flex flex-col items-center justify-center px-[16px] py-[24px] h-[280px] 
              w-[290px] mobile375:w-[343px] tablet600:w-[404px] tablet1024:w-[400px] z-70"
      >
        <div className="flex items-center justify-center mb-[12px] w-[59px] h-[59px] bg-bgErrorLight rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgErrorDark rounded-[50%]">
            <AlertIcon width={24} height={24} color="#F04438" />
          </div>
        </div>
        <h5 className="mb-[8px] font-medium text-[20px] leading-[25px] text-textPrimary">
          {title}
        </h5>
        <p className="mb-[32px] text-center font-normal w-full text-[14px] leading-[22px] mobile375:text-[16px] mobile375:leading-[24px] text-textSecondary">
          {desctription}
        </p>
        <div className="flex gap-[8px]">
          <button
            type="button"
            className="border-[1px] border-borderDefault rounded-minimal 
            w-[120px] mobile375:w-[151px] tablet600:w-[182px] h-[48px] font-medium text-[12px] leading-[20px] mobile375:text-[16px] mobile375:leading-[22.4px] text-textPrimary"
            onClick={() => {
              onClose();
            }}
          >
            Відмінити
          </button>
          <button
            type="button"
            className="border-[1px] border-borderDefault rounded-minimal bg-bgDefaultDestructive
            w-[120px] mobile375:w-[151px] tablet600:w-[182px] h-[48px] font-medium text-[12px] leading-[20px] mobile375:text-[16px] mobile375:leading-[22.4px] text-textContrast"
            onClick={() => {
              if (id) {
                dispatch(removeFromCart({ id }));
                dispatch(getCartTotal());
              } else {
                dispatch(clearTheCart());
                dispatch(clearCheckout());
                dispatch(clearCheckoutLegal());
              }
              onClose();
            }}
          >
            {delButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteFromCart;
