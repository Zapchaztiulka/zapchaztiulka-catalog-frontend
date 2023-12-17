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
    <div id="counter">
      <button onClick={valueDecrement} type="button" data-action="decrement">
        <MinusIcon />
      </button>
      <span id="value">1</span>
      <button onClick={valueIncrement} type="button" data-action="increment">
        <PlusIcon />
      </button>
    </div>
  );
};

export default BtnAddToCart;
