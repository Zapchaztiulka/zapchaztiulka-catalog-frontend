import { useRef } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from 'universal-components-frontend/src/components/icons';
import { useOnKeyDown, useOutsideClick } from '@/hooks/useOnClickOutside';
import theme from '@/presets';

const SortFilter = ({
  toggling,
  selected,
  options,
  onOptionClicked,
  isOpen,
  close,
}) => {
  const refOption = useRef(null);
  const refSelect = useRef(null);

  useOutsideClick(refOption, refSelect, toggling);
  useOnKeyDown(close);

  return (
    <div className="flex gap-2 tablet1024:gap-3 items-center mb-4 tablet600:mb-0 tablet1024:mb-4">
      <p className="text-textPrimary text-base/[22.4px] font-medium">
        Сортувати:
      </p>
      <div
        ref={refSelect}
        className="relative p-xs2 border rounded border-borderDefault w-[191px] mobile375:w-[215px]"
      >
        <div
          onClick={toggling}
          className="flex cursor-pointer focus:outline-none  custom-select-contact justify-between"
        >
          <div className="text-textPrimary  text-base/[24px] -tracking-[0.24px] ">
            {selected || 'Оберіть значення...'}
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
            className="absolute right-0 z-20 mt-2 w-full bg-bgWhite border rounded-minimal shadow-md shadow-gray-300"
          >
            <ul>
              {options &&
                options?.map(item => (
                  <li
                    key={Math.random()}
                    onClick={onOptionClicked(item)}
                    className="cursor-pointer p-xs2 hover:text-textBrand text-textPrimary  text-base/[24px] -tracking-[0.24px]"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortFilter;
