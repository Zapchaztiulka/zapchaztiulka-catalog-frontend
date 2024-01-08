import {
  MinusIcon,
  PlusIcon,
} from 'universal-components-frontend/src/components/icons';
// import { useContext, useEffect } from 'react';
// import { StatusContext } from '@/context/statusContext';
import { CartIcon } from '@/public/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  changeQuantity,
  getCartTotal,
} from '../../redux/cart/cartSlice';
import { selectCart } from '../../redux/cart/cartSelector';

const BtnAddToCart = ({ photo, name, price, id, visibleCartIcon = false }) => {
  const dispatch = useDispatch();
  const { data: cartProducts } = useSelector(selectCart);
  // const {
  //   cartProducts,
  //   setCartProducts,
  //   showCartNotification,
  //   setShowCartNotification,
  // } = useContext(StatusContext);

  let counterValue;
  const temp = cartProducts.find(product => product.id === id);
  if (temp) {
    counterValue = temp.quantity;
  }

  // const changeQuantity = counterValue => {
  //   const parsedCart = JSON.parse(localStorage.getItem('cart'));
  //   parsedCart[
  //     cartProducts.findIndex(product => product.productId === id)
  //   ].quantity = counterValue;
  //   setCartProducts(parsedCart);
  //   localStorage.setItem('cart', JSON.stringify(parsedCart));
  // };

  const valueDecrement = () => {
    // if (counterValue > 1) {
    // counterValue -= 1;
    // document.querySelector(`#${id.slice(18)}`).textContent = counterValue;
    // changeQuantity(counterValue);
    dispatch(changeQuantity({ id, type: 'DEC' }));
    dispatch(getCartTotal());
    // }
  };

  const valueIncrement = () => {
    // counterValue += 1;
    // document.querySelector(`#${id.slice(18)}`).textContent = counterValue;
    // changeQuantity(counterValue);
    dispatch(changeQuantity({ id, type: 'INC' }));
    dispatch(getCartTotal());
  };

  // call effect to receive the products from localStorage (cart)
  // useEffect(() => {
  //   const parsedProducts = JSON.parse(localStorage.getItem('cart'));
  //   if (parsedProducts) setCartProducts(parsedProducts);
  // }, []);

  return (
    <>
      {!cartProducts.find(product => product.id === id) && (
        <button
          onClick={() => {
            const settings = {
              photo,
              name,
              price,
              id,
              quantity: 1,
              totalPrice: price.value,
            };

            dispatch(
              addToCart({
                ...settings,
              })
            );
            dispatch(getCartTotal());
            // setShowCartNotification(!showCartNotification);
            // setTimeout(() => {
            //   setShowCartNotification(false);
            // }, 2000);
            // const parsedProducts = JSON.parse(
            //   localStorage.getItem('cart') || '[]'
            // );

            // setCartProducts(prevCartProducts => [
            //   ...prevCartProducts,
            //   settings,
            // ]);

            // localStorage.setItem(
            //   'cart',
            //   JSON.stringify([...parsedProducts, settings])
            // );
          }}
          className="tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button"
        >
          {visibleCartIcon ? (
            <div className="flex justify-center products-center gap-xs4">
              <CartIcon className="w-[24px] h-[24px] fill-iconContrast" />
              <span className="text-textContrast text-sm tracking-[-0.21px]">
                Додати в кошик
              </span>
            </div>
          ) : (
            <>Додати в кошик</>
          )}
        </button>
      )}

      {cartProducts.find(product => product.id === id) && (
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
            {counterValue}
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
