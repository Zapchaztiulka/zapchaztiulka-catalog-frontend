import { PlusIcon } from 'universal-components-frontend/src/components/icons';
import { MinusIcon } from 'universal-components-frontend/src/components/icons';

const BtnAddToCart = ({ id }) => {
  let counterValue = 1;

  const valueDecrement = () => {
    if (counterValue > 1) {
      counterValue -= 1;
    }
    document.querySelector(`#${id.slice(18)}`).textContent = counterValue;
  };

  const valueIncrement = () => {
    counterValue += 1;
    document.querySelector(`#${id.slice(18)}`).textContent = counterValue;
  };

  return (
    <div className="flex justify-center items-center gap-[10px]">
      <button
        onClick={valueDecrement}
        type="button"
        className="w-[40px] h-[40px] flex justify-center items-center"
      >
        <MinusIcon />
      </button>
      <span
        id={id.slice(18)}
        className="font-medium text-[16px] leading-[22.4px] text-textPrimary"
      >
        1
      </span>
      <button
        onClick={valueIncrement}
        type="button"
        className="w-[40px] h-[40px] flex justify-center items-center"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default BtnAddToCart;
