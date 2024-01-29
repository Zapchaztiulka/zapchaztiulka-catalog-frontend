import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { Dropdown } from '@/components';
import { useContext, useState, useEffect } from 'react';
import { StatusContext } from '@/context/statusContext';
import { replacePhoneNumber } from '@/helpers/formatPhoneNumber';

const Сheckout = () => {
  const { setShowModalCart } = useContext(StatusContext);
  const [isClientStatus, setIsClientStatus] = useState(false);
  const [isLegalPerson, setIsLegalPerson] = useState('ФОП');

  useEffect(() => {
    if (isClientStatus) {
      document.getElementById('legalPerson').classList.add('activeButton');
      document.getElementById('naturalPerson').classList.remove('activeButton');
    } else {
      document.getElementById('naturalPerson').classList.add('activeButton');
      document.getElementById('legalPerson').classList.remove('activeButton');
    }
  }, [isClientStatus]);

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
                  {/* <Dropdown
                    // width={290}
                    chosenOption={isLegalPerson}
                    options={['ФОП', 'Юридична особа']}
                    onChange={option => {
                      setIsLegalPerson(option);
                    }}
                    className="w-full border border-borderDefault rounded-minimal"
                  /> */}
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
                  {/* <Dropdown
                    // width={290}
                    onChange={() => {}}
                    options={[
                      'Варіант 1',
                      'Варіант 2',
                      'Варіант 3',
                      'Варіант 4',
                    ]}
                    className="w-full border border-borderDefault rounded-minimal"
                  /> */}
                </li>
                <li className="">
                  <p className="mb-[4px]">
                    Місто реєстрації <span className="text-textError">*</span>
                  </p>
                  {/* <Dropdown
                    // width={290}
                    onChange={() => {}}
                    options={[
                      'Варіант 1',
                      'Варіант 2',
                      'Варіант 3',
                      'Варіант 4',
                    ]}
                    className="w-full border border-borderDefault rounded-minimal"
                  /> */}
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
        <div className="flex flex-col gap-[16px]">
          <h3 className="font-medium text-[18px] leading-[25.2px]">
            Дані доставки
          </h3>
          <div>
            <p className="mb-[4px]">
              Оберіть місто доставки <span className="text-textError">*</span>
            </p>
            {/* <Dropdown
              // width={290}
              onChange={() => {}}
              options={['Варіант 1', 'Варіант 2', 'Варіант 3', 'Варіант 4']}
              className="w-full border border-borderDefault rounded-minimal"
            /> */}
          </div>

          <div className="hidden flex flex-col gap-[8px] h-[156px] pt-[12px] pb-[20px] border border-borderDefaultBlue rounded-minimal">
            <div className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="activeDelivery"
                id="activeDelivery"
                value="activeDelivery"
                className="w-[16px] h-[16px] ml-[14px]"
                // checked
              />
              <label
                htmlFor="activeDelivery"
                className="flex items-center justify-between w-full"
              >
                <span>Самовивіз</span>
              </label>
            </div>

            <div>
              <p className="mb-[4px]">
                Оберіть поштове відділення{' '}
                <span className="text-textError">*</span>
              </p>
              {/* <Dropdown
                // width={290}
                onChange={() => {}}
                options={['Варіант 1', 'Варіант 2', 'Варіант 3', 'Варіант 4']}
                className="w-full border border-borderDefault rounded-minimal"
              /> */}
            </div>
          </div>

          <ul className="flex flex-col font-normal text-[16px] leading-[24px] gap-[8px]">
            <li className=" flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="novaPoshta"
                value="novaPoshta"
                className="w-[16px] h-[16px] ml-[14px]"
              />
              <label htmlFor="novaPoshta">Нова пошта</label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="pickup"
                value="pickup"
                className="w-[16px] h-[16px] ml-[14px]"
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
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="ukrPoshta"
                value="ukrPoshta"
                className="w-[16px] h-[16px] ml-[14px]"
              />
              <label htmlFor="ukrPoshta">Укрпошта</label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="meestExperess"
                value="meestExperess"
                className="w-[16px] h-[16px] ml-[14px]"
              />
              <label htmlFor="meestExperess">Meest experess</label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="courierZapchastulka"
                value="courierZapchastulka"
                className="w-[16px] h-[16px] ml-[14px]"
              />
              <label
                htmlFor="courierZapchastulka"
                className="flex items-center justify-between w-full"
              >
                <span>Кур'єр Запчастюлька</span>
                <span className="flex items-center justify-center w-[89px] h-[28px] bg-bgGreyLigth rounded-medium3 font-medium text-[14px] leading-[19.6px]">
                  Від 220 ₴
                </span>
              </label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="courierNovaPoshta"
                value="courierNovaPoshta"
                className="w-[16px] h-[16px] ml-[14px]"
              />
              <label htmlFor="courierNovaPoshta">Кур'єр Нова Пошта</label>
            </li>
          </ul>
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
