import {
  MinusIcon,
  PlusIcon,
} from 'universal-components-frontend/src/components/icons';
import { CartIcon } from '@/public/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';
import {
  addToCart,
  changeQuantity,
  getCartTotal,
} from '../../redux/cart/cartSlice';
import { selectCart } from '../../redux/cart/cartSelector';

const BtnAddToCart = ({ photo, name, price, id, visibleCartIcon = false }) => {
  const dispatch = useDispatch();
  const { showCartNotification, setShowCartNotification } =
    useContext(StatusContext);
  const { data: cartProducts } = useSelector(selectCart);

  let counterValue;
  const temp = cartProducts.find(product => product.id === id);
  if (temp) {
    counterValue = temp.quantity;
  }

  const valueDecrement = () => {
    dispatch(changeQuantity({ id, type: 'DEC' }));
    dispatch(getCartTotal());
  };

  const valueIncrement = () => {
    dispatch(changeQuantity({ id, type: 'INC' }));
    dispatch(getCartTotal());
  };

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
            setShowCartNotification(!showCartNotification);
            setTimeout(() => {
              setShowCartNotification(false);
            }, 2000);
            dispatch(getCartTotal());
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
