'use client';
import React from 'react';
import CartCardItem from './CartCardItem';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const CartCardList = () => {
  const { data } = useSelector(selectCart);

  return (
    <ul className="flex flex-col gap-[12px] px-[16px] mobile480:px-[24px] tablet1024:px-[48px] w-full">
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
