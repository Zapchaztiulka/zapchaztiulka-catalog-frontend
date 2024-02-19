import React from 'react'

const ForCustomers = ({ handleChatButtonClick }) => {
  return (
    <div className="flex flex-col gap-3 ">
      <h4 className="text-textTertiary text-lg">Покупцеві</h4>
      <ul className="text-textPrimary text-base">
        <li className=" footer-items">
          <p onClick={handleChatButtonClick}>Онлайн допомога</p>
        </li>
        {/* <li className=" footer-items">
                <p>Доставка та оплата</p>
              </li>
              <li className=" footer-items">
                <p>Про нас</p>
              </li> */}
        <li className=" footer-items">
          <a target="_blank" rel="noopener noreferrer">
            Політика конфіденційності
          </a>
        </li>
        <li className=" footer-items">
          <a target="_blank" rel="noopener noreferrer">
            Договір публічної оферти
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ForCustomers
