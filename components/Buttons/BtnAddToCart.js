import {
  MinusIcon,
  PlusIcon,
} from 'universal-components-frontend/src/components/icons';
import { useState, useEffect } from 'react';

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

  const [cartProducts, setCartProducts] = useState([]);

  // call effect to receive the products from localStorage (cart)
  useEffect(() => {
    const parsedProducts = JSON.parse(localStorage.getItem('cart'));
    if (parsedProducts) setCartProducts(parsedProducts);
  }, []);

  return (
    <>
      {!cartProducts.find(product => product.productId === id) && (
        <button
          onClick={() => {
            const settings = {
              // photo,
              // name,
              // price,
              productId: id,
              quantity: 1,
            };

            setCartProducts(prevCartProducts => [
              ...prevCartProducts,
              settings,
            ]);
            const parsedProducts = JSON.parse(
              localStorage.getItem('cart') || '[]'
            );

            localStorage.setItem(
              'cart',
              JSON.stringify([...parsedProducts, settings])
            );
          }}
          className="tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button"
        >
          Додати в кошик
        </button>
      )}

      {cartProducts.find(product => product.productId === id) && (
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
      )}
    </>
  );
};

export default BtnAddToCart;
