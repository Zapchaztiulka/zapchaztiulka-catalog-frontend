import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import { fetchStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectStreets } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';

const DeliveryCourier = () => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const [street, setStreet] = useState(checkoutData?.deliveryAddress || '');
   const [houseNumber, setHouseNumber] = useState('');
  const [apartment, setApartment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLocalityInputFocused, setIsLocalityInputFocused] = useState(false);
  const cityRef = checkoutData?.cityRef;
  const streetsInfo = useSelector(selectStreets)
  console.log(streetsInfo)

    const streetName = streetsInfo?.data?.[0]?.Addresses?.map(address => address.Present) || [];
    console.log(street);
    console.log(houseNumber)
    console.log(apartment)

  const refInput = useRef();
  const refList = useRef();

   useEffect(() => {
     if (street !== '' && cityRef !== '') { dispatch(fetchStreets({ SettlementRef: cityRef, StreetName: street })); }
   }, [dispatch, street, cityRef]);

   const handleInputChangeStreet = event => {
     const searchStreet = event.target.value;
     setStreet(searchStreet);
     refList.current && (refList.current.style.display = 'block');
   };

   const handleInputChangeHouse = event => {
    const house = event.target.value;
    setHouseNumber(house)
   }

    const handleInputChangeApartment = event => {
    const apartment = event.target.value;
    setApartment(apartment)
   }

    const handleSelection = selectedItem => {
    setStreet(selectedItem);

   refList.current.style.display = 'none';
  };

   const removeSearchLocality = () => {
      setStreet('');
  };

    const closeByClickOutside = () => {
    refList.current && (refList.current.style.display = 'none');
    }
   
    useOutsideClick(refList, refInput, closeByClickOutside);

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
            onFocus={() => setIsLocalityInputFocused(true)}
            onBlur={() => setIsLocalityInputFocused(false)}
            placeholder={isLocalityInputFocused ? '' : 'Введіть місто..'}
            className="flex-grow search-input w-full placeholder:text-textInputDefault text-textPrimary"
          />
         {street !== '' && (
            <button
              className=" absolute right-[12px] top-0 bottom-0"
              type="button"
              onClick={removeSearchLocality}
            >
              <CloseIcon size="20" />
            </button>
          )} 
        </div>

        {streetName &&  streetName.length !== 0 && (
          <ul
            ref={refList}
            style={{ display: 'none' }}
            className="absolute tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
          >
            {streetName?.map(item => (
              <li
                key={item.Ref}
                onClick={() => handleSelection(item)}
                className="relative cursor-pointer select-none p-2 hover:text-textBrand"
              >
                {item}
              </li>
            ))}
          </ul>
        )} 
      </div>

      {/* <input className="search-input w-full " type="text" /> */}

      <div className="flex gap-2 mt-2">
        <div>
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер будинку
            <span className="text-textError">*</span>
          </p>
          <input className="search-input w-full " type="text" onChange={handleInputChangeHouse} />
        </div>
        <div>
          {' '}
          <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
            Номер квартири
            <span className="text-textError">*</span>
          </p>
          <input className="search-input w-full " type="text" onChange={handleInputChangeApartment} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryCourier;
