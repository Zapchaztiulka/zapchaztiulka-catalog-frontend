import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const CityRegistration = ({
  checkoutData,
  cityRegistration,
  setCityRegistration,
  localityPlaceInfo,
  isEmptyData,
}) => {
  const dispatch = useDispatch();
  const { companyCity } = checkoutData.legalEntityData;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const refInput = useRef(null);
  const refList = useRef(null);

  useEffect(() => {
    setCityRegistration(companyCity);
  }, [companyCity]);

  const removeCity = () => {
    setCityRegistration('');
    setIsListOpen(false);
    dispatch(
      addToCheckoutLegal({ field: 'legalEntityData.companyCity', value: '' })
    );
  };

  const handleInputChangeLocality = event => {
    const searchLocality = event.target.value;
    setCityRegistration(searchLocality);
    setIsListOpen(true);
    if (!searchLocality) {
      removeCity();
    }
  };

  const handleSelection = selectedItem => {
    setCityRegistration(selectedItem.MainDescription);
    dispatch(
      addToCheckoutLegal({
        field: 'legalEntityData.companyCity',
        value: selectedItem.MainDescription,
      })
    );
    dispatch(
      addToCheckoutLegal({
        field: 'legalEntityData.companyRegion',
        value: selectedItem.Area,
      })
    );
    setSelectedItem(selectedItem);
    setIsListOpen(false);
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      setCityRegistration('');
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
      <div className="flex items-center gap-3 relative ">
        <input
          ref={refInput}
          type="text"
          value={cityRegistration}
          onChange={handleInputChangeLocality}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={isInputFocused ? null : 'Введіть назву міста..'}
          className=" flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary"
        />
        {cityRegistration !== '' && (
          <button
            type="button"
            onClick={removeCity}
            className="absolute right-3 top-3"
          >
            <CloseIcon
              className="close-icon stroke-iconPrimary"
              width="24"
              height="24"
            />
          </button>
        )}
      </div>
      {isEmptyData && cityRegistration === '' && (
        <p className="text-textError text-[12px]">Оберіть місто</p>
      )}

      {localityPlaceInfo &&
        cityRegistration &&
        localityPlaceInfo.length !== 0 &&
        isListOpen && (
          <ul
            ref={refList}
            className="absolute w-auto z-20 tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs"
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
    </>
  );
};

export default CityRegistration
