'use client';
import { findMaxPrice, findMinPrice, formatNumberWithSpace } from '@/helpers/checkForMatchValue';
import { ArrowDown, ArrowUp } from '@/public/icons';
import { selectFilter } from '@/redux/products/productsSelectors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PriceFilter = ({
  minValue,
  maxValue,minPrice,maxPrice,
  handleOnChangeMinPrice,
  handleOnChangeMaxPrice,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };


  // console.log(minPrice);
  // console.log(maxValue);

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

          <div className="flex gap-xs3 items-center justify-center">
            <input
              className="price-input"
              value={minValue || ''}
              onChange={handleOnChangeMinPrice}
              placeholder={minPrice}
              type="number"
            />
            <p className="text-sm/[19.6px] -tracking-[0.21px]">—</p>
            <input
              className="price-input"
              value={maxValue || ''}
              onChange={handleOnChangeMaxPrice}
              placeholder={maxPrice}
              type="number"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
