"use client";
import { testData } from "@/helpers/tempData";
import { ArrowDown, ArrowUp } from "@/public/icons";
import React, { useState } from "react";
import CheckBox from "./CheckBox";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const TradeMarkFilter = () => {
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
            options={{ scrollbars: { autoHide: "never" } }}
            defer
          >
            <ul className="flex flex-col gap-xs3 max-h-[250px] overflow-auto">
              {testData.map((item) => {
                return (
                  <li key={item.id} className="p-xs3 pl-xs2">
                    <label className="flex items-center gap-xs3 text-base text-textPrimary cursor-pointer hover:text-textInputDefault checkbox">
                      <CheckBox />
                      {item.trademark}
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