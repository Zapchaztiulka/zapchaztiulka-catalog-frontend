import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const DeliveryCourier = ({
  addressDelivery,
  setAddressDelivery,
  checkoutData,
  isErrorMessage,
  userLegalData,
  isClientStatus,
}) => {
  const dispatch = useDispatch();
  const [street, setStreet] = useState( isClientStatus
    ? checkoutData?.deliveryStreet || ''
    : userLegalData?.deliveryStreetLegal || '');
  const [houseNumber, setHouseNumber] = useState('');
  const [apartment, setApartment] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const cityRef = isClientStatus
    ? checkoutData?.cityRef || ''
    : userLegalData?.cityRefLegal || '';
  const streetsInfo = useSelector(selectStreets);

  const streetName =
    streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];

  const refInput = useRef();
  const refList = useRef();

  const removeStreet = () => {
    setStreet('');
    setApartment('');
    setHouseNumber('');
    setIsListOpen(false);
  };

  useEffect(() => {
    if (street !== '' && houseNumber !== '') {
      const fullAddress = `${street}, ${houseNumber}, ${apartment}`;
      setAddressDelivery(fullAddress);
    }
  }, [street, houseNumber, apartment, setAddressDelivery]);

  // Get list of streets
  useEffect(() => {
    if (street !== '' && cityRef !== '') {
      dispatch(fetchStreets({ SettlementRef: cityRef, StreetName: street }));
    }
  }, [dispatch, street, cityRef]);

  const handleInputChangeStreet = event => {
    const searchStreet = event.target.value;
    setStreet(searchStreet);
      if (isClientStatus) {
         dispatch(
           addToCheckout({ field: 'deliveryAddress', value: addressDelivery })
         );
      }
      if (!isClientStatus) {
         dispatch(
           addToCheckoutLegal({
             field: 'deliveryAddressLegal',
             value: addressDelivery,
           })
         );
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
      dispatch(
        addToCheckout({ field: 'deliveryAddress', value: addressDelivery })
      );
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryAddressLegal',
          value: addressDelivery,
        })
      );
    }   
  };

  const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    setApartment(apartment);
    if (isClientStatus) {
      dispatch(
        addToCheckout({ field: 'deliveryAddress', value: addressDelivery })
      );
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryAddressLegal',
          value: addressDelivery,
        })
      );
    }   
  };

  const handleSelection = selectedItem => {
    setStreet(selectedItem);
    setSelectedItem(selectedItem);
    setIsListOpen(false);
            dispatch(
              addToCheckout({ field: 'deliveryStreet', value: selectedItem })
            );
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

      <div className="search tablet600:w-[400px] tablet768:w-[600px] relative">
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
        {cityRef === '' && street === '' && (
          <span className="text-textError text-[12px]">
            Ви не обрали місто доставки
          </span>
        )}
        {isErrorMessage && street === '' && (
          <p className="text-textError text-[12px]">Заповніть назву вулиці</p>
        )}

        {streetName && streetName.length !== 0 && isListOpen && (
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

      <div className="flex gap-2 mt-2">
        <div className="checkout-contacts-input search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер будинку
            <span className="text-textError">*</span>
          </p>
          <input
            className="search-input w-full "
            value={houseNumber}
            type="text"
            onChange={handleInputChangeHouse}
          />
          {isErrorMessage && street === '' && (
            <div className="text-textError text-[12px]">
              Заповніть номер будинку
            </div>
          )}
        </div>

        <div className="checkout-contacts-input search">
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер квартири
            <span className="text-textError">*</span>
          </p>
          <input
            className="search-input w-full "
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
