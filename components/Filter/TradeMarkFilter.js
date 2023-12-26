import {
  ArrowUpIcon,
  ArrowDownIcon,
} from 'universal-components-frontend/src/components/icons';
import { Button } from 'universal-components-frontend/src/components/buttons';
import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import SearchFilter from './SearchFilter';
import { useWindowSize } from '@/hooks/useWindowSize';

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
  const [isAllDiasble, setIsAllDisable] = useState(false);
  const windowSize = useWindowSize();
  const isTabletOrMobile = windowSize < 1024;
  const [visibleItemsCount, setVisibleItemsCount] = useState(
    isTabletOrMobile ? 10 : filtredValue.length
  );
  const [showAllItems, setShowAllItems] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isTabletOrMobile) {
      setVisibleItemsCount(filtredValue.length);
    }
  }, [isTabletOrMobile]);

  const handleShowAllItems = () => {
    setShowAllItems(!showAllItems);
    setVisibleItemsCount(showAllItems ? 10 : filtredValue.length);
  };

  const handleSearch = e => {
    const searchValue = e.target.value;
    // setValue(searchValue.replace(/[^a-zA-Z0-9\u0400-\u04FF]/g, ''));
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

  useEffect(() => {
    setFiltredValue(trademarks);
  }, [trademarks]);

  const removeSearchTerm = () => {
    setValue('');
    setFiltredValue(trademarks);
  };

  useEffect(() => {
    const isAllTrue = filtredResultForDisabledTradeMark.every(value => value);
    setIsAllDisable(isAllTrue);
  }, [filtredResultForDisabledTradeMark]);

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between items-center p-xs3 mb-xs2">
          <div className="text-lg/[21.6px] text-textPrimary font-medium">
            Виробник
          </div>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center cursor-pointer border-none"
          >
            <ArrowDownIcon />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center p-xs3 mb-xs2">
            <div className="text-lg/[21.6px] text-textPrimary font-medium">
              Виробник
            </div>
            <button
              type="button"
              onClick={toggle}
              className="flex items-center justify-between cursor-pointer border-none"
            >
              <ArrowUpIcon />
            </button>
          </div>
          {!isAllDiasble && (
            <SearchFilter
              arrayOfValues={trademarks}
              handleSearch={handleSearch}
              removeSearchTerm={removeSearchTerm}
              value={value}
              placeholderName="Введіть виробника"
            />
          )}
          <div className="relative">
            <div
              className={`${
                isTabletOrMobile ? 'tablet1024:' : ''
              }overflow-auto ${
                isTabletOrMobile ? 'tablet1024:' : ''
              }max-h-[377px]`}
              id="style-scroll"
            >
              <ul
                className={`flex flex-col gap-xs2 ${
                  isTabletOrMobile ? 'tablet1024:' : ''
                }max-w-[235px] `}
              >
                {trademarks &&
                  filtredValue
                    .filter(
                      (item, index) => !filtredResultForDisabledTradeMark[index]
                    )
                    .slice(0, visibleItemsCount)
                    .map((item, index) => {

                       //Find index of items after slice
                      const originalIndex = filtredValue.findIndex(
                        originalItem =>
                          originalItem.name === item.name &&
                          !filtredResultForDisabledTradeMark[
                            filtredValue.indexOf(originalItem)
                          ]
                      );
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
                          className={`flex justify-between p-xs3 pl-xs2`}
                        >
                          <label
                            className={`flex items-center gap-xs3 text-base/[24px]   ${
                              filtredResultForDisabledTradeMark[originalIndex]
                                ? 'text-textDisabled'
                                : 'text-textPrimary'
                            }  cursor-pointer hover:text-textInputDefault checkbox`}
                          >
                            <CheckBox
                              filterName={item.name}
                              handleOnChange={handleOnChange}
                              isDisabled={
                                filtredResultForDisabledTradeMark[originalIndex]
                              }
                              isChecked={isChecked}
                            />
                            <p className="tablet1024:text-ellipsis max-w-[170px]">
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
                {filtredValue.length === 0 && (
                  <li className="text-textPrimary text-base/[24px] pl-2">
                    По вашому запиту нічого не знайдено. Уточніть свій запит
                  </li>
                )}
              </ul>

              <Button
                buttonType="tertiary"
                text={showAllItems ? 'Приховати' : 'Показати всі'}
                className="tablet1024:hidden text-base/[22.4px] mt-2 px-xs py-xs2"
                onClick={handleShowAllItems}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeMarkFilter;
