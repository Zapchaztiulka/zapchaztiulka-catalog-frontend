import { useRef } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from 'universal-components-frontend/src/components/icons';
import { useOnKeyDown, useOutsideClick } from '@/hooks/useOnClickOutside';
import theme from '@/presets';
import { useState } from 'react';

const Dropdown = ({ selected, options, onSelected }) => {
  const refOption = useRef(null);
  const refSelect = useRef(null);

  const toggling = () => setIsOpenDropdown(!isOpenDropdown);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const close = () => {
    setIsOpenDropdown(false);
  };

  useOutsideClick(refOption, refSelect, toggling);
  useOnKeyDown(close);

  return (
    <div className="flex gap-2 tablet1024:gap-3 items-center w-full h-[48px] border rounded border-borderDefault">
      <div ref={refSelect} className="relative p-xs2 w-full">
        <div
          onClick={toggling}
          className="w-full flex cursor-pointer focus:outline-none custom-select-contact justify-between"
        >
          <div className="w-full text-textPrimary  text-base/[24px] -tracking-[0.24px]">
            {selected || 'Оберіть значення...'}
          </div>
          {isOpenDropdown ? (
            <ArrowUpIcon color={theme.extend.colors.iconSecondary} />
          ) : (
            <ArrowDownIcon color={theme.extend.colors.iconSecondary} />
          )}
        </div>

        {isOpenDropdown && (
          <div
            ref={refOption}
            onClick={toggling}
            className="absolute right-0 z-20 mt-2 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300"
          >
            <ul>
              {options &&
                options?.map(item => (
                  <li
                    key={Math.random()}
                    onClick={onSelected(item)}
                    className="cursor-pointer p-xs2 hover:text-textBrand text-textPrimary  text-base/[24px] -tracking-[0.24px]"
                  >
                    <div className="flex justify-between">
                      {item}
                      {selected === item && <CheckIcon />}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
