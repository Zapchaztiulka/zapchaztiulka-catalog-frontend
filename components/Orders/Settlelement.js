import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import { fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const Settlelement = ({ onSelectCity, onCityChange, onSelectCityRef }) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const [locality, setLocality] = useState(checkoutData?.deliveryCity || '');
  const [isLocalityInputFocused, setIsLocalityInputFocused] = useState(false);
  const settlements = useSelector(selectSettlements);

  const localityPlaceInfo = settlements?.data?.flatMap(
    entry => entry.Addresses
  );

  const refInput = useRef();
  const refList = useRef();

  useEffect(() => {
    dispatch(fetchSettlements(locality));
  }, [dispatch, locality]);

  const handleInputChangeLocality = event => {
    const searchLocality = event.target.value;
    setLocality(searchLocality);
    refList.current && (refList.current.style.display = 'block');
  };

  const handleSelection = selectedItem => {
    setLocality(selectedItem.Present);
    onCityChange(selectedItem.Present);
    onSelectCity(selectedItem.DeliveryCity);
    onSelectCityRef(selectedItem.Ref);
    refList.current.style.display = 'none';
  };

  const removeSearchLocality = () => {
    setLocality('');
    onSelectCity('');
  };

  const closeByClickOutside = () => {
    refList.current && (refList.current.style.display = 'none');
  };

  useOutsideClick(refList, refInput, closeByClickOutside);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Заборонити дію клавіші Enter
      // Додатковий код, який ви хочете виконати при натисканні Enter    в інпут додати     onKeyPress={handleKeyPress}
    }
  };

  return (
    <div className="search tablet600:w-[400px] tablet768:w-[600px] relative">
      <div className="flex items-center gap-3">
        <input
          ref={refInput}
          type="text"
          value={locality}
          required
          onChange={handleInputChangeLocality}
          onFocus={() => setIsLocalityInputFocused(true)}
          onBlur={() => setIsLocalityInputFocused(false)}
          placeholder={isLocalityInputFocused ? '' : 'Введіть місто..'}
          className="flex-grow search-input w-full placeholder:text-textInputDefault text-textPrimary"
        />
        {locality !== '' && (
          <button
            className=" absolute right-[12px] top-0 bottom-0"
            type="button"
            onClick={removeSearchLocality}
          >
            <CloseIcon size="20" />
          </button>
        )}
      </div>

      {localityPlaceInfo && locality && localityPlaceInfo.length !== 0 && (
        <ul
          ref={refList}
          style={{ display: 'none' }}
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
