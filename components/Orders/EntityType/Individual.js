import { formatPhoneNumber, replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Individual = () => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const [phone, setPhone] = useState(checkoutData?.phone || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };

  const validateEmail = email => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  const handlePhoneInputChange = event => {
    const inputPhoneNumber = event.target.value;
    if (inputPhoneNumber[0] !== '0') {
      setErrorMessage('Номер телефону має починатись з "0"');   
    } else {
      setErrorMessage('');
    }
      const formattedPhoneNumber = formatPhoneNumber(
        inputPhoneNumber[0] === '0'
          ? inputPhoneNumber
          : inputPhoneNumber.slice(0, 1)
      );
  setPhone(formattedPhoneNumber); 
  event.target.maxLength = inputPhoneNumber[0] === '0' ? 13 : 1;
  dispatch(addToCheckout({ field: 'phone', value: formattedPhoneNumber }));
  };

    const handleEmailInputChange = (event) => {
    const inputEmail = event.target.value;
    if (!validateEmail(inputEmail)) {
      setEmailError('Приклад example@mail.com');
    } else {
      setEmailError('');
    }
    handleInputChange('email', inputEmail);
  };

  return (
    <>    
        <div className="checkout-contacts-input search">
          <label>
            Ім'я <span className="text-textError">*</span>
            <input
              name="username"
              type="text"
              required
              value={checkoutData.username}
              onChange={e => handleInputChange('username', e.target.value)}
              className="w-full border border-borderDefault rounded-minimal p-3"
            />
          </label>
        </div>
        <div className="checkout-contacts-input search">
          <label>
            Прізвище <span className="text-textError">*</span>
            <input
              name="userSurname"
              type="text"
              value={checkoutData.userSurname}
              required
              onChange={e => handleInputChange('userSurname', e.target.value)}
              className="w-full border border-borderDefault rounded-minimal p-3"
            />
          </label>
        </div>
         
        <div className="checkout-contacts-input search">
          <label>
            По батькові <span className="text-textError">*</span>
            <input
              name="userMiddleName"
              type="text"
              value={checkoutData.userMiddleName}
              required
              onChange={e =>
                handleInputChange('userMiddleName', e.target.value)
              }
              className="w-full border border-borderDefault rounded-minimal p-3"
            />
          </label>
        </div>

        <div className="checkout-contacts-input search">
          <label>
            E-mail <span className="text-textError">*</span>
            <input
              name="mail"
              type="email"
              title="example@mail.com"
              value={checkoutData.email}
              required
              onChange={handleEmailInputChange}
              className="w-full border border-borderDefault rounded-minimal p-3"
            />
            <span className="text-textWarning text-[12px]">{emailError}</span>
          </label>
        </div>
     

      <div className="checkout-contacts-input search">
        <label className="relative">
          Номер телефону <span className="text-textError">*</span>
          <span className="absolute grid items-center z-10 top-[29px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-base/[24px] text-textTertiary">
            +38
          </span>
          <input
            className="pl-[53px] text-base/[24px]  w-full h-[48px]  border border-borderDefault rounded-minimal"
            name="phone"
            type="tel"
            id="phone"
            maxLength="13"
            pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
            title="096 123 45 67"
            autoComplete="off"
            required
            onChange={handlePhoneInputChange}
            value={checkoutData?.phone}
          />
          <span className="text-textWarning text-[12px]">{errorMessage}</span>
        </label>
      </div>
    </>
  );
};

export default Individual;
