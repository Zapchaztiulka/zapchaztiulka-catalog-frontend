import { ArrowDown, ArrowUp } from '@/public/icons';
import React, { useState } from 'react';
import CheckBox from './CheckBox';
import SearchFilter from './SearchFilter';

const TradeMarkFilter = ({
  trademarks,
  handleOnChange,
  trademarksArray,
  filtredResultForDisabledTradeMark,
  matchTrademarks,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const [filtredValue, setFiltredValue] = useState(trademarks || []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  console.log(filtredResultForDisabledTradeMark);

  const handleSearch = e => {
    const searchValue = e.target.value;
    setValue(searchValue);
    if (trademarks) {
      const filtredItem = trademarks?.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      if (value === '') {
        setFiltredValue(trademarks);
      } else {
        setFiltredValue(filtredItem);
      }
    }
  };

  const removeSearchTerm = () => {
    setValue('');
    setFiltredValue(trademarks);
  };

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between items-center p-xs3 mb-xs2">
          <div className="font-lg text-textPrimary font-medium">Виробник</div>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center cursor-pointer border-none"
          >
            <ArrowDown className="w-[24px] h-[24px] stroke-iconSecondary fill-none" />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center p-xs3 mb-xs2">
            <div className="font-lg text-textPrimary font-medium">Виробник</div>
            <button
              type="button"
              onClick={toggle}
              className="flex items-center justify-between cursor-pointer border-none"
            >
              <ArrowUp className="w-[24px] h-[24px] stroke-iconPrimary fill-none" />
            </button>
          </div>
          <SearchFilter
            arrayOfValues={trademarks}
            handleSearch={handleSearch}
            removeSearchTerm={removeSearchTerm}
            value={value}
            placeholderName="Введіть виробника"
          />
          <div className="relative">
            <div className="overflow-auto max-h-[377px]" id="style-scroll">
              <ul className="flex flex-col gap-xs2 max-w-[235px] ">
                {trademarks !== undefined &&
                  filtredValue?.map((item, index) => {
                    const isChecked = trademarksArray?.includes(item.name);

                    // Shows the current quantity of the product depending on the selected values
                    const displayCount =
                      matchTrademarks.length === 0
                        ? item.countProducts
                        : matchTrademarks.find(
                            matchedItem => matchedItem.name === item.name
                          )?.count;
                    return (
                      <li
                        key={index}
                        className={`flex justify-between p-xs3 pl-xs2 ${
                          filtredResultForDisabledTradeMark[index]
                            ? 'hidden'
                            : 'flex'
                        }`}
                      >
                        <label
                          className={`flex items-center gap-xs3 text-base/[24px]   ${
                            filtredResultForDisabledTradeMark[index]
                              ? 'text-textDisabled'
                              : 'text-textPrimary'
                          }  cursor-pointer hover:text-textInputDefault checkbox`}
                        >
                          <CheckBox
                            filterName={item.name}
                            handleOnChange={handleOnChange}
                            isDisabled={
                              filtredResultForDisabledTradeMark[index]
                            }
                            isChecked={isChecked}
                          />
                          <p className="text-ellipsis max-w-[170px]">
                            {' '}
                            {item.name !== '' ? item.name : 'Інше'}
                          </p>
                        </label>
                        <span className="text-[10px]/[14px] font-medium text-textSecondary bg-bgDisable py-xs3 px-xs2 rounded-medium3">
                          {displayCount}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarkFilter;
