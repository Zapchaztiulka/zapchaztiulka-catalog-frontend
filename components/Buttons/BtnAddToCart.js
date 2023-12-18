import { PlusIcon } from 'universal-components-frontend/src/components/icons';
import { MinusIcon } from 'universal-components-frontend/src/components/icons';

const BtnAddToCart = () => {
  let counterValue = 1;
  const counter = document.querySelector('#value');

  const valueDecrement = () => {
    if (counterValue > 1) {
      counterValue -= 1;
    }
    counter.textContent = counterValue;
  };

  const valueIncrement = () => {
    counterValue += 1;
    counter.textContent = counterValue;
  };

  return (
    <div id="counter" className="flex justify-center items-center gap-[10px]">
      <button
        onClick={valueDecrement}
        type="button"
        data-action="decrement"
        className="w-[40px] h-[40px] flex justify-center items-center"
      >
        <MinusIcon />
      </button>
      <span
        id="value"
        className="font-medium text-[16px] leading-[22.4px] text-textPrimary"
      >
        1
      </span>
      <button
        onClick={valueIncrement}
        type="button"
        data-action="increment"
        className="w-[40px] h-[40px] flex justify-center items-center"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default BtnAddToCart;
