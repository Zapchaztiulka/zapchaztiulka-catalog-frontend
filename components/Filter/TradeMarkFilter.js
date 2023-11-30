import { ArrowDown, ArrowUp } from '@/public/icons';
import React, { useEffect, useRef, useState } from 'react';
import CheckBox from './CheckBox';
import SearchFilter from './SearchFilter';

const TradeMarkFilter = ({
  trademarks,
  handleOnChange,
  trademarksArray,
  comparisonResultsCountry,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const [filtredValue, setFiltredValue] = useState(trademarks);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

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




  

const [lastVisibleIndex, setLastVisibleIndex] = useState(0);
  const lastVisibleRef = useRef();
  console.log(lastVisibleIndex);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('style-scroll');
      const list = container.querySelector('ul');
      const containerRect = container.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      const items = Array.from(list.children);

      let lastVisibleItem = null;

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (
          itemRect.top >= containerRect.top &&
          itemRect.bottom <= containerRect.bottom &&
          itemRect.top >= listRect.top &&
          itemRect.bottom <= listRect.bottom
        ) {
          lastVisibleItem = index;
        }
      });

      setLastVisibleIndex(lastVisibleItem);
    };

    const container = document.getElementById('style-scroll');
    container.addEventListener('scroll', handleScroll);

    // Початкове встановлення індексу
    handleScroll();

    return () => {
      // Зняття обробників подій при виході з компонента
      container.removeEventListener('scroll', handleScroll);
    };
  }, [trademarks]);


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
            <div
              className="overflow-auto max-h-[392px]"
              id="style-scroll"
            >
              <ul
                className="flex flex-col gap-xs2 max-w-[235px] "
              >
                {filtredValue?.map((item, index) => {
                  const isChecked = trademarksArray?.includes(item.name);
              

                  return (
                    <li
                      key={index}
                      className={`flex justify-between p-xs3 pl-xs2 ${
                        comparisonResultsCountry[index] ? 'hidden' : 'flex'
                      }`}
                      ref={index === lastVisibleIndex ? lastVisibleRef : null}
                    >
                      <label
                        className={`flex items-center gap-xs3 text-base/[24px]   ${
                          comparisonResultsCountry[index]
                            ? 'text-textDisabled'
                            : 'text-textPrimary'
                        }  cursor-pointer hover:text-textInputDefault checkbox`}
                      >
                        <CheckBox
                          filterName={item.name}
                          handleOnChange={handleOnChange}
                          isDisabled={comparisonResultsCountry[index]}
                          isChecked={isChecked}
                        />
                        <p
                          className={`text-ellipsis max-w-[170px] ${
                            index === lastVisibleIndex ||
                            index === lastVisibleIndex + 1
                              ? 'lastVisibleItem'
                              : ''
                          }`}
                          data-index={index}
                      
                        >
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
        </div>
      )}
    </div>
  );
};

export default TradeMarkFilter;
