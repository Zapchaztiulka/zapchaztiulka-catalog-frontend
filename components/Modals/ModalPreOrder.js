import Modal from '../Modal';
import { PreOrderIcon } from '@/public/icons';

const ModalPreOrder = ({
  onClose,
  replacePhoneNumber,
  handleSubmitPreOrder,
}) => {
  return (
    <Modal onClose={onClose}>
      <div
        className="flex flex-col items-center justify-end px-[16px] py-[24px] mobile320:h-[431px] desktop1440:h-[408px]
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
      >
        <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[12px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
            <PreOrderIcon width={24} height={24} />
          </div>
        </div>
        <h5
          className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium mobile320:text-[21px] mobile320:leading-[25px] mobile375:text-[24px] mobile375:leading-[28.8px]
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
        >
          Передзамовлення товару
        </h5>
        <p
          className="mb-[24px] text-center mobile320:w-[258px] mobile375:w-[300px] desktop1440:w-[500px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
        >
          Залиште заявку і наш менеджер зв’яжеться з вами та розповість про
          умови предзамовлення
        </p>
        <form className="flex flex-col" onSubmit={handleSubmitPreOrder}>
          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] decoration-textSecondary">
            <span className="mb-[4px]">Номер телефону</span>
            <span className="absolute grid items-center z-10 block top-[34px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
              +38
            </span>
            <input
              className="p-[10px] pl-[53px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:decoration-textTertiary border-[1px] border-borderDefault rounded-minimal"
              name="phone"
              type="tel"
              id="phone"
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

export default ModalPreOrder;
