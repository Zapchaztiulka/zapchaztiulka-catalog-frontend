import { ArrowDown, ArrowUp } from "@/public/icons";
import React, { useState } from "react";
import CheckBox from "./CheckBox";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const TradeMarkFilter = ({
  trademarks,
  handleOnChange,
  trademarksArray,
  comparisonResults,
  onChangeTriggered,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
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

          <OverlayScrollbarsComponent
            element="span"
            options={{ scrollbars: { autoHide: 'move', visibility: 'auto' } }}
            defer
          >
            <ul className="flex flex-col gap-xs3 max-h-[250px] overflow-auto">
              {trademarks?.map((item, index) => {
                const isDisabled =
                  comparisonResults[index] && onChangeTriggered;
                const isChecked = trademarksArray?.includes(item.name);

                return (
                  <li
                    key={index}
                    className={`flex justify-between p-xs3 pl-xs2 ${
                      isDisabled ? 'hidden' : 'flex'
                    }`}
                  >
                    <label
                      htmlFor={item.name}
                      className={`flex items-center gap-xs3 text-base   ${
                        isDisabled ? 'text-textDisabled' : 'text-textPrimary'
                      }  cursor-pointer hover:text-textInputDefault checkbox`}
                    >
                      {/* <CheckBox
                        handleOnChange={handleOnChange}
                        filtersArray={trademarksArray}
                        filterName={item.name}
                        index={index}
                        comparisonResults={comparisonResults[index]}
                      /> */}
                      <input
                        type="checkbox"
                        name={item.name}
                        id={item.name}
                        value={item.name}
                        checked={isChecked}
                        onChange={handleOnChange}
                        disabled={isDisabled}
                        className="w-4 h-4 relative cursor-pointer border rounded-minimal border-borderDefault appearance-none custom-checkBox"
                      />
                      {item.name !== '' ? item.name : 'Інше'}
                    </label>
                    <span className="text-[10px]/[14px] font-medium text-textSecondary">
                      {item.countProducts}
                    </span>
                  </li>
                );
              })}
            </ul>
          </OverlayScrollbarsComponent>
        </div>
      )}
    </div>
  );
};

export default TradeMarkFilter;

