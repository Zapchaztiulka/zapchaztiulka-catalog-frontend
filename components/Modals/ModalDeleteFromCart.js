import Modal from '../Modal';
import { AlertIcon } from 'universal-components-frontend/src/components/icons';
import { useDispatch } from 'react-redux';
import { clearTheCart } from '../../redux/cart/cartSlice';

const ModalDeleteFromCart = ({
  onClose,
  hideCloseBtn,
  title,
  desctription,
  delButtonText,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal onClose={onClose} hideCloseBtn={hideCloseBtn}>
      <div
        className="flex flex-col items-center justify-center px-[16px] py-[24px] mobile320:h-[278px] desktop1440:h-[380px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px]"
      >
        <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[8px] w-[59px] h-[59px] bg-bgErrorLight rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgErrorDark rounded-[50%]">
            <AlertIcon width={24} height={24} color="#F04438" />
          </div>
        </div>
        <h5
          className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium text-[20px] leading-[25px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
        >
          {title}
        </h5>
        <p
          className="mobile320:mb-[24px] desktop1440:mb-[32px] text-center font-normal mobile320:w-[258px] desktop1440:w-[632px] text-[16px] mobile320:leading-[24px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
        >
          {desctription}
        </p>
        <div className="flex gap-[8px]">
          <button
            type="button"
            className="border-[1px] border-borderDefault rounded-minimal 
            w-[120px] mobile375:w-[151px] tablet600:w-[182px] h-[48px] font-medium text-[16px] leading-[22.4px] text-textPrimary"
            onClick={() => {
              onClose();
            }}
          >
            Відмінити
          </button>
          <button
            type="button"
            className="border-[1px] border-borderDefault rounded-minimal bg-bgDefaultDestructive
            w-[120px] mobile375:w-[151px] tablet600:w-[182px] h-[48px] font-medium text-[16px] leading-[22.4px] text-textContrast"
            onClick={() => {
              dispatch(clearTheCart());
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
