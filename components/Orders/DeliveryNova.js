import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { fetchWarehouses } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectWaherousesNP } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { ArrowDownIcon } from 'universal-components-frontend/src/components/icons';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';

const DeliveryNova = ({ onWarehouseChange }) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const [warehouses, setWarehouses] = useState(checkoutData?.deliveryOffice);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const cityRef = checkoutData?.selectedCity;

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

// Get list of warehouses NP
  useEffect(() => {
    if (cityRef === '') {
      setWarehouses('');
      return;
    } 
      if ( cityRef !== '') {
    dispatch(
      fetchWarehouses({
        CityRef: cityRef,
        FindByString: warehouses,
      })
    );
  }

  }, [dispatch, cityRef, warehouses ]);

  const handleInputChangeWarehouses = event => {
    if (cityRef === '') {
      setIsInputEmpty(true);
      setWarehouses('');
      return;
    }
    const searchWarehouses = event.target.value;
    setWarehouses(searchWarehouses);
    setIsInputEmpty(false);
  };

  const handleSelection = selectedItem => {
    setWarehouses(selectedItem);
    onWarehouseChange(selectedItem);
    setIsOpen(false);
  };

  useOutsideClick(refList, refInput, close);

  return (
    <>
      <div>
        <div
          ref={refInput}
          className="relative tablet600:w-[400px] tablet768:w-[600px] border border-borderDefault rounded p-xs flex items-center justify-between gap-2 search hover:bg-bgHoverGrey focus:bg-bgHoverGrey"
        >
          {!isOpen && (
            <div
              onClick={toggling}
              className="w-full flex items-center justify-between"
            >
              <div>
                {cityRef === '' || warehouses === ''
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
                onFocus={() => setIsInputEmpty(true)}
                onBlur={() => setIsInputEmpty(false)}
                onChange={handleInputChangeWarehouses}
                className="w-[600px] focus:outline-none"
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

              {filteredWarehouses &&
                cityRef !== '' &&
                filteredWarehouses.length !== 0 && (
                  <ul
                    ref={refList}
                    className="absolute left-0 top-[50px] max-h-60 border border-borderDefault overflow-auto text-base text-textInputDefault rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
                  >
                    {filteredWarehouses?.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelection(item)}
                        className="relative cursor-pointer select-none px-2 py-1 hover:text-textBrand"
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
      <div className="text-textError text-[12px]/[16px]">
        {isInputEmpty &&
          cityRef === '' &&
          warehouses === '' &&
          'Ви не обрали місто доставки'}
      </div>
    </>
  );
};

export default DeliveryNova;
