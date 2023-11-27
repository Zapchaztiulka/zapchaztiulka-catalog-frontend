import { ArrowDown, ArrowUp } from '@/public/icons';
import React, { useState } from 'react';
import CheckBox from './CheckBox';
import SearchFilter from './SearchFilter';

const TradeMarkFilter = ({
  trademarks,
  handleOnChange,
  trademarksArray,
  isVisibleTrademarks,
  trademarksIsDisabled,
  countryArray,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const [filtredValue, setFiltredValue] = useState(trademarks);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // console.log('before', disabledOnChange);
  // console.log(' after ', disabledOnSubmit);

  const handleSearch = e => {
    const searchValue = e.target.value;
    setValue(searchValue);
    const filtredItem = trademarks?.filter(item => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (value === '') {
      setFiltredValue(trademarks);
    } else {
      setFiltredValue(filtredItem);
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
          <div className="overflow-auto max-h-[392px] " id="style-scroll">
            <ul className="flex flex-col gap-xs2 max-w-[235px] ">
              {filtredValue?.map((item, index) => {
                const isChecked = trademarksArray?.includes(item.name);

                const disabledOnChange =
                  isVisibleTrademarks.length !== 0
                    ? !isVisibleTrademarks?.includes(item.name)
                    : false;
                const disabledOnSubmit =
                  countryArray.length !== 0 && trademarksIsDisabled !== 0
                    ? !trademarksIsDisabled?.includes(item.name)
                    : false;
                const isDisabled =
                  trademarksIsDisabled?.length === 0
                    ? disabledOnChange
                    : disabledOnSubmit;
                // console.log('before', isVisibleTrademarks);
                // console.log(' after ', trademarksIsDisabled);
                // // console.log('countryArray', countryArray);
                // console.log('before', disabledOnChange);
                // console.log(' after ', disabledOnSubmit);

                return (
                  <li
                    key={index}
                    className={`flex justify-between p-xs3 pl-xs2 ${
                      isDisabled ? 'hidden' : 'flex'
                    }`}
                  >
                    <label
                      className={`flex items-center gap-xs3 text-base/[24px]   ${
                        isDisabled ? 'text-textDisabled' : 'text-textPrimary'
                      }  cursor-pointer hover:text-textInputDefault checkbox`}
                    >
                      <CheckBox
                        filterName={item.name}
                        handleOnChange={handleOnChange}
                        isDisabled={isDisabled}
                        isChecked={isChecked}
                      />
                      <p className="text-ellipsis max-w-[170px]">
                        {' '}
                        {item.name !== '' ? item.name : 'Інше'}
                      </p>
                    </label>
                    <span className="text-[10px]/[14px] font-medium text-textSecondary bg-bgDisable py-xs3 px-xs2 rounded-medium3">
                      {item.countProducts}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarkFilter;
