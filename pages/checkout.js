import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';

const Сheckout = () => {
  const { setShowModalCart } = useContext(StatusContext);
  return (
    <div className="h-full container">
      <button
        className="flex items-center"
        onClick={() => {
          setShowModalCart(true);
          document.body.classList.add('stop-scrolling');
        }}
      >
        <ArrowLeftIcon size="24px" /> Назад до кошика
      </button>
      <h1>Оформлення замовлення</h1>
      <div className="flex items-center justify-center gap-[8px]">
        <button className="w-[140px] h-[44px] border border-borderDefault rounded-medium3">
          Фізична особа
        </button>
        <button className="w-[140px] h-[44px] border border-borderDefault rounded-medium3">
          Юридична особа
        </button>
      </div>
      <form className="flex flex-col items-center gap-[24px]">
        <div>
          <h2>Контактні дані</h2>
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
      </form>
      <button
        type="button"
        className="state-button w-full mobile480:w-[432px] tablet600:w-[285px] h-[48px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
      >
        Офомити замовлення
      </button>
    </div>
  );
};

export default Сheckout;
