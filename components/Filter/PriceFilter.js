"use client";
import { findMaxPrice, findMinPrice } from "@/helpers/checkForMatchValue";
import { ArrowDown, ArrowUp } from "@/public/icons";
import { filterProductsMax, filterProductsMin } from "@/redux/filterSlice";
import { selectFilter } from "@/redux/products/productsSelectors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceFilter = ({ productInfo }) => {
  const [isOpen, setIsOpen] = useState(true);
  const minPrice = findMinPrice(productInfo.trademarks);
  const maxPrice = findMaxPrice(productInfo.trademarks);
   const [minValue, setMinValue] = useState();
   const [maxValue, setMaxValue] = useState();
  //  console.log('Максимльне значення maxPrice:', maxValue);
  // console.log('Мінімальне значення minPrice:', minValue);
  console.log(productInfo);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOnChangeMinPrice = e => {
    const { value } = e.target;
    setMinValue(value);
  };

  const handleOnChangeMaxPrice = e => {
      const { value } = e.target;
      setMaxValue(value);
    };

  return (
    <div>
      {!isOpen ? (
        <div className="flex justify-between items-center p-xs3 mb-xs2">
          <div className="font-lg text-textPrimary font-medium">Ціна</div>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center cursor-pointer border-none"
          >
            <ArrowDown className="w-[24px] h-[24px] stroke-iconSecondary fill-none" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center p-xs3 mb-xs2">
            <div className="font-lg text-textPrimary font-medium">Ціна</div>
            <button
              type="button"
              onClick={toggle}
              className="flex items-center justify-between cursor-pointer border-none"
            >
              <ArrowUp className="w-[24px] h-[24px] stroke-iconPrimary fill-none" />
            </button>
          </div>

          <div className="flex gap-xs3 items-center">
            <input
              className="price-input"
              value={minValue}
              onChange={handleOnChangeMinPrice}
              placeholder={minPrice}
            />
            <p>—</p>
            <input
              className="price-input"
              value={maxValue}
              onChange={handleOnChangeMaxPrice}
              placeholder={maxPrice}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
