import React, { useEffect, useRef, useState } from 'react';
import CouriersDelivery from './CouriersDelivery';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDepartmentsLoading,
  selectStreets,
} from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import { addToCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { useOutsideClick } from '@/hooks/useOnClickOutside';

const Courier = ({
  checkoutData,
  isErrorMessage,
  userLegalData,
  isClientStatus,
}) => {
  const dispatch = useDispatch();
  const {
    deliveryAddress,
    deliveryStreet,
    cityRef,
    deliveryApartment,
    deliverHouse,
  } = checkoutData;
  const {
    deliveryAddressLegal,
    deliveryStreetLegal,
    cityRefLegal,
    deliverHouseLegal,
    deliveryApartmentLegal,
  } = userLegalData;

  const [fullAddress, setFullAddress] = useState(
    isClientStatus ? deliveryAddress || '' : deliveryAddressLegal || ''
  );
  const [street, setStreet] = useState(
    isClientStatus ? deliveryStreet || '' : deliveryStreetLegal || ''
  );
  const [apartment, setApartment] = useState(
    isClientStatus ? deliveryApartment || '' : deliveryApartmentLegal || ''
  );
  const [houseNumber, setHouseNumber] = useState(
    isClientStatus ? deliverHouse || '' : deliverHouseLegal || ''
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
      setStreet(deliveryStreet);
      setHouseNumber(deliverHouse);
      setApartment(deliveryApartment);
    }
    if (!isClientStatus) {
      setStreet(deliveryStreetLegal);
      setHouseNumber(deliverHouseLegal);
      setApartment(deliveryApartmentLegal);
    }
  }, [deliveryStreet, deliveryStreetLegal, isClientStatus]);

  const streetName =
    streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];
  
    const removeStreet = () => {
      setStreet('');
      setFullAddress('');
      setIsListOpen(false);
      if (isClientStatus) {
        dispatch(addToCheckout({ field: 'deliveryAddress', value: '' }));
        dispatch(addToCheckout({ field: 'deliveryStreet', value: '' }));
        dispatch(addToCheckout({ field: 'deliverHouse', value: '' }));
        dispatch(addToCheckout({ field: 'deliveryApartment', value: '' }));
      }
      if (!isClientStatus) {
        dispatch(
          addToCheckoutLegal({ field: 'deliveryAddressLegal', value: '' })
        );
        dispatch(
          addToCheckoutLegal({ field: 'deliveryStreetLegal', value: '' })
        );
        dispatch(addToCheckoutLegal({ field: 'deliverHouseLegal', value: '' }));
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryApartmentLegal',
            value: '',
          })
        );
      }
    };

  // Get list of streets
  useEffect(() => {
     if (cityRefData === '') {
       setStreet('');
       setHouseNumber('');
       setApartment('');
       removeStreet();
       return;
     }
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
        `${street}, ${houseNumber}` + (apartment ? `, кв. ${apartment}` : '');
      setFullAddress(fullAddressData);
      if (isClientStatus) {
        dispatch(
          addToCheckout({
            field: 'deliveryAddress',
            value: fullAddressData,
          })
        );
      }
      if (!isClientStatus) {
        dispatch(
          addToCheckoutLegal({
            field: 'deliveryAddressLegal',
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
        dispatch(addToCheckout({ field: 'deliveryAddress', value: '' }));
      } else {
        dispatch(
          addToCheckoutLegal({ field: 'deliveryAddressLegal', value: '' })
        );
      }
    }
  }, [houseNumber, street, isClientStatus, dispatch]);

  const handleInputChangeStreet = event => {
    if (cityRefData === '') {
      setStreet('');
      return;
    }
    const searchStreet = event.target.value;
    setStreet(searchStreet);
    setIsListOpen(true);
    if (!searchStreet) {
      removeStreet();
    }
  };

  const handleInputChangeHouse = event => {
    const house = event.target.value;
    if (cityRefData === '') {
      setHouseNumber('');
      return;
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'deliverHouseLegal', value: house })
      );
    } else {
      dispatch(addToCheckout({ field: 'deliverHouse', value: house }));
    }
    setHouseNumber(house);
  };

  const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    if (cityRefData === '') {
      setApartment('');
      return;
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryApartmentLegal',
          value: apartment,
        })
      );
    } else {
      dispatch(addToCheckout({ field: 'deliveryApartment', value: apartment }));
    }
    setApartment(apartment);
  };

  const handleAddressDispatch = selectStreet => {
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryStreet', value: selectStreet }));
    }
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryStreetLegal',
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

export default Courier;
