import React from 'react';
import Modal from '../Modal';
import { ToolIcon } from 'universal-components-frontend/src/components/icons';
import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';

const ModalSpecialOrder = ({
  onClose,
  setShowModalSpecialOrder,
  setShowModalOrderSuccessful,
  showModalOrderSuccessful,
}) => {
  const handleSubmitSpecialOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    console.log('phone = ', phone);
    setShowModalSpecialOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  return (
    <Modal onClose={onClose}>
      <div
        className="flex flex-col items-center mt-[44px] px-[16px] py-[24px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
      >
        <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[12px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
            <ToolIcon width={24} height={24} color={"#1570EF"} />
          </div>
        </div>
        <h5
          className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium mobile320:text-[21px] mobile320:leading-[25px] mobile375:text-[24px] mobile375:leading-[28.8px]
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] text-textPrimary"
        >
          Бажаєте щось особливе?
        </h5>
        <p
          className="mb-[24px] text-center mobile320:w-[258px] mobile375:w-[300px] desktop1440:w-[500px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] text-textSecondary"
        >
          Розкажіть нам про ваші побажання. А про інше потурбується менеджер.
        </p>
        <form className="flex flex-col" onSubmit={handleSubmitSpecialOrder}>
          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] text-textSecondary">
            <span className="mb-[4px]">Номер телефону</span>
            <span className="absolute grid items-center z-10 top-[34px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] text-textTertiary">
              +38
            </span>
            <input
              className="p-[10px] pl-[53px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:text-textTertiary border-[1px] border-borderDefault rounded-minimal"
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

          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] text-textSecondary">
            <span className="">Оберіть тип техніки</span>
            <input
              className="p-3 mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:text-textTertiary border-[1px] border-borderDefault rounded-minimal"
              name="phone"
              type="tel"
              id="phone"
              autoComplete="off"
              placeholder="Оберіть значення.."
              required
            />
            <span id="errorMessage" className="text-textWarning"></span>
          </label>

          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] text-textSecondary">
            <span className="">Оберіть марку</span>
            <input
              className="p-3 mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:text-textTertiary border-[1px] border-borderDefault rounded-minimal"
              name="phone"
              type="tel"
              id="phone"
              autoComplete="off"
              placeholder="Оберіть значення.."
              required
            />
            <span id="errorMessage" className="text-textWarning"></span>
          </label>

          <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] text-textSecondary">
            <span className="">Коментар</span>

            <textarea
              className="p-3 mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:text-textTertiary border-[1px] border-borderDefault rounded-minimal"
              placeholder="Оберіть значення.."
            />
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

export default ModalSpecialOrder;
