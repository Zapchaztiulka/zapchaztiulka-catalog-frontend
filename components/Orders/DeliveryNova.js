import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { fetchWarehouses } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectWaherousesNP } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { ArrowDownIcon } from 'universal-components-frontend/src/components/icons';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';

const DeliveryNova = ({ onWarehouseChange }) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const [warehouses, setWarehouses] = useState(checkoutData?.deliveryOffice);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const removeWarehouse = () => {
    setWarehouses('');
    setIsOpen(false);
    dispatch(addToCheckout({ field: 'deliveryOffice', value: '' }));
  };

  // Get list of warehouses NP
  useEffect(() => {
    if (cityRef === '') {
      setWarehouses('');
      return;
    }
    if (cityRef !== '') {
      dispatch(
        fetchWarehouses({
          CityRef: cityRef,
          FindByString: warehouses,
        })
      );
    }
  }, [dispatch, cityRef, warehouses]);

  const handleInputChangeWarehouses = event => {
    if (cityRef === '') {
      setWarehouses('');
      return;
    }
    const searchWarehouses = event.target.value;
    setWarehouses(searchWarehouses);
    setIsInputEmpty(true);
    setIsOpen(true);
    if (!searchWarehouses) {
      removeWarehouse();
    }
  };

  const handleSelection = selectedItem => {
    setWarehouses(selectedItem);
    setSelectedItem(selectedItem);
    onWarehouseChange(selectedItem);
    setIsOpen(false);
    setIsInputEmpty(true);
  };

  const closeByClickOutside = () => {
    if (!selectedItem && isOpen) {
      setWarehouses('');
      setIsOpen(false);
    }
  };

  useOutsideClick(refList, refInput, closeByClickOutside);

  const handleInputFocus = () => {
    setIsInputEmpty(true);
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setIsInputEmpty(false);
  };

  return (
    <>
      <div className="search tablet600:w-[400px] tablet768:w-[600px] relative">
        <div className="flex items-center gap-3 relative">
          <input
            ref={refInput}
            type="text"
            value={warehouses}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleInputChangeWarehouses}
            placeholder={
              isInputEmpty ? null : 'Оберіть значення або введіть назву..'
            }
            className=" flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary"
          />
          {warehouses !== '' && (
            <button
              type="button"
              onClick={removeWarehouse}
              className="absolute right-3 top-3"
            >
              <CloseIcon
                className="close-icon stroke-iconPrimary"
                width="24"
                height="24"
              />
            </button>
          )}

          {isOpen &&
            cityRef !== '' &&
            filteredWarehouses &&
            filteredWarehouses?.length !== 0 && (
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
