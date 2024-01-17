'use client';
import CartCardItem from './CartCardItem';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const CartCardList = () => {
  const { data } = useSelector(selectCart);
  // const { photo, name, vendorCode, quantity, totalPrice } = data[0];

  return (
    <ul>
      {data &&
        data.map(({ id, photo, name, vendorCode, quantity, totalPrice }) => {
          return (
            <CartCardItem
              id={id}
              name={name}
              photo={photo}
              vendorCode={vendorCode}
              quantity={quantity}
              totalPrice={totalPrice}
            />
          );
        })}
    </ul>
  );
};

export default CartCardList;
