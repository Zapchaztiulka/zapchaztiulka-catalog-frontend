import React from 'react'
import Filter from './Filter';
import { CloseIcon } from '@/public/icons';

const FilterMobile = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 ">
      <div className="bg-white w-full h-full max-w-screen-lg max-h-screen overflow-auto px-s py-m ">
        <div className="flex justify-between items-center mb-6">        
            <p className="font-medium text-textPrimary text-lg">Фільтр</p>
            <button onClick={onClose}>
              <CloseIcon
                className="stroke-iconPrimary"
                width="34"
                height="34"
              />
            </button>
        </div>
        <Filter />
      </div>
    </div>
  );
};

export default FilterMobile
