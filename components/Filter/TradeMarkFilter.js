import { ArrowDown, ArrowUp } from "@/public/icons";
import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCountryPriceTrademark } from "@/redux/products/productsSelectors";


const TradeMarkFilter = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const trademarks = productInfo?.trademarks;

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
            options={{ scrollbars: { autoHide: "never" } }}
            defer
          >
            <ul className="flex flex-col gap-xs3 max-h-[250px] overflow-auto">
              {trademarks?.map((item, index) => {
                if (item.name === "") {
                  return (
                    <li key={`${item.name}+${index}`} className="p-xs3 pl-xs2">
                      <label className="flex items-center gap-xs3 text-base text-textPrimary cursor-pointer hover:text-textInputDefault checkbox">
                        <CheckBox />
                        Інше
                      </label>
                    </li>
                  );
                }
                return (
                  <li key={`${item.name}+${index}`} className="p-xs3 pl-xs2">
                    <label className="flex items-center gap-xs3 text-base text-textPrimary cursor-pointer hover:text-textInputDefault checkbox">
                      <CheckBox />
                      {item.name}
                    </label>
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
