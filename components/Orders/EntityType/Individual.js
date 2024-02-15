import { formatPhoneNumber } from '@/helpers/formatPhoneNumber';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import {
  selectCheckout,
  selectCheckoutLegal,
} from '@/redux/checkout/checkoutSelector';
import { addToCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Individual = ({ patterns, isEmptyData, isClientStatus }) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const { phone, email, username, userSurname, userMiddleName } = checkoutData;
  const userLegalData = useSelector(selectCheckoutLegal);
  const {
    emailLegal,
    phoneLegal,
    usernameLegal,
    userSurnameLegal,
    userMiddleNameLegal,
  } = userLegalData;
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const userNameValue = isClientStatus ? username : usernameLegal;
  const userSurNameValue = isClientStatus ? userSurname : userSurnameLegal;
  const userMiddleNameValue = isClientStatus
    ? userMiddleName
    : userMiddleNameLegal;
  const phoneValue = isClientStatus ? phone : phoneLegal;
  const emailValue = isClientStatus ? email : emailLegal;

  const handleInputChangeName = value => {
    const regex = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]*$/u;
    if (!regex.test(value)) {
      value = value.replace(/[^A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]/gu, '');
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'usernameLegal', value }));
    } else {
      dispatch(addToCheckout({ field: 'username', value }));
    }
  };

  const handleInputChangeNameMiddle = value => {
    const regex = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]*$/u;
    if (!regex.test(value)) {
      value = value.replace(/[^A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]/gu, '');
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'userMiddleNameLegal', value }));
    } else {
      dispatch(addToCheckout({ field: 'userMiddleName', value }));
    }
  };

  const handleInputChangeNameSur = value => {
    const regex = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]*$/u;
    if (!regex.test(value)) {
      value = value.replace(/[^A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s'’\-,.]/gu, '');
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'userSurnameLegal', value }));
    } else {
      dispatch(addToCheckout({ field: 'userSurname', value }));
    }
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
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;
    if (!emailPattern.test(inputEmail)) {
      setEmailError('Невірний формат електронної пошти');
    } else {
      setEmailError('');
    }

    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'emailLegal', value: inputEmail }));
    } else {
      dispatch(addToCheckout({ field: 'email', value: inputEmail }));
    }
  };

  return (
    <>
      <div className="checkout-contacts-input search">
        <label className="text-[14px]/[19.6px] text-textSecondary">
          Ім'я <span className="text-textError">*</span>
          <input
            name="username"
            type="text"
            value={userNameValue}
            onChange={e => handleInputChangeName(e.target.value)}
            className={`w-full ${
              isEmptyData && userNameValue === ''
                ? 'border border-borderError'
                : ''
            } border border-borderDefault rounded-minimal p-3`}
          />
          {isEmptyData && userNameValue === '' && (
            <p className="text-textError text-[12px]">Заповніть ім'я</p>
          )}
          {isEmptyData && userNameValue !== '' && userNameValue.length < 3 && (
            <p className="text-textError text-[12px]">
              Має бути більше 3-х літер
            </p>
          )}
        </label>
      </div>
      <div className="checkout-contacts-input search">
        <label className="text-[14px]/[19.6px] text-textSecondary">
          Прізвище <span className="text-textError">*</span>
          <input
            name="userSurname"
            type="text"
            value={userSurNameValue}
            onChange={e => handleInputChangeNameSur(e.target.value)}
            className={`w-full ${
              isEmptyData && userSurNameValue === ''
                ? 'border border-borderError'
                : ''
            } border border-borderDefault rounded-minimal p-3`}
          />
          {isEmptyData && userSurNameValue === '' && (
            <p className="text-textError text-[12px]">Заповніть прізвище</p>
          )}
          {isEmptyData &&
            userSurNameValue !== '' &&
            userSurNameValue.length < 3 && (
              <p className="text-textError text-[12px]">
                Має бути більше 3-х літер
              </p>
            )}
        </label>
      </div>

      <div className="checkout-contacts-input search">
        <label className="text-[14px]/[19.6px] text-textSecondary">
          По батькові <span className="text-textError">*</span>
          <input
            name="userMiddleName"
            type="text"
            value={userMiddleNameValue}
            onChange={e => handleInputChangeNameMiddle(e.target.value)}
            className={`w-full ${
              isEmptyData &&
              userMiddleNameValue !== '' &&
              userMiddleNameValue.length < 3
                ? 'border border-borderError'
                : ''
            } border border-borderDefault rounded-minimal p-3`}
          />
          {isEmptyData &&
            userMiddleNameValue !== '' &&
            userMiddleNameValue.length < 3 && (
              <p className="text-textError text-[12px]">
                Має бути більше 3-х літер
              </p>
            )}
        </label>
      </div>

      <div className="checkout-contacts-input search">
        <label className="text-[14px]/[19.6px] text-textSecondary">
          E-mail <span className="text-textError">*</span>
          <input
            name="mail"
            type="email"
            title="Приклад example@mail.com"
            value={emailValue}
            onChange={handleEmailInputChange}
            className={`w-full ${
              isEmptyData && emailValue === ''
                ? 'border border-borderError'
                : ''
            } border border-borderDefault rounded-minimal p-3`}
          />
          <span className="text-textWarning text-[12px]">{emailError}</span>
          {isEmptyData && emailValue === '' && (
            <p className="text-textError text-[12px]">Заповніть E-mail</p>
          )}
        </label>
      </div>

      <div className="checkout-contacts-input search">
        <label className="text-[14px]/[19.6px] text-textSecondary relative">
          Номер телефону <span className="text-textError">*</span>
          <span className="absolute grid items-center z-10 top-[29px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-base/[24px] text-textTertiary">
            +38
          </span>
          <input
            className={`pl-[53px] ${
              (isEmptyData && phoneValue === '') ||
              (phoneValue !== '' &&
                !/0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}/.test(phoneValue))
                ? 'border border-borderError'
                : ''
            }   text-base/[24px]  w-full h-[48px]  border border-borderDefault rounded-minimal`}
            name="phone"
            type="tel"
            id="phone"
            maxLength="13"
            pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
            title="096 123 45 67"
            autoComplete="off"
            onChange={handlePhoneInputChange}
            value={phoneValue}
          />
          <span className="text-textWarning text-[12px]">{errorMessage}</span>
          {isEmptyData && phoneValue === '' && (
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
