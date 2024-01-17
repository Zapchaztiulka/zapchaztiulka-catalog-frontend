'use client';
import React from 'react';
import CartCardItem from './CartCardItem';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const CartCardList = () => {
  const { data } = useSelector(selectCart);
  // const { photo, name, vendorCode, quantity, totalPrice } = data[0];

  return (
    <ul className="flex flex-col gap-[16px]">
      {data &&
        data.map(({ id, photo, name, vendorCode, quantity, totalPrice }) => {
          return (
            <React.Fragment key={id}>
              <CartCardItem
                id={id}
                name={name}
                photo={photo}
                vendorCode={vendorCode}
                quantity={quantity}
                totalPrice={totalPrice}
              />
            </React.Fragment>
          );
        })}
    </ul>
  );
};

export default CartCardList;
