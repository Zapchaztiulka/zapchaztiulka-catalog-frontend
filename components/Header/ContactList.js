'use client';
import { useOnKeyDown, useOutsideClick } from '@/hooks/useOnClickOutside';
import { useEffect, useRef, useState } from 'react';
import theme from '@/presets';
import {
  ArrowDownIcon,
  PhoneIcon,
  ArrowUpIcon,
} from 'universal-components-frontend/src/components/icons';

const ContactList = ({ patterns }) => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState([]);

    useEffect(() => {
    if (patterns) {
      setPhone(['+38 (096) 361 83 98', '+38 (063) 507 12 31']);
    }
  }, [patterns]);


  const refOption = useRef(null);
  const refSelect = useRef(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelected(value);
    setIsOpen(false);
  };

  const close = () => {
    setIsOpen(false);
  };

  useOutsideClick(refOption, refSelect, toggling);
  useOnKeyDown(close);

  return (
    <div ref={refSelect} className="relative tablet768:block hidden">
      <div
        onClick={toggling}
        className="flex cursor-pointer p-xs2 focus:outline-none  custom-select-contact"
      >
        <PhoneIcon color={theme.extend.colors.iconSecondary} className="mr-2" />
        <div className="text-textPrimary font-medium text-[16px]/[22.4px] -tracking-[0.24px] w-[155px]">
          {selected || phone[0]}
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
            {phone &&
              phone?.map(item => (
                <li
                  key={Math.random()}
                  onClick={onOptionClicked(item)}
                  className="cursor-pointer pl-10 py-2 hover:text-textBrand"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactList;
