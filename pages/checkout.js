import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
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
              <labell>
                Ім'я <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault"></input>
              </labell>
            </li>
            <li className="">
              <labell>
                Прізвище <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault"></input>
              </labell>
            </li>
            <li className="">
              <labell>
                По батькові
                <input className="w-full h-[48px] border border-borderDefault"></input>
              </labell>
            </li>
            <li className="">
              <labell>
                E-mail <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault"></input>
              </labell>
            </li>
            <li className="">
              <labell>
                Номер телефону <span className="text-textError">*</span>
                <input className="w-full h-[48px] border border-borderDefault"></input>
              </labell>
            </li>
          </ul>
        </div>
        <div>
          <h3>Дані доставки</h3>
        </div>
        <div>
          <h4>Коментар до замовлення</h4>
        </div>
        <div>
          <h5>Ваше замовлення</h5>
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
