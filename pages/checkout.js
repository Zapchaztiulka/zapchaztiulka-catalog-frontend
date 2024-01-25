import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import Dropdown from 'universal-components-frontend/src/components/select/Dropdown/Dropdown';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';

const Сheckout = () => {
  const { setShowModalCart } = useContext(StatusContext);
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
          <button className="w-[140px] h-[44px] border border-borderDefault rounded-medium3">
            Фізична особа
          </button>
          <button className="w-[140px] h-[44px] border border-borderDefault rounded-medium3">
            Юридична особа
          </button>
        </div>
        <div>
          <h2 className="mb-[16px] font-medium text-[18px] leading-[25.2px]">
            Контактні дані
          </h2>
          <ul className="flex flex-col font-medium text-[14px] leading-[19.6px] gap-[8px]">
            <li className="">
              <label>
                Ім'я <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal" />
              </label>
            </li>
            <li className="">
              <label>
                Прізвище <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal" />
              </label>
            </li>
            <li className="">
              <label>
                По батькові
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal" />
              </label>
            </li>
            <li className="">
              <label>
                E-mail <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal" />
              </label>
            </li>
            <li className="">
              <label>
                Номер телефону <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault rounded-minimal" />
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
            <Dropdown
              // width={290}
              // options={statusOptionsBigFirstLetter}
              // placeholder="Всі статуси"
              // onChange={handleStatusChange}
              options={['Варіант 1', 'Варіант 2', 'Варіант 3', 'Варіант 4']}
              className="w-full border border-borderDefault"
            />
          </div>
          <ul className="flex flex-col font-normal text-[16px] leading-[24px] gap-[8px]">
            <li className=" flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="novaPoshta"
                value="novaPoshta"
                className="w-[16px] h-[16px]"
              />
              <label htmlFor="novaPoshta">Нова пошта</label>
              {/* <div>
                <p className="mb-[4px]">
                  Оберіть поштове відділення
                  <span className="text-textError">*</span>
                </p>
                <Dropdown
                  // width={290}
                  // options={statusOptionsBigFirstLetter}
                  // placeholder="Всі статуси"
                  // onChange={handleStatusChange}
                  options={['Варіант 1', 'Варіант 2', 'Варіант 3', 'Варіант 4']}
                  className="w-full border border-borderDefault"
                />
              </div> */}
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="pickup"
                value="pickup"
                className="w-[16px] h-[16px]"
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
                className="w-[16px] h-[16px]"
              />
              <label htmlFor="ukrPoshta">Укрпошта</label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="meestExperess"
                value="meestExperess"
                className="w-[16px] h-[16px]"
              />
              <label htmlFor="meestExperess">Meest experess</label>
            </li>
            <li className="flex items-center gap-[8px] h-[44px]">
              <input
                type="radio"
                name="delivery"
                id="courierZapchastulka"
                value="courierZapchastulka"
                className="w-[16px] h-[16px]"
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
                className="w-[16px] h-[16px]"
              />
              <label htmlFor="courierNovaPoshta">Кур'єр Нова Пошта</label>
            </li>
          </ul>
        </div>
        <div>
          <label>
            Коментар до замовлення
            <textarea
              name="comment"
              rows="5"
              cols="33"
              className="resize-none w-full h-[140px] border border-borderDefault rounded-minimal"
            />
          </label>
        </div>
        <div className="flex flex-col gap-[16px] bg-bgGreyLigth p-[12px]">
          <h4>Ваше замовлення</h4>
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
