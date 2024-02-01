import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { useContext, useState, useEffect } from 'react';
import { StatusContext } from '@/context/statusContext';
import Settlelement from '@/components/Orders/Settlelement';
import DeliveryNova from '@/components/Orders/DeliveryNova';
import DeliveryCourier from '@/components/Orders/DeliveryCourier';
import DeliveryByPickup from '@/components/Orders/DeliveryByPickup';
import TotalOrder from '@/components/Orders/TotalOrder';
import Legal from '@/components/Orders/EntityType/Legal';
import Individual from '@/components/Orders/EntityType/Individual';
import { useSelector } from 'react-redux';
import { selectCart } from '@/redux/cart/cartSelector';

const Сheckout = () => {

    const orderInfoTotal=useSelector(selectCart);
  console.log(orderInfoTotal)
  const { setShowModalCart } = useContext(StatusContext);
  const [isClientStatus, setIsClientStatus] = useState(false);
  const [isLegalPerson, setIsLegalPerson] = useState('ФОП');
  const [isStateOfRegister, setIsStateOfRegister] = useState(
    'Оберіть значення...'
  );
  const [isCityOfRegister, setIsCityOfRegister] = useState(
    'Оберіть значення...'
  );
  const [isCityOfDelivery, setIsCityOfDelivery] = useState(
    'Оберіть значення...'
  );

  const [addressForPickup, setAddressForPickup] = useState(
    'Оберіть значення...'
  );

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  console.log(selectedDelivery);

  const handleDeliveryChange = event => {
    setSelectedDelivery(event.target.value);
  };

  useEffect(() => {
    if (isClientStatus) {
      document.getElementById('legalPerson').classList.add('activeButton');
      document.getElementById('naturalPerson').classList.remove('activeButton');
    } else {
      document.getElementById('naturalPerson').classList.add('activeButton');
      document.getElementById('legalPerson').classList.remove('activeButton');
    }
  }, [isClientStatus]);

  const handleCitySelection = city => {
    setSelectedCity(city);
  };

  return (
    <div className="h-full container pt-[16px] mt-[57px] tablet1024:mt-[81px]">
      <button
        className="flex items-center font-normal text-[14px] leading-[19.6px] text-textPrimary"
        onClick={() => {
          setShowModalCart(true);
          document.body.classList.add('stop-scrolling');
        }}
      >
        <ArrowLeftIcon size="24px" /> Назад до кошика
      </button>
      <h1 className="font-medium text-[36px]/[46.8px] text-textPrimary mt-3 mb-6">
        Оформлення замовлення
      </h1>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col tablet1024:w-[644px] desktop1200:w-[698px]">
            <div className="flex gap-2 text-[14px]/[19.6px] mb-6 tablet600:mb-5">
              <button
                id="naturalPerson"
                className="w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast"
                onClick={() => {
                  if (isClientStatus) {
                    setIsClientStatus(!isClientStatus);
                  }
                }}
              >
                Фізична особа
              </button>
              <button
                id="legalPerson"
                className="w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast"
                onClick={() => {
                  if (!isClientStatus) {
                    setIsClientStatus(!isClientStatus);
                  }
                }}
              >
                Юридична особа
              </button>
            </div>
            <div>
              <h2 className="mb-[16px] font-medium text-[18px] leading-[25.2px]">
                Контактні дані
              </h2>
              {isClientStatus ? (
                <Legal
                  isLegalPerson={isLegalPerson}
                  setIsLegalPerson={setIsLegalPerson}
                  isStateOfRegister={isStateOfRegister}
                  setIsStateOfRegister={setIsStateOfRegister}
                  isCityOfRegister={isCityOfRegister}
                  setIsCityOfRegister={setIsCityOfRegister}
                />
              ) : (
                <Individual />
              )}
            </div>
          </div>

          <div className="hidden tablet1024:block tablet1024:w-[300px] desktop1200:w-[470px]  desktop1920:w-[588px] ">
            {/* Підсумок замовлення */}
            <TotalOrder
              orderInfoTotal={orderInfoTotal}
              selectedDelivery={selectedDelivery}
            />
          </div>
        </div>

        <>
          {/* Дані доставки */}
          <div className="flex flex-col gap-[16px] mt-6 mb-6">
            <h3 className="font-medium text-[18px] leading-[25.2px]">
              Спосіб та дані доставки
            </h3>
            <div>
              <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
                Оберіть місто доставки <span className="text-textError">*</span>
              </p>

              <Settlelement onSelectCity={handleCitySelection} />
            </div>

            {/* Нова пошта відділення */}
            <div
              className={`flex flex-col gap-[8px] ${
                selectedDelivery === 'novaPoshta'
                  ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                  : ''
              } `}
            >
              <div className="flex items-center gap-[8px] h-[44px]">
                <input
                  type="radio"
                  name="delivery"
                  id="novaPoshta"
                  value="novaPoshta"
                  className="w-[16px] h-[16px] ml-[14px]"
                  checked={selectedDelivery === 'novaPoshta'}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="novaPoshta"
                  className="flex items-center justify-between w-full"
                >
                  <span>Нова пошта</span>
                </label>
              </div>
              {selectedDelivery === 'novaPoshta' && (
                <div className="pl-[32px] pr-[12px]">
                  <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
                    Оберіть поштове відділення{' '}
                    <span className="text-textError">*</span>
                  </p>
                  <DeliveryNova selectedCity={selectedCity} />
                </div>
              )}
            </div>

            {/* Самовивіз */}
            <div
              className={`flex flex-col gap-[8px] ${
                selectedDelivery === 'pickup'
                  ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                  : ''
              } `}
            >
              <div className="flex items-center gap-[8px] h-[44px]">
                <input
                  type="radio"
                  name="delivery"
                  id="pickup"
                  value="pickup"
                  className="w-[16px] h-[16px] ml-[14px]"
                  checked={selectedDelivery === 'pickup'}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="pickup"
                  className="flex items-center justify-between w-full"
                >
                  <span>Самовивіз</span>
                  <span className="flex items-center justify-center w-[116px] h-[28px] bg-bgGreyLigth rounded-medium3 font-medium text-[14px] leading-[19.6px]">
                    Безкоштовно
                  </span>
                </label>
              </div>
              {selectedDelivery === 'pickup' && (
                <DeliveryByPickup
                  addressForPickup={addressForPickup}
                  setAddressForPickup={setAddressForPickup}
                />
              )}
            </div>

            {/* Кур'єр запчастюлькі */}
            <div
              className={`flex flex-col gap-[8px] ${
                selectedDelivery === 'zapchaztiulkaCourier'
                  ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                  : ''
              } `}
            >
              <div className="flex items-center gap-[8px] h-[44px]">
                <input
                  type="radio"
                  name="delivery"
                  id="zapchaztiulkaCourier"
                  value="zapchaztiulkaCourier"
                  className="w-[16px] h-[16px] ml-[14px]"
                  checked={selectedDelivery === 'zapchaztiulkaCourier'}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="zapchaztiulkaCourier"
                  className="flex items-center justify-between w-full"
                >
                  <span>Кур'єр Запчастюлька</span>
                  <span className="flex items-center justify-center w-[89px] h-[28px] bg-bgGreyLigth rounded-medium3 font-medium text-[14px] leading-[19.6px]">
                    Від 220 ₴
                  </span>
                </label>
              </div>
              {selectedDelivery === 'zapchaztiulkaCourier' && (
                <DeliveryCourier />
              )}
            </div>

            {/* Кур'єр Нової Пошти */}
            <div
              className={`flex flex-col gap-[8px] ${
                selectedDelivery === 'novaPoshtaCourier'
                  ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                  : ''
              } `}
            >
              <div className="flex items-center gap-[8px] h-[44px]">
                <input
                  type="radio"
                  name="delivery"
                  id="novaPoshtaCourier"
                  value="novaPoshtaCourier"
                  className="w-[16px] h-[16px] ml-[14px]"
                  checked={selectedDelivery === 'novaPoshtaCourier'}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="novaPoshtaCourier"
                  className="flex items-center justify-between w-full"
                >
                  <span>Кур'єр Нова Пошта</span>
                </label>
              </div>
              {selectedDelivery === 'novaPoshtaCourier' && <DeliveryCourier />}
            </div>
          </div>

          {/* Залишити коментар */}
          <div className="flex flex-col gap-[16px]">
            <label
              htmlFor="comment"
              className="font-medium text-[18px] leading-[25.2px]"
            >
              Коментар до замовлення
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="5"
              cols="33"
              className="resize-none w-full h-[140px] border border-borderDefault rounded-minimal px-[12px] py-[16px]"
            />
          </div>

          <div className=" tablet1024:hidden mt-6">
            {/* Підсумок замовлення */}
            <TotalOrder
              orderInfoTotal={orderInfoTotal}
              selectedDelivery={selectedDelivery}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default Сheckout;
