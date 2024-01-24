import React from 'react';

const Address = ({patterns}) => {
  // const address = patterns.companyData?.addressCompany

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-textTertiary text-lg">Графік роботи</h4>
      <ul className="text-textPrimary text-base">
        <li className="py-[10px] px-[4px] ">Пн - Пт 8:00-18:00</li>
        <li className="py-[10px] px-[4px] ">Сб - 10:00-18:00</li>
        <li className="py-[10px] px-[4px] ">Нд - вихідний</li>
        <li className="footer-items ">
          <a href="https://maps.app.goo.gl/rXMJgswSQf5aGt4o9"
            target="_blank"
            rel="noopener noreferrer">Адреса магазину</a>
        </li>
      </ul>
    </div>
  );
};

export default Address;
