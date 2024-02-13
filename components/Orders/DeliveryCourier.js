import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import {
  selectDepartmentsLoading,
  selectStreets,
} from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const DeliveryCourier = ({
  addressDelivery,
  checkoutData,
  isErrorMessage,
  userLegalData,
  isClientStatus,
}) => {
  const dispatch = useDispatch();
  const [street, setStreet] = useState(
    isClientStatus
      ? checkoutData?.deliveryStreet || ''
      : userLegalData?.deliveryStreetLegal || ''
  );
  const [houseNumber, setHouseNumber] = useState(
    isClientStatus
      ? checkoutData?.deliverHouse || ''
      : userLegalData?.deliverHouseLegal || ''
  );
  const [apartment, setApartment] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const cityRef = isClientStatus
    ? checkoutData?.cityRef || ''
    : userLegalData?.cityRefLegal || '';
  const streetsInfo = useSelector(selectStreets);
  const isLoadingStreets = useSelector(selectDepartmentsLoading).streets;

  const streetName =
    streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];

  const refInput = useRef();
  const refList = useRef();

  const removeStreet = () => {
    setStreet('');
    // setApartment('');
    // setHouseNumber('');
    setIsListOpen(false);
  };

  // Get list of streets
  useEffect(() => {
    if (street !== '' && cityRef !== '') {
      dispatch(fetchStreets({ SettlementRef: cityRef, StreetName: street }));
    }
  }, [dispatch, street, cityRef]);

  useEffect(() => {
    if (street !== '' && houseNumber !== '') {
      const fullAddress =
        `${street}, ${houseNumber}` + (apartment ? `, ${apartment}` : '');
      if (isClientStatus) {
        dispatch(
          addToCheckout({ field: 'deliveryAddress', value: fullAddress })
        );
      } else {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryAddressLegal',
            value: fullAddress,
          })
        );
      }
    } else {
      if (isClientStatus) {
        dispatch(addToCheckout({ field: 'deliveryAddress', value: '' }));
      } else {
        dispatch(
          addToCheckoutLegal({ field: 'deliveryAddressLegal', value: '' })
        );
      }
    }
  }, [dispatch, isClientStatus, street, houseNumber, apartment]);

  const handleInputChangeStreet = event => {
    const searchStreet = event.target.value;
    setStreet(searchStreet);
    setIsListOpen(true);
    if (!searchStreet) {
      removeStreet();
    }
  };

  const handleInputChangeHouse = event => {
    const house = event.target.value;
    setHouseNumber(house);

    if (isClientStatus) {
      dispatch(
        addToCheckout({
          field: 'deliverHouse',
          value: house,
        })
      );
    } else {
      dispatch(
        addToCheckoutLegal({
          field: 'deliverHouseLegal',
          value: house,
        })
      );
    }
  };

  console.log('TCL: addressDelivery', addressDelivery);

  const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    setApartment(apartment);
  };

  const handleSelection = selectedItem => {
    setStreet(selectedItem);
    setSelectedItem(selectedItem);
    setIsListOpen(false);
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryStreet', value: selectedItem }));
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryStreetLegal',
          value: selectedItem,
        })
      );
    }
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      removeStreet();
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
            className="flex-grow search-input w-full placeholder:text-textInputDefault text-textPrimary"
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
        {cityRef === '' && street === '' && isInputFocused && (
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
            className="h-[48px] w-[172px] rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault "
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
            className="h-[48px] w-[172px] rounded border border-borderDefault text-base leading-6 placeholder:text-textInputDefault "
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
