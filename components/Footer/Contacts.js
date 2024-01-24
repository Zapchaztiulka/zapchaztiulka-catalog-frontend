import React from 'react'

const Contacts = ({patterns}) => {
 const { firstPhone, secondPhone, thirdPhone } = patterns?.companyData || {};

    const renderPhoneNumberLink = phoneNumber => {
      return (
        <a href={`tel:${phoneNumber}`} key={phoneNumber}>
          {phoneNumber}
        </a>
      );
    };

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-textTertiary text-lg">Контакти</h4>
      <ul className="text-textPrimary text-base">
        <li className="footer-items ">
          {renderPhoneNumberLink(firstPhone)}      
        </li>
        <li className="footer-items ">
           {renderPhoneNumberLink(secondPhone)}
        </li>
        <li className="footer-items ">
         {renderPhoneNumberLink(thirdPhone)}
        </li>
      </ul>
    </div>
  );
}

export default Contacts
