import React from 'react'
import Filter from './Filter';
import { CloseIcon } from '@/public/icons';

const FilterMobile = ({ showFilter, toggle }) => {
  const visibleStyle = {
    opacity: `${showFilter ? '1' : '0'}`,
    top: ` ${showFilter ? '0' : '-100%'}`,
    left: `${showFilter ? '0' : '0'}`,
  };

  return (
    <section
      className={`${
        showFilter
          ? 'tablet1024:hidden z-50 flex flex-col fixed w-full min-h-screen bg-bgWhite px-s py-m'
          : 'hidden'
      }   `}
      style={visibleStyle}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="font-medium text-textPrimary text-lg">Фільтр</p>
        <button onClick={toggle}>
          <CloseIcon className="stroke-iconPrimary" width="34" height="34" />
        </button>
      </div>
      <Filter />
    </section>
  );
};

export default FilterMobile
