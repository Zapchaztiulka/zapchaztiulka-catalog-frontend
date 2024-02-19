import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckout } from '@/redux/checkout/IndividualPerson/checkoutSlice';
import { fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import {
  selectDepartmentsLoading,
  selectSettlements,
} from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
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
      dispatch(addToCheckout({ field: 'deliveryRegion', value: '' }));
      dispatch(addToCheckout({ field: 'deliveryDistrict', value: '' }));
    }
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'deliveryCityLegal', value: '' }));
      dispatch(addToCheckoutLegal({ field: 'cityRefLegal', value: '' }));
      dispatch(addToCheckoutLegal({ field: 'selectedCityLegal', value: '' }));
      dispatch(addToCheckout({ field: 'deliveryRegionLegal', value: '' }));
      dispatch(addToCheckout({ field: 'deliveryDistrictLegal', value: '' }));
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
    const deliveryRegionValue =
      selectedItem.Area !== '' ? `${selectedItem.Area} обл.` : '';
    const deliveryDistrictValue =
      selectedItem.Region !== '' ? `${selectedItem.Region} р-н` : '';

    setSelectedItem(selectedItem.MainDescription);
     if (isClientStatus) {
       dispatch(
         addToCheckout({ field: 'deliveryRegion', value: deliveryRegionValue })
       );
       dispatch(
         addToCheckout({
           field: 'deliveryDistrict',
           value: deliveryDistrictValue,
         })
       );
     } else {
       dispatch(
         addToCheckout({
           field: 'deliveryRegionLegal',
           value: deliveryRegionValue,
         })
       );
       dispatch(
         addToCheckout({
           field: 'deliveryDistrictLegal',
           value: deliveryDistrictValue,
         })
       );
     }
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
    <div className="search checkout-contacts-input relative">
      <div className="relative">
        <input
          ref={refInput}
          type="text"
          value={cityDelivery}
          onChange={handleInputChangeLocality}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={isInputFocused ? null : 'Введіть назву міста..'}
          className={`${
            (isEmptyDataLegal || isEmptyDataIndividual) && cityDelivery === ''
              ? 'border border-borderError'
              : ''
          }  flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary`}
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
        {isEmptyDataIndividual && cityDelivery === '' && isClientStatus && (
          <span className="text-textError text-[12px]">
            Оберіть місто доставки
          </span>
        )}
        {isEmptyDataLegal && cityDelivery === '' && !isClientStatus && (
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
