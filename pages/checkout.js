import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { Dropdown } from '@/components';
import { useContext, useState, useEffect } from 'react';
import { StatusContext } from '@/context/statusContext';
import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import Settlelement from '@/components/Orders/Settlelement';
import DeliveryNova from '@/components/Orders/DeliveryNova';
import DeliveryCourier from '@/components/Orders/DeliveryCourier';
import DeliveryByPickup from '@/components/Orders/DeliveryByPickup';

const Сheckout = () => {
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
  const [isNovaPoshtaOffice, setIsNovaPoshtaOffice] = useState(
    'Оберіть значення...'
  );

  const [addressForPickup, setAddressForPickup] = useState(
    'Оберіть значення...'
  );

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

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
      <div className="flex flex-col gap-[24px] mt-[12px]">
        <h1 className="font-medium text-[28px] leading-[23.6px] text-textPrimary">
          Оформлення замовлення
        </h1>
        <div className="flex items-center gap-[8px] font-medium text-[14px] leading-[19.6px]">
          <button
            id="naturalPerson"
            className="w-[140px] h-[44px] border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast"
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
            className="w-[140px] h-[44px] border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast"
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
          <ul className="flex flex-col font-medium text-[14px] leading-[19.6px] gap-[8px]">
            {isClientStatus && (
              <>
                <li className="">
                  <p className="mb-[4px]">
                    Тип рестрації <span className="text-textError">*</span>
                  </p>
                  <Dropdown
                    selected={isLegalPerson}
                    options={['ФОП', 'Юридична особа']}
                    onSelected={value => () => {
                      setIsLegalPerson(value);
                    }}
                  />
                </li>
                <li className="">
                  <label>
                    Назва <span className="text-textError">*</span>
                    <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
                  </label>
                </li>
                {isLegalPerson === 'Юридична особа' && (
                  <li className="">
                    <label>
                      ЄДРПОУ <span className="text-textError">*</span>
                      <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
                    </label>
                  </li>
                )}
                <li className="">
                  <label>
                    ІПН <span className="text-textError">*</span>
                    <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
                  </label>
                </li>
                <li className="">
                  <p className="mb-[4px]">
                    Область реєстрації <span className="text-textError">*</span>
                  </p>
                  <Dropdown
                    selected={isStateOfRegister}
                    options={[
                      'Область 1',
                      'Область 2',
                      'Область 3',
                      'Область 4',
                    ]}
                    onSelected={value => () => {
                      setIsStateOfRegister(value);
                    }}
                  />
                </li>
                <li className="">
                  <p className="mb-[4px]">
                    Місто реєстрації <span className="text-textError">*</span>
                  </p>
                  <Dropdown
                    selected={isCityOfRegister}
                    options={['Місто 1', 'Місто 2', 'Місто 3', 'Місто 4']}
                    onSelected={value => () => {
                      setIsCityOfRegister(value);
                    }}
                  />
                </li>
                <li className="">
                  <label>
                    Юридична адреса <span className="text-textError">*</span>
                    <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
                  </label>
                </li>
              </>
            )}
            <li className="">
              <label>
                Ім'я <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
              </label>
            </li>
            <li className="">
              <label>
                Прізвище <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
              </label>
            </li>
            <li className="">
              <label>
                По батькові
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
              </label>
            </li>
            <li className="">
              <label>
                E-mail <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]" />
              </label>
            </li>
            <li className="">
              <label className="relative">
                Номер телефону <span className="text-textError">*</span>
                <span className="absolute grid items-center z-10 block top-[29px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
                  +38
                </span>
                <input
                  className="pl-[53px] w-full h-[48px] border border-borderDefault rounded-minimal"
                  name="phone"
                  type="tel"
                  id="phone"
                  maxLength="13"
                  pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
                  title="096 123 45 67"
                  autoComplete="off"
                  required
                  onChange={replacePhoneNumber}
                />
                <span id="errorMessage" className="text-textWarning"></span>
              </label>
            </li>
          </ul>
        </div>

        {/* Дані доставки */}
        <div className="flex flex-col gap-[16px]">
          <h3 className="font-medium text-[18px] leading-[25.2px]">
            Дані доставки
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
            {selectedDelivery === 'zapchaztiulkaCourier' && <DeliveryCourier />}
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
        <div className="flex flex-col gap-[16px] bg-bgGreyLigth p-[12px]">
          <h4 className="font-medium text-[18px] leading-[25.2px]">
            Ваше замовлення
          </h4>
          <ul className="flex flex-col gap-[16px]">
            <li>Товар 1</li>
            <li>Товар 2</li>
          </ul>
          <div className="flex flex-col gap-[16px] py-[16px] border-y border-borderDefault border-dashed">
            <p className="">Доставка</p>
            <p className="">Підсумок</p>
          </div>
          <p className="">Загалом</p>
        </div>

        <button
          type="button"
          className="state-button w-full mobile480:w-[432px] tablet600:w-[285px] h-[48px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
        >
          Офомити замовлення
        </button>
      </div>
    </div>
  );
};

export default Сheckout;
