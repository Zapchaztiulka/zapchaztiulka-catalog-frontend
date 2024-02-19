import React from 'react';

const Address = ({patterns}) => {
  // const address = patterns.companyData?.addressCompany
  const handleLinkClick = event => {
    const confirmed = window.confirm(
      'Ви впевнені, що хочете перейти за посиланням?'
    );
    if (!confirmed) {
      event.preventDefault(); // Скасувати перехід за посиланням, якщо користувач відмовиться
    }
  };


  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-textTertiary text-lg">Графік роботи</h4>
      <ul className="text-textPrimary text-base">
        <li className="py-[10px] px-[4px] ">Пн - Пт 9:00-18:00</li>
        <li className="py-[10px] px-[4px] ">Сб - 9:00-13:00</li>
        <li className="py-[10px] px-[4px] ">Нд - вихідний</li>
        <li className="footer-items ">
          <a
            href="https://maps.app.goo.gl/dTJm1YpuDDHzd9Dj9"
            target="_blank"
            rel="noopener noreferrer"
            // onClick={handleLinkClick}
          >
            Адреса магазину
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Address;
