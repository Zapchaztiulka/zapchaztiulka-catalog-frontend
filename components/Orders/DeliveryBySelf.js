import React from 'react';
import Dropdown from '../Dropdown';

const DeliveryBySelf = ({ addressForself, setAddressForself }) => {
  return (
    <div className="pl-[32px] pr-[12px] w-[299px] tablet600:w-[347px]">
      <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
        Оберіть адресу магазину
        <span className="text-textError">*</span>
      </p>
      <Dropdown
        selected={addressForself}
        options={['Адреса 1', 'Адреса 2']}
        onSelected={value => () => {
          setAddressForself(value);
        }}
      />
      <div className="mt-2 flex gap-3 text-[12px]/[18px] text-textSecondary">
        <div>
          <p>Пн - Пт</p>
          <p>Cб</p>
        </div>
        <div>
          <p>8:00-18:00</p>
          <p>10:00-18:00</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBySelf;
