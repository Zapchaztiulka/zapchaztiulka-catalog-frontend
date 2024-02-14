import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { addToCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import {
  selectDepartmentsLoading,
  selectStreets,
} from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const DeliveryCourier = ({
  checkoutData,
  isErrorMessage,
  userLegalData,
  isClientStatus,
  selectedDelivery,
}) => {
  const dispatch = useDispatch();
  const {
    deliveryAddress,
    deliveryAddressNP,
    deliveryStreet,
    deliveryStreetNP,
    deliverHouse,
    deliverHouseNP,
    cityRef,
  } = checkoutData;
  const {
    deliveryAddressLegal,
    deliveryAddressLegalNP,
    deliveryStreetLegal,
    deliveryStreetLegalNP,
    deliverHouseLegal,
    deliverHouseLegalNP,
    cityRefLegal,
  } = userLegalData;
  const [fullAddress, setFullAddress] = useState(
    isClientStatus
      ? selectedDelivery === 'courier'
        ? deliveryAddress || ''
        : deliveryAddressNP || ''
      : selectedDelivery === 'courier'
      ? deliveryAddressLegal || ''
      : deliveryAddressLegalNP || ''
  );
  const [street, setStreet] = useState(
    isClientStatus
      ? selectedDelivery === 'courier'
        ? deliveryStreet || ''
        :deliveryStreetNP || ''
      : selectedDelivery === 'courier'
      ? deliveryStreetLegal || ''
      : deliveryStreetLegalNP || ''
  );

  const [houseNumber, setHouseNumber] = useState(
    isClientStatus
      ? selectedDelivery === 'courier'
        ? deliverHouse || ''
        : deliverHouseNP || ''
      : selectedDelivery === 'courier'
      ? deliverHouseLegal || ''
      : deliverHouseLegalNP || ''
  );


  const [apartment, setApartment] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
      // Встановлюємо нове значення вулиці в залежності від обраного способу доставки
      setStreet(
        isClientStatus
          ? selectedDelivery === 'courier'
            ? deliveryStreet || ''
            : deliveryStreetNP || ''
          : selectedDelivery === 'courier'
          ? deliveryStreetLegal || ''
          : deliveryStreetLegalNP || ''
      );
    }, [selectedDelivery, isClientStatus, checkoutData, userLegalData]);

  const cityRefData = isClientStatus
    ? cityRef || ''
    : cityRefLegal || '';
  const streetsInfo = useSelector(selectStreets);
  const isLoadingStreets = useSelector(selectDepartmentsLoading).streets;

  const streetName =
    streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];

  const refInput = useRef();
  const refList = useRef();

  const removeStreet = () => {
    setStreet('');
    setIsListOpen(false);
    setSelectedItem(null);
  };

  // Get list of streets
  useEffect(() => {
    if (street !== '' && cityRefData !== '') {
      dispatch(
        fetchStreets({ SettlementRef: cityRefData, StreetName: street })
      );
    }
  }, [dispatch, street, cityRefData]);

  // Ефект для оновлення поля deliveryAddress
  useEffect(() => {
    if (street !== '' && houseNumber !== '') {
      const fullAddressData =
        `${street}, ${houseNumber}` + (apartment ? `, ${apartment}` : '');
      setFullAddress(fullAddressData);

      if (isClientStatus) {
        if (selectedDelivery === 'courier') {
          dispatch(
            addToCheckout({ field: 'deliveryAddress', value: fullAddressData })
          );
        } else {
          dispatch(
            addToCheckout({
              field: 'deliveryAddressNP',
              value: fullAddressData,
            })
          );
        }
      } else {
        if (selectedDelivery === 'courier') {
          dispatch(
            addToCheckoutLegal({
              field: 'deliveryAddressLegal',
              value: fullAddressData,
            })
          );
        } else {
          dispatch(
            addToCheckoutLegal({
              field: 'deliveryAddressLegalNP',
              value: fullAddressData,
            })
          );
        }
      }
    }
  }, [
    dispatch,
    isClientStatus,
    selectedDelivery,
    street,
    houseNumber,
    apartment,
  ]);


  


  useEffect(() => {
    if (!selectedItem && !isInputFocused && street !== '') removeStreet();
  }, [selectedItem, isInputFocused, street]);

  const handleInputChangeStreet = event => {
    const searchStreet = event.target.value;
    setStreet(searchStreet);
    if (isClientStatus) {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckout({
            field: 'deliveryStreet',
            value: searchStreet,
          })
        );
      } else {
        dispatch(
          addToCheckout({
            field: 'deliveryStreetNP',
            value: searchStreet,
          })
        );
      }
    } else {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryStreetLegal',
            value: searchStreet,
          })
        );
      } else {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryStreetLegalNP',
            value: searchStreet,
          })
        );
      }
    }
    setIsListOpen(true);
    if (!searchStreet) {
      removeStreet();
    }
  };

  const handleInputChangeHouse = event => {
    const house = event.target.value;
    setHouseNumber(house);

    if (isClientStatus) {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckout({
            field: 'deliverHouse',
            value: house,
          })
        );
      } else {
        dispatch(
          addToCheckout({
            field: 'deliverHouseNP',
            value: house,
          })
        );
      }
    } else {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckoutLegal({
            field: 'deliverHouseLegal',
            value: house,
          })
        );
      } else {
        dispatch(
          addToCheckoutLegal({
            field: 'deliverHouseLegalNP',
            value: house,
          })
        );
      }
    }
  };



  const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    setApartment(apartment);
  };

  const handleSelection = selectedItem => {
    setStreet(selectedItem);
    setSelectedItem(selectedItem);
    setIsListOpen(false);
    if (isClientStatus) {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckout({ field: 'deliveryStreet', value: selectedItem })
        );
      } else {
        dispatch(
          addToCheckout({ field: 'deliveryStreetNP', value: selectedItem })
        );
      }
    } else {
      if (selectedDelivery === 'courier') {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryStreetLegal',
            value: selectedItem,
          })
        );
      } else {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryStreetLegalNP',
            value: selectedItem,
          })
        );
      }
    }
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      removeStreet();
       setSelectedItem(null);
    }
  };

  useOutsideClick(refList, refInput, closeByClickOutside);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  

  return (
    <div className="pl-[32px] pr-[12px]">
      <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
        Введіть назву вулиці
        <span className="text-textError">*</span>
      </p>

      <div className="search w-full relative">
        <div className="flex items-center gap-3">
          <input
            ref={refInput}
            type="text"
            value={street}
            onChange={handleInputChangeStreet}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              isInputFocused ? '' : 'Оберіть значення або введіть назву..'
            }
            className={`p-3 w-full ${
              isErrorMessage && street === '' ? 'border border-borderError' : ''
            } rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault `}
          />
          {street !== '' && (
            <button
              className=" absolute right-[12px] top-0 bottom-0"
              type="button"
              onClick={removeStreet}
            >
              <CloseIcon size="20" />
            </button>
          )}
        </div>
        {cityRefData === '' && street === '' && isInputFocused && (
          <span className="text-textError text-[12px]">
            Ви не обрали місто доставки
          </span>
        )}
        {isErrorMessage && street === '' && (
          <p className="text-textError text-[12px]">Заповніть назву вулиці</p>
        )}

        {streetName &&
          streetName.length !== 0 &&
          isListOpen &&
          !isLoadingStreets && (
            <ul
              ref={refList}
              className="absolute tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
            >
              {streetName?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelection(item)}
                  className="relative cursor-pointer select-none p-2 hover:text-textBrand"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
      </div>

      <div className="flex gap-3 mt-2">
        <div className=" search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер будинку
            <span className="text-textError">*</span>
          </p>
          <input
            className={`p-3 w-[172px] ${
              isErrorMessage && houseNumber === ''
                ? 'border border-borderError'
                : ''
            } rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault `}
            value={houseNumber}
            type="text"
            onChange={handleInputChangeHouse}
          />
          {isErrorMessage && houseNumber === '' && (
            <div className="text-textError text-[12px]">
              Заповніть номер будинку
            </div>
          )}
        </div>

        <div className=" search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер квартири
            <span className="text-textError">*</span>
          </p>
          <input
            className="p-3 w-[172px] rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault "
            type="text"
            value={apartment}
            onChange={handleInputChangeApartment}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryCourier;
