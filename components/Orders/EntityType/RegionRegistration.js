import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { selectDepartmentsLoading } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const RegionRegistration = ({
  checkoutData,
  regionRegistration,
  setRegionRegistration,
  cityRegistration,
  regionsData,
  isEmptyData,
}) => {
  const dispatch = useDispatch();
  const { companyRegion } = checkoutData.legalEntityData;
  const dataListRegion = regionsData?.data;
    const isLoadingRegions = useSelector(
      selectDepartmentsLoading
    ).regions;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const regionRegistrationValue = regionRegistration || '';


  const refInput = useRef(null);
  const refList = useRef(null);

const filteredRegions = dataListRegion?.filter(
  item =>
    item &&
    item.Description &&
    item.Description.toLowerCase().includes(regionRegistration?.toLowerCase())
);


  useEffect(() => {
    setRegionRegistration(companyRegion);
  }, [companyRegion]);

  const removeRegion = () => {
    setRegionRegistration('');
    setIsListOpen(false);
    dispatch(
      addToCheckoutLegal({ field: 'legalEntityData.companyRegion', value: '' })
    );
  };

  const handleInputChangeRegion = event => {
    const searchLocality = event.target.value;
    setRegionRegistration(searchLocality);
    setIsListOpen(true);
    if (!searchLocality) {
      removeRegion();
    }
  };

  const handleSelection = selectedItem => {
    setRegionRegistration(selectedItem.Description);
    dispatch(
      addToCheckoutLegal({
        field: 'legalEntityData.companyRegion',
        value: selectedItem.Description,
      })
    );
    setSelectedItem(selectedItem.Description);
    setIsListOpen(false);
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isListOpen) {
      setRegionRegistration('');
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
          value={regionRegistrationValue}
          disabled={cityRegistration !== '' && regionRegistrationValue !== ''}
          onChange={handleInputChangeRegion}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={isInputFocused ? null : 'Введіть назву області..'}
          className=" flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary"
        />
        {regionRegistrationValue !== '' && cityRegistration === '' && (
          <button
            type="button"
            onClick={removeRegion}
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
      {isEmptyData && regionRegistrationValue === '' && (
        <p className="text-textError text-[12px]">Оберіть область</p>
      )}

      {filteredRegions &&
        regionRegistrationValue &&
        filteredRegions.length !== 0 &&
        isListOpen &&
        !isLoadingRegions && (
          <ul
            ref={refList}
            className="absolute w-auto z-20 tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs"
          >
            {filteredRegions?.map(item => (
              <li
                key={item.Ref}
                onClick={() => handleSelection(item)}
                className="relative cursor-pointer select-none p-2 hover:text-textBrand"
              >
                {item.Description}
              </li>
            ))}
          </ul>
        )}
    </>
  );
};

export default RegionRegistration;
