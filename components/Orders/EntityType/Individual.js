import { formatPhoneNumber } from '@/helpers/formatPhoneNumber';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Individual = ({
  patterns,
  isEmptyData,
  checkoutData,
  isClientStatus,
}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(
    isClientStatus ? checkoutData?.phone || '' : checkoutData?.phoneLegal || ''
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'username':
      case 'userSurname':
      case 'userMiddleName':
        const minLength = 3;
        const regex = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]*$/u;
        if (!regex.test(value)) {
          value = value.replace(/[^A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]/gu, '');
        }
        if (value.length < minLength) {
          setErrorMessageName('Має бути не менше 3-х букв');
        } else {
          setErrorMessageName('');
        }
        break;
      default:
        break;
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field, value }));
    }

    if (isClientStatus) {
      dispatch(addToCheckout({ field, value }));
    }
  };

  const validateEmail = email => {
    const emailPattern = new RegExp(patterns.emailPattern);
    return emailPattern.test(email);
  };

  const handlePhoneInputChange = event => {
    const inputPhoneNumber = event.target.value;
    if (inputPhoneNumber[0] !== '0') {
      setErrorMessage(patterns.phonePatternMessage);
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
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'phoneLegal', value: formattedPhoneNumber })
      );
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'phone', value: formattedPhoneNumber }));
    }
  };

  const handleEmailInputChange = event => {
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
            value={checkoutData.username}
            onChange={e => handleInputChange('username', e.target.value)}
            className="w-full border border-borderDefault rounded-minimal p-3"
          />
          {isEmptyData && checkoutData.username === '' && (
            <p className="text-textError text-[12px]">Заповніть ім'я</p>
          )}
        </label>
      </div>
      <div className="checkout-contacts-input search">
        <label>
          Прізвище <span className="text-textError">*</span>
          <input
            name="userSurname"
            type="text"
            value={checkoutData.userSurname}
            onChange={e => handleInputChange('userSurname', e.target.value)}
            className="w-full border border-borderDefault rounded-minimal p-3"
          />
          {isEmptyData && checkoutData.userSurname === '' && (
            <p className="text-textError text-[12px]">Заповніть прізвище</p>
          )}
        </label>
      </div>

      <div className="checkout-contacts-input search">
        <label>
          По батькові <span className="text-textError">*</span>
          <input
            name="userMiddleName"
            type="text"
            value={checkoutData.userMiddleName}
            onChange={e => handleInputChange('userMiddleName', e.target.value)}
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
            onChange={handleEmailInputChange}
            className="w-full border border-borderDefault rounded-minimal p-3"
          />
          <span className="text-textWarning text-[12px]">{emailError}</span>
          {isEmptyData && checkoutData.email === '' && (
            <p className="text-textError text-[12px]">Заповніть E-mail</p>
          )}
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
            onChange={handlePhoneInputChange}
            value={checkoutData?.phone}
          />
          <span className="text-textWarning text-[12px]">{errorMessage}</span>
          {isEmptyData && checkoutData.phone === '' && (
            <p className="text-textError text-[12px]">
              Заповніть номер телефону
            </p>
          )}
        </label>
      </div>
    </>
  );
};

export default Individual;
