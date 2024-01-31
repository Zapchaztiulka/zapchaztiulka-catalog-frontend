import React from 'react';

const DeliveryCourier = () => {
  return (
    <div className="pl-[32px] pr-[12px]">
      <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
        Введіть назву вулиці
        <span className="text-textError">*</span>
      </p>
      <input className="search-input w-full " type="text" />

      <div className="flex gap-2 mt-2">
        <div>
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер будинку
            <span className="text-textError">*</span>
          </p>
          <input className="search-input w-full " type="text" />
        </div>
        <div>
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер квартири
            <span className="text-textError">*</span>
          </p>
          <input className="search-input w-full " type="text" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryCourier;
