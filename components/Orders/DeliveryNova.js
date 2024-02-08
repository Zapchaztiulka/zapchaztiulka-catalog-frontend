import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { fetchWarehouses } from '@/redux/delivery/NovaPoshta/novaPoshtaOperations';
import { selectWaherousesNP } from '@/redux/delivery/NovaPoshta/novaPoshtaSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowUpIcon,
  CloseIcon,
  ArrowDownIcon,
} from 'universal-components-frontend/src/components/icons';
import theme from '@/presets';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';

const DeliveryNova = ({
  onWarehouseChange,
  warehouses,
  setWarehouses,
  isErrorMessage,
  checkoutData,
  isClientStatus,
  userLegalData,
}) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const cityRef = isClientStatus
    ? checkoutData?.selectedCity
    : userLegalData.selectedCity;

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
        if (isClientStatus) {
           dispatch(addToCheckout({ field: 'deliveryOffice', value: '' }));
        }
        if (!isClientStatus) {
           dispatch(addToCheckoutLegal({ field: 'deliveryOffice', value: '' }));
        }   
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
        <div className="flex items-center ">
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
            className="relative flex-grow border border-borderDefault rounded-minimal p-3 w-full placeholder:text-textInputDefault text-textPrimary"
          />
          {warehouses !== '' && (
            <button
              type="button"
              onClick={removeWarehouse}
              className="absolute right-3 top-3"
            >
              <CloseIcon
                color={theme.extend.colors.iconSecondary}
                width="20"
                height="20"
              />
            </button>
          )}
          {/* {isOpen ? (
            <ArrowUpIcon
              color={theme.extend.colors.iconSecondary}
              size={24}
              className="absolute right-[36px] top-3"
            />
          ) : (
            <ArrowDownIcon
              color={theme.extend.colors.iconSecondary}
              size={24}
            />
          )} */}
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

      {isErrorMessage && warehouses === '' && (
        <p className="text-textError text-[12px]">
          Оберіть відділення
          <span className="text-textError">*</span>
        </p>
      )}
    </>
  );
};

export default DeliveryNova;
