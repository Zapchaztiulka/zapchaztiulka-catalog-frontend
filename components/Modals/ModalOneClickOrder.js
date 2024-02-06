import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import Modal from '../Modal';
import { LightningIcon } from 'universal-components-frontend/src/components/icons';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '@/redux/orders/ordersOperations';

const ModalOneClickOrder = ({
  onClose,
  product,
  setShowModalOneClickOrder,
  setShowModalOrderSuccessful,
  showModalOrderSuccessful,
}) => {
  const dispatch = useDispatch();

  const handleSubmitOneClickOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    const _id = product?._id;

    const requestBody = {
      products: [{ productId: _id, quantity: 1 }],
      phone: phone.replace(/[ ]/g, ''),
      userType: 'individual',
    };

    try {
      dispatch(fetchOrders(requestBody));
      setShowModalOneClickOrder(false);
      setShowModalOrderSuccessful(!showModalOrderSuccessful);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div
        className="flex flex-col items-center justify-end px-[16px] py-[24px] h-[410px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
      >
        <div className="flex items-center justify-center mb-[22px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
            <LightningIcon width={24} height={24} color={'#1570EF'} />
          </div>
        </div>
        <h5
          className="mb-[12px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] text-textPrimary"
        >
          Швидке замовлення
        </h5>
        <p
          className="mobile320:mb-[24px] desktop1440:mb-[32px] text-center mobile320:w-[258px] desktop1440:w-[632px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] text-textSecondary"
        >
          Залиште заявку і наш менеджер зв’яжеться з вами!
        </p>
        <form className="flex flex-col" onSubmit={handleSubmitOneClickOrder}>
          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] text-textSecondary">
            <span className="mb-[4px]">Номер телефону</span>
            <span className="absolute grid items-center z-10 block top-[34px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] text-textTertiary">
              +38
            </span>
            <input
              className="p-[10px] pl-[53px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:text-textTertiary border-[1px] border-borderDefault rounded-minimal"
              name="phone"
              id="phone"
              type="tel"
              maxLength="13"
              pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
              title="096 123 45 67"
              autoComplete="off"
              required
              onChange={replacePhoneNumber}
            />
            <span id="errorMessage" className="text-textWarning"></span>
          </label>
          <button
            type="submit"
            className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
          >
            Відправити
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalOneClickOrder;
