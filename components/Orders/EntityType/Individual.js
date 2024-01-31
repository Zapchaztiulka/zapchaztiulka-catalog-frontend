import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import React from 'react'

const Individual = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <label>
            Ім'я <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
        <div className="checkout-contacts-input">
          <label>
            Прізвище <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <label>
            По батькові <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>

        <div className="checkout-contacts-input">
          <label>
            E-mail <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="checkout-contacts-input">
        <label className="relative">
          Номер телефону <span className="text-textError">*</span>
          <span className="absolute grid items-center z-10 block top-[29px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
            +38
          </span>
          <input
            className="pl-[53px] w-full h-[48px] border border-borderDefault rounded-minimal"
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
      </div>
    </div>
  );
}

export default Individual
