import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectDepartmentsLoading, selectSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
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
  isEmptyDataIndividual,
  isEmptyDataLegal,
  isClientStatus,
  cityDelivery,
  setCityDelivery,
}) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const settlements = useSelector(selectSettlements);
  const isLoadingSettlements = useSelector(
    selectDepartmentsLoading
  ).settlements;

  const localityPlaceInfo = settlements?.data?.flatMap(
    entry => entry.Addresses
  );

  const refInput = useRef(null);
  const refList = useRef(null);

  // Get list of cities
  useEffect(() => {
    dispatch(fetchSettlements(cityDelivery));
  }, [dispatch, cityDelivery]);

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
    setCityDelivery(selectedItem.MainDescription);

    onCityChange(selectedItem.MainDescription);
    onSelectCity(selectedItem.DeliveryCity);
    onSelectCityRef(selectedItem.Ref);

    setSelectedItem(selectedItem.MainDescription);
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
      <div className="relative">
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
          <span className="text-textError text-[12px]">
            Оберіть місто доставки
          </span>
        )}
        {isEmptyDataLegal && cityDelivery === '' && (
          <span className="text-textError text-[12px]">
            Оберіть місто доставки
          </span>
        )}
      </div>

      {localityPlaceInfo &&
        cityDelivery &&
        localityPlaceInfo.length !== 0 &&
        isListOpen &&
        !isLoadingSettlements && (
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
