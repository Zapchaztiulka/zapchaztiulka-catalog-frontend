import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowUpIcon,
  CloseIcon,
  ArrowDownIcon,
} from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';

const Settlelement = ({
  onSelectCity,
  onCityChange,
  onSelectCityRef,
  checkoutData,
  isEmptyDataIndividual,
  isEmptyDataLegal,
  selectedDelivery,
  userLegalData,
  isClientStatus,
  cityDelivery,
  setCityDelivery,
}) => {
  const dispatch = useDispatch();
  // const [locality, setLocality] = useState(
  //   isClientStatus ? checkoutData.deliveryCity : userLegalData.deliveryCityLegal
  // );
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const settlements = useSelector(selectSettlements);

  const localityPlaceInfo = settlements?.data?.flatMap(
    entry => entry.Addresses
  );

  const refInput = useRef(null);
  const refList = useRef(null);

  // Get list of cities
  useEffect(() => {
    dispatch(fetchSettlements(cityDelivery));
  }, [dispatch, cityDelivery]);

  // useEffect(() => {
  //   if (isClientStatus) {
  //     setLocality(checkoutData.deliveryCity);
  //   }
  //   if (!isClientStatus) {
  //     setLocality(userLegalData.deliveryCityLegal);
  //   }
  // }, [
  //   checkoutData.deliveryCity,
  //   userLegalData.deliveryCityLegal,
  //   isClientStatus,
  // ]);

  const removeCity = () => {
    setCityDelivery('');
    setIsListOpen(false);
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryCity', value: '' }));
      dispatch(addToCheckout({ field: 'cityRef', value: '' }));
      dispatch(addToCheckout({ field: 'selectedCity', value: '' }));
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'deliveryCityLegal', value: '' }));
      dispatch(addToCheckoutLegal({ field: 'cityRcityRefLegalef', value: '' }));
      dispatch(addToCheckoutLegal({ field: 'selectedCityLegal', value: '' }));
    }
  };

  const handleInputChangeLocality = event => {
    const searchLocality = event.target.value;
    setCityDelivery(searchLocality);
    setIsListOpen(true);
    if (!searchLocality) {
      removeCity();
    }
  };

  const handleSelection = selectedItem => {
    setCityDelivery(selectedItem.Present);

    onCityChange(selectedItem.Present);
    onSelectCity(selectedItem.DeliveryCity);
    onSelectCityRef(selectedItem.Ref);

    setSelectedItem(selectedItem.Present);
    setIsListOpen(false);
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      setCityDelivery('');
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
    <div className="search tablet600:w-[400px] tablet768:w-[600px] relative">
      <div className="flex items-center gap-3 relative">
        <input
          ref={refInput}
          type="text"
          value={cityDelivery}
          onChange={handleInputChangeLocality}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={isInputFocused ? null : 'Введіть назву міста..'}
          className=" flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary"
        />
        {cityDelivery !== '' && (
          <button
            type="button"
            onClick={removeCity}
            className="absolute right-3 top-3"
          >
            <CloseIcon
              color={theme.extend.colors.iconSecondary}
              width="20"
              height="20"
            />
          </button>
        )}
        {/* {isListOpen ? (
          <ArrowUpIcon color={theme.extend.colors.iconSecondary} />
        ) : (
          <ArrowDownIcon color={theme.extend.colors.iconSecondary} />
        )} */}
        {isEmptyDataIndividual && cityDelivery === '' && (
          <p className="text-textError text-[12px]">
            Заповніть місто доставки
            <span className="text-textError">*</span>
          </p>
        )}
        {isEmptyDataLegal && cityDelivery === '' && (
          <p className="text-textError text-[12px]">
            Заповніть місто доставки
            <span className="text-textError">*</span>
          </p>
        )}
      </div>

      {localityPlaceInfo &&
        cityDelivery &&
        localityPlaceInfo.length !== 0 &&
        isListOpen && (
          <ul
            ref={refList}
            className="absolute tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
          >
            {localityPlaceInfo?.map(item => (
              <li
                key={item.Ref}
                onClick={() => handleSelection(item)}
                className="relative cursor-pointer select-none p-2 hover:text-textBrand"
              >
                {item.Present}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default Settlelement;
