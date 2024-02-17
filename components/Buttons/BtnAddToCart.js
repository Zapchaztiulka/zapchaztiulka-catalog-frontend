import { CartIcon } from '@/public/icons';
import Counter from '../Buttons/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';
import { addToCart, getCartTotal } from '../../redux/cart/cartSlice';
import { selectCart } from '../../redux/cart/cartSelector';
import { useWindowSize } from '@/hooks/useWindowSize';

const BtnAddToCart = ({
  id,
  photo,
  name,
  price,
  vendorCode,
  visibleCartIcon = false,
}) => {
  const dispatch = useDispatch();
  const { showCartNotification, setShowCartNotification } =
    useContext(StatusContext);
  const { data: cartProducts } = useSelector(selectCart);

  let counterValue;
  const temp = cartProducts.find(product => product.id === id);
  if (temp) {
    counterValue = temp.quantity;
  }

  const size = useWindowSize()

  return (
    <>
      {!cartProducts.find(product => product.id === id) && (
        <button
          onClick={() => {
            const settings = {
              id,
              photo,
              name,
              vendorCode,
              quantity: 1,
              price,
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
          className="tablet600:py-xs py-xs2 px-m w-full text-[14px]/[24px] tablet600:text-base/[24px] text-textContrast state-button"
        >
          {visibleCartIcon ? (
            <div className="flex justify-center products-center gap-x-4">
              <CartIcon className="w-[24px] h-[24px] fill-iconContrast" />
              <span className="text-textContrast text-sm tracking-[-0.21px]">
                {size >= 600 ? 'Додати в кошик' : 'В кошик'}
              </span>
            </div>
          ) : (
            <> {size >= 600 ? 'Додати в кошик' : 'В кошик'} </>
          )}
        </button>
      )}

      {cartProducts.find(product => product.id === id) && (
        <div className="border border-borderDefault rounded-lg hover:shadow-md tablet600:py-[11px] py-[7px] w-full"><Counter id={id} counterValue={counterValue} /></div>
      )}
    </>
  );
};

export default BtnAddToCart;
