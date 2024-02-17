import theme from '@/presets';
import React from 'react'
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const CouriersDelivery = ({
  valueStreet,
  valueHouse,
  valueApartment,
  refInput,
  refList,
  streetList,
  isLoadingStreets,
  handleInputChangeStreet,
  handleInputChangeHouse,
  handleInputChangeApartment,
  handleSelectionStreet,
  handleInputFocus,
  handleInputBlur,
  isErrorMessage,
  cityRefData,
  isListOpen,
  removeStreet,
  isInputFocused,
}) => {
  return (
    <div className="pl-[32px] pr-[12px]">
      <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
        Введіть назву вулиці
        <span className="text-textError">*</span>
      </p>

      <div className="search checkout-delivery-input relative">
        <div className="relative">
          <input
            ref={refInput}
            type="text"
            value={valueStreet}
            onChange={handleInputChangeStreet}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              isInputFocused ? '' : 'Введіть назву та оберіть значення..'
            }
            className={`p-3 ${
              isErrorMessage && valueStreet === ''
                ? 'border border-borderError'
                : ''
            } flex-grow border border-borderDefault rounded-minimal w-full  text-base leading-6 placeholder:text-textInputDefault text-textPrimary`}
          />
          {valueStreet !== '' && (
            <button
              className=" absolute right-3 top-3"
              type="button"
              onClick={removeStreet}
            >
              <CloseIcon size="20" color={theme.extend.colors.iconSecondary} />
            </button>
          )}
        </div>
        {cityRefData === '' && valueStreet === '' && isInputFocused && (
          <span className="text-textError text-[12px]">
            Ви не обрали місто доставки
          </span>
        )}
        {isErrorMessage && valueStreet === '' && (
          <p className="text-textError text-[12px]">Заповніть назву вулиці</p>
        )}

        {streetList &&
          streetList.length !== 0 &&
          isListOpen &&
          !isLoadingStreets && (
            <ul
              ref={refList}
              className="absolute tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
            >
              {streetList?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectionStreet(item)}
                  className="relative cursor-pointer select-none p-2 hover:text-textBrand"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
      </div>

      <div className="flex gap-2 tablet600:gap-3 mt-2">
        <div className=" search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер будинку
            <span className="text-textError">*</span>
          </p>
          <input
            className={`p-3 w-[118px] mobile375:w-[145.5px] tablet600:w-[172px] ${
              isErrorMessage && valueHouse === ''
                ? 'border border-borderError'
                : ''
            } rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault `}
            value={valueHouse}
            type="text"
            onChange={handleInputChangeHouse}
          />
          {isErrorMessage && valueHouse === '' && (
            <div className="text-textError text-[12px]">
              Заповніть номер будинку
            </div>
          )}
        </div>

        <div className=" search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер квартири
            <span className="text-textError">*</span>
          </p>
          <input
            className="p-3 w-[118px] mobile375:w-[145.5px] tablet600:w-[172px] rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault "
            type="text"
            value={valueApartment}
            onChange={handleInputChangeApartment}
          />
        </div>
      </div>
    </div>
  );
};

export default CouriersDelivery;
