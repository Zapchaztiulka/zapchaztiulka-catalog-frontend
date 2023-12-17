import { PlusIcon } from 'universal-components-frontend/src/components/icons';
import { MinusIcon } from 'universal-components-frontend/src/components/icons';

const BtnAddToCart = ({ availability }) => {
  return (
    <>
      {availability !== 'відсутній' ? (
        <button
          className="tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button"
          onClick={() => {
            console.log('Add to Cart :)');
          }}
        >
          Додати в кошик
        </button>
      ) : (
        <button className="disabled-button tablet768:px-6 tablet768:py-3 py-2 w-full text-textDisabled tablet768:text-base text-sm tablet768:font-medium state-button">
          Додати в кошик
        </button>
      )}
    </>
  );
};

export default BtnAddToCart;
