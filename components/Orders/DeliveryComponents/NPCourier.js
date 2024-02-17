import React, { useEffect, useRef, useState } from 'react';
import CouriersDelivery from './CouriersDelivery';
import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { addToCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDepartmentsLoading,
  selectStreets,
} from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';

const NPCourier = ({
  checkoutData,
  isErrorMessage,
  userLegalData,
  isClientStatus,
}) => {
  const dispatch = useDispatch();
  const {
    deliveryAddressNP,
    deliveryStreetNP,
    cityRef,
    deliveryApartmentNP,
    deliverHouseNP,
  } = checkoutData;
  const {
    deliveryAddressLegalNP,
    deliveryStreetLegalNP,
    cityRefLegal,
    deliverHouseLegalNP,
    deliveryApartmentLegalNP,
  } = userLegalData;

  const [fullAddress, setFullAddress] = useState(
    isClientStatus ? deliveryAddressNP || '' : deliveryAddressLegalNP || ''
  );
  const [street, setStreet] = useState(
    isClientStatus ? deliveryStreetNP || '' : deliveryStreetLegalNP || ''
  );
  const [apartment, setApartment] = useState(
    isClientStatus ? deliveryApartmentNP || '' : deliveryApartmentLegalNP || ''
  );
  const [houseNumber, setHouseNumber] = useState(
    isClientStatus ? deliverHouseNP || '' : deliverHouseLegalNP || ''
  );
  const [selectedItem, setSelectedItem] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const refInput = useRef();
  const refList = useRef();

  const cityRefData = isClientStatus ? cityRef || '' : cityRefLegal || '';
  const streetsInfo = useSelector(selectStreets);
  const isLoadingStreets = useSelector(selectDepartmentsLoading).streets;

  useEffect(() => {
    if (isClientStatus) {
      // setFullAddress(deliveryAddress);
      setStreet(deliveryStreetNP);
      setHouseNumber(deliverHouseNP);
      setApartment(deliveryApartmentNP);
    }
    if (!isClientStatus) {
      // setFullAddress(deliveryAddressLegal);
      setStreet(deliveryStreetLegalNP);
      setHouseNumber(deliverHouseLegalNP);
      setApartment(deliveryApartmentLegalNP);
    }
  }, [deliveryStreetNP, deliveryStreetLegalNP, isClientStatus]);

  const streetName =
    streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];

  // Get list of streets
  useEffect(() => {
    if (street !== '' && cityRefData !== '') {
      dispatch(
        fetchStreets({ SettlementRef: cityRefData, StreetName: street })
      );
    }
  }, [dispatch, street, cityRefData]);

  // Ефект для оновлення поля deliveryAddress та deliveryStreet
  useEffect(() => {
    if (street !== '' && houseNumber !== '' && selectedItem !== '') {
      const fullAddressData =
        `${street}, ${houseNumber}` + (apartment ? `, ${apartment}` : '');
      setFullAddress(fullAddressData);
      if (isClientStatus) {
        dispatch(
          addToCheckout({
            field: 'deliveryAddressNP',
            value: fullAddressData,
          })
        );
      }
      if (!isClientStatus) {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryAddressLegalNP',
            value: fullAddressData,
          })
        );
      }
    }
  }, [dispatch, street, houseNumber, apartment]);

  useEffect(() => {
    if (houseNumber === '' || street === '') {
      setFullAddress('');
      if (isClientStatus) {
        dispatch(addToCheckout({ field: 'deliveryAddressNP', value: '' }));
      } else {
        dispatch(
          addToCheckoutLegal({ field: 'deliveryAddressLegalNP', value: '' })
        );
      }
    }
  }, [houseNumber, street, isClientStatus, dispatch]);

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
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'deliverHouseLegalNP', value: house })
      );
    } else {
      dispatch(addToCheckout({ field: 'deliverHouseNP', value: house }));
    }
    setHouseNumber(house);
  };

  const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryApartmentLegalNP',
          value: apartment,
        })
      );
    } else {
      dispatch(
        addToCheckout({ field: 'deliveryApartmentNP', value: apartment })
      );
    }
    setApartment(apartment);
  };

  const handleAddressDispatch = selectStreet => {
    if (isClientStatus) {
      dispatch(
        addToCheckout({ field: 'deliveryStreetNP', value: selectStreet })
      );
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryStreetLegalNP',
          value: selectStreet,
        })
      );
    }
  };

  const handleSelectionStreet = selectedItem => {
    setStreet(selectedItem);
    setSelectedItem(selectedItem);
    handleAddressDispatch(selectedItem);
    setIsListOpen(false);
  };

  const removeStreet = () => {
    setStreet('');
    setFullAddress('');
    setIsListOpen(false);
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryAddressNP', value: '' }));
      dispatch(addToCheckout({ field: 'deliveryStreetNP', value: '' }));
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'deliveryAddressLegalNP', value: '' })
      );
      dispatch(
        addToCheckoutLegal({ field: 'deliveryStreetLegalNP', value: '' })
      );
    }
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      setStreet('');
      setIsListOpen(false);
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
    <>
      <CouriersDelivery
        valueStreet={street}
        valueHouse={houseNumber}
        valueApartment={apartment}
        refInput={refInput}
        refList={refList}
        streetList={streetName}
        isLoadingStreets={isLoadingStreets}
        handleInputChangeStreet={handleInputChangeStreet}
        handleInputChangeHouse={handleInputChangeHouse}
        handleInputChangeApartment={handleInputChangeApartment}
        handleSelectionStreet={handleSelectionStreet}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        isErrorMessage={isErrorMessage}
        cityRefData={cityRefData}
        isListOpen={isListOpen}
        removeStreet={removeStreet}
        isInputFocused={isInputFocused}
      />
    </>
  );
};

export default NPCourier;
