import React from 'react'
import Filter from './Filter';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import Chips from '../Chips/Chips';

const FilterMobile = ({ onClose, countriesUrlArray, trademarkUrlArray, handleDeleteChip, minPrice, maxPrice }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
      <div className="bg-white w-full h-full max-w-screen-lg max-h-screen overflow-auto px-s py-m tablet600:p-m">
        <div className="flex justify-between items-center py-xs mb-3">
          <p className="font-medium text-textPrimary text-lg/[25.2px]">
            Фільтри
          </p>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <Chips
          countriesUrlArray={countriesUrlArray}
          trademarkUrlArray={trademarkUrlArray}
          handleDeleteChip={handleDeleteChip}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <Filter />
      </div>
    </div>
  );
};

export default FilterMobile
