import React, { useRef, useState } from 'react';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useOnKeyDown, useOutsideClick } from '@/hooks/useOnClickOutside';
import { ArrowDownIcon, ArrowUpIcon } from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';

const DeliveryBySelf = () => {
   const checkoutData = useSelector(selectCheckout);
  const [selected, setSelected] = useState(checkoutData?.deliveryOffice || '');
  const [isOpen, setIsOpen] = useState(false);
  const [addressForself, setAddressForself] = useState(['Адрес 1', 'Адрес 2']);

  const dispatch = useDispatch();

  const refOption = useRef(null);
  const refSelect = useRef(null);

  const toggling = () => setIsOpen(!isOpen);

  const handleSelected = value => () => {
    setSelected(value);
    dispatch(addToCheckout({ field: 'deliveryOffice', value })); 
    setIsOpen(false);
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

      <div ref={refSelect} className="relative tablet768:block hidden">
        <div
          onClick={toggling}
          className="flex cursor-pointer p-xs2 focus:outline-none  custom-select-contact"
        >
          <div className="text-textPrimary font-medium text-[16px]/[22.4px] -tracking-[0.24px] w-[155px]">
            {selected || addressForself[0]}
          </div>
          {isOpen ? (
            <ArrowUpIcon color={theme.extend.colors.iconSecondary} />
          ) : (
            <ArrowDownIcon color={theme.extend.colors.iconSecondary} />
          )}
        </div>

        {isOpen && (
          <div
            ref={refOption}
            className="absolute z-10 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300"
          >
            <ul>
              {addressForself &&
                addressForself?.map(item => (
                  <li
                    key={Math.random()}
                    onClick={handleSelected(item)}
                    className="cursor-pointer pl-10 py-2 hover:text-textBrand"
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
