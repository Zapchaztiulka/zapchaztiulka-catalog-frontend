import React, { useRef, useState } from 'react';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useDispatch } from 'react-redux';
import { useOnKeyDown, useOutsideClick } from '@/hooks/useOnClickOutside';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';

const DeliveryBySelf = ({
  selfAddress,
  setSelfAddress,
  isErrorMessage,
  isClientStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(['Адресa 1', 'Адресa 2']);
  const dispatch = useDispatch();

  const refOption = useRef(null);
  const refSelect = useRef(null);

  const toggling = () => setIsOpen(!isOpen);

  const handleSelected = value => () => {
    setSelfAddress(value);
    setIsOpen(false);
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'deliveryOffice', value }));
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryOffice', value }));
    }
  };

  const close = () => {
    setIsOpen(false);
  };

  useOutsideClick(refOption, refSelect, toggling);
  useOnKeyDown(close);

  return (
    <div className="pl-[32px] pr-[12px] w-[299px] tablet600:w-[347px]">
      <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
        Оберіть адресу магазину
        <span className="text-textError">*</span>
      </p>

      <div ref={refSelect} className="relative">
        <div
          onClick={toggling}
          className="flex justify-between cursor-pointer search border border-borderDefault rounded-minimal p-3 w-full"
        >
          <div className="text-textPrimary font-medium text-[16px]/[22.4px] -tracking-[0.24px] w-[155px]">
            {selfAddress || address[0]}
          </div>
          {isOpen ? (
            <ArrowUpIcon color={theme.extend.colors.iconSecondary} />
          ) : (
            <ArrowDownIcon color={theme.extend.colors.iconSecondary} />
          )}
        </div>
        {isErrorMessage && selfAddress === '' && (
          <p className="text-textError text-[12px]">Оберіть адресу</p>
        )}

        {isOpen && (
          <div
            ref={refOption}
            className="absolute z-10 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300"
          >
            <ul>
              {address &&
                address?.map(item => (
                  <li
                    key={Math.random()}
                    onClick={handleSelected(item)}
                    className="cursor-pointer p-3 hover:text-textBrand"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-2 flex gap-3 text-[12px]/[18px] text-textSecondary">
        <div>
          <p>Пн - Пт</p>
          <p>Cб</p>
        </div>
        <div>
          <p>8:00-18:00</p>
          <p>10:00-18:00</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBySelf;
