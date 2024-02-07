import Dropdown from '@/components/Dropdown';
import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import React from 'react';

const Legal = ({
  isLegalPerson,
  setIsLegalPerson,
  isStateOfRegister,
  setIsStateOfRegister,
  isCityOfRegister,
  setIsCityOfRegister,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <p className="">
            Тип рестрації <span className="text-textError">*</span>
          </p>
          <Dropdown
            selected={isLegalPerson}
            options={['ФОП', 'Юридична особа']}
            onSelected={value => () => {
              setIsLegalPerson(value);
            }}
          />
        </div>
        <div className="checkout-contacts-input">
          {' '}
          <label>
            Назва <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          {' '}
          <label>
            ЄДРПОУ <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
        <div className="checkout-contacts-input">
          {' '}
          <label>
            ІПН <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <p className="mb-[4px]">
            Область реєстрації <span className="text-textError">*</span>
          </p>
          <Dropdown
            selected={isStateOfRegister}
            options={['Область 1', 'Область 2', 'Область 3', 'Область 4']}
            onSelected={value => () => {
              setIsStateOfRegister(value);
            }}
          />
        </div>
        <div className="checkout-contacts-input">
          {' '}
          <p className="mb-[4px]">
            Місто реєстрації <span className="text-textError">*</span>
          </p>
          <Dropdown
            selected={isCityOfRegister}
            options={['Місто 1', 'Місто 2', 'Місто 3', 'Місто 4']}
            onSelected={value => () => {
              setIsCityOfRegister(value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          {' '}
          <label>
            Юридична адреса <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
        <div className="checkout-contacts-input">
          {' '}
          <label>
            Ім'я <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          {' '}
          <label>
            Прізвище <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
        <div className="checkout-contacts-input">
          {' '}
          <label>
            По батькові <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <label>
            E-mail <span className="text-textError">*</span>
            <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
          </label>
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
    </div>
  );
};

export default Legal;
