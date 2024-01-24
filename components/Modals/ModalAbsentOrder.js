import Modal from '../Modal';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const ModalAbsentOrder = ({
  onClose,
  setShowModalAbsentOrder,
  setShowModalOrderSuccessful,
  showModalOrderSuccessful,
}) => {
  const handleSubmitAbsentOrder = async event => {
    event.preventDefault();
    // mail: event.target.elements.mail.value;
    console.log('E-mail : ', event.target.elements.mail.value);
    setShowModalAbsentOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
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
          <span id="errorMessage" className="text-textWarning"></span>
          <input
            className="mb-[16px] p-[12px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] border-[1px] border-borderDefault rounded-minimal"
            name="mail"
            type="email"
            pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
            title="example@mail.com"
            required
          />
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
