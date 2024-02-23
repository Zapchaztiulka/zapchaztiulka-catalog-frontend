import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import { fetchAbsentOrders } from '@/redux/orders/ordersOperations';
import { useState } from 'react';

const ModalAbsentOrder = ({
  onClose,
  setShowModalAbsentOrder,
  setShowModalOrderSuccessful,
  showModalOrderSuccessful,
  preOrderId
}) => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState(false)
   const [email, setEmail] = useState('');

   const handleChangeEmail = event => {
     const { value } = event.target;
     setEmail(value);
     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;

     if (!emailRegex.test(value)) {
       setEmailError('Приклад example@mail.com');
     } else {
       setEmailError('');
     }
   };

  const handleSubmitAbsentOrder = async event => {
    event.preventDefault();

    if (emailError) {
    setSubmitError(true);
    return; 
  }  
    const requestBody = {
      productId: preOrderId,
      email: email,
    };
setSubmitError(false);
    try {
      dispatch(fetchAbsentOrders(requestBody))
      setShowModalAbsentOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
    } 
    catch (error) {
      console.error('Error submitting order:', error);
    }   
  };

  return (
    <Modal onClose={onClose}>
      <div
        className="flex flex-col items-center justify-end px-[16px] py-[24px] mobile320:h-[385px] desktop1440:h-[380px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
      >
        <div className="flex items-center justify-center mb-[22px] w-[59px] h-[59px] bg-bgErrorLight rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgErrorDark rounded-[50%]">
            <CloseIcon width={24} height={24} color={'#F04438'} />
          </div>
        </div>
        <h5
          className="mb-[12px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] text-textPrimary"
        >
          Немає в наявності
        </h5>
        <p
          className="text-center mobile320:mb-[24px] desktop1440:mb-[32px] mobile320:w-[258px] mobile375:w-[315px] desktop1440:w-[632px] mobile320:text-[14px] mobile320:leading-[22px] mobile375:text-[16px] mobile375:leading-[24px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] text-textSecondary"
        >
          Введіть адресу своєї пошти, і, як тільки товар з’явиться, Вам прийде
          лист
        </p>
        <form className="flex flex-col" onSubmit={handleSubmitAbsentOrder}>
          <div className="mb-[16px] flex flex-col">
            <input
              className={`p-[12px] ${
                submitError ? 'border border-borderError' : ''
              } mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] border-[1px] border-borderDefault rounded-minimal`}
              name="mail"
              type="email"
              title="Приклад example@mail.com"
              required
              value={email}
              onChange={handleChangeEmail}
            />
            {!submitError && (
              <span className="text-textWarning text-[12px]">{emailError}</span>
            )}
            {submitError &&
              emailError!=='' && (
                <span className="text-textError text-[12px]">
                  Невірний формат, приклад example@mail.com
                </span>
              )}
          </div>
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

export default ModalAbsentOrder;

