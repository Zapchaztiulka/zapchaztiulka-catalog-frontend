import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { fetchWarehouses } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectWaherousesNP } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from 'universal-components-frontend/src/components/icons';

const DeliveryNova = ({ selectedCity }) => {
  const dispatch = useDispatch();
  const [warehouses, setWarehouses] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const warehousesInfo = useSelector(selectWaherousesNP);

  const warehousesList = warehousesInfo?.data?.flatMap(
    entry => entry.Description
  );

  const filteredWarehouses = warehousesList?.filter(item =>
    item.toLowerCase().includes(warehouses.toLowerCase())
  );

  const refInput = useRef();
  const refList = useRef();

  const toggling = () => setIsOpen(!isOpen);
  const close = () => {
     setIsOpen(false);
      setWarehouses('');
  };

   useEffect(() => {
     if (selectedCity==='') {
      setWarehouses('');
    } else {
      dispatch(fetchWarehouses(selectedCity));
    }
  }, [dispatch, selectedCity]);

  const handleInputChangeWarehouses = event => {
    const searchWahehouses = event.target.value;
       setWarehouses(searchWahehouses);
  };

   const handleSelection = selectedItem => {
     setWarehouses(selectedItem); 
     setIsOpen(false);
  };

  useOutsideClick(refList, refInput, close);

  return (
    <div>
      <div
        ref={refInput}
        className="relative min-w-[347px] border border-borderDefault rounded p-xs flex items-center justify-between"
      >
        {!isOpen && (
          <div
            onClick={toggling}
            className="w-full flex items-center justify-between"
          >
            <div>
              {selectedCity === '' && warehouses === ''
                ? 'Оберіть значення..'
                : warehouses}
            </div>
            <ArrowDownIcon color={theme.extend.colors.iconSecondary} />
          </div>
        )}
        {isOpen && (
          <>
            <input
              type="text"
              value={warehouses}
              onChange={handleInputChangeWarehouses}
              className="w-full focus:outline-none"
            />
            {warehouses !== '' && (
              <button type="button" onClick={close}>
                <CloseIcon
                  className="close-icon stroke-iconPrimary"
                  width="24"
                  height="24"
                />
              </button>
            )}

            {filteredWarehouses && selectedCity !== '' && filteredWarehouses.length!==0 && (
              <ul
                ref={refList}
                className="absolute left-0 top-[50px] tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
              >
                {filteredWarehouses?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelection(item)}
                    className="relative cursor-pointer select-none p-2 hover:text-textBrand"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryNova;
