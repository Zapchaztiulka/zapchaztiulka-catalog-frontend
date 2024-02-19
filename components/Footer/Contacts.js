import React from 'react'

const Contacts = ({patterns}) => {
//  const { firstPhone, secondPhone, thirdPhone } = patterns?.companyData || {};

//     const renderPhoneNumberLink = phoneNumber => {
//       return (
//         <a href={`tel:${phoneNumber}`} key={phoneNumber}>
//           {phoneNumber}
//         </a>
//       );
//     };

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-textTertiary text-lg">Контакти</h4>
      <ul className="text-textPrimary text-base">
        <li className="footer-items ">
          <a href="tel:+380963618398">+38 (096) 361 83 98</a>
        </li>
        <li className="footer-items ">
          <a href="tel:+380635071231">+38 (063) 507 12 31</a>
        </li>
      </ul>
    </div>
  );
}

export default Contacts
