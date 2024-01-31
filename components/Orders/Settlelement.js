import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { fetchSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectSettlements } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const Settlelement = ({ onSelectCity }) => {
  const dispatch = useDispatch();
  const [locality, setLocality] = useState('');
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
    onSelectCity(selectedItem.DeliveryCity);
   refList.current.style.display = 'none';
  };

   const removeSearchLocality = () => {
      setLocality('');
      onSelectCity('')
  };

    const closeByClickOutside = () => {
    refList.current && (refList.current.style.display = 'none');
    }
   
    useOutsideClick(refList, refInput, closeByClickOutside);


  return (
    <div className="search w-full relative">
      <input
        ref={refInput}
        type="text"
        value={locality}
        onChange={handleInputChangeLocality}
        className="search-input w-full"
      />
      {locality !== '' && (
        <button
          className="close-btn"
          type="button"
          onClick={removeSearchLocality}
        >
          <CloseIcon
            className="close-icon stroke-iconPrimary"
            width="34"
            height="34"
          />
        </button>
      )}
      {localityPlaceInfo && locality && localityPlaceInfo.length!==0 && (
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
