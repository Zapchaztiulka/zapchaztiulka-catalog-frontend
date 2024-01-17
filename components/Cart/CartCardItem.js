'use client';
import Image from 'next/image';
import Counter from '../Buttons/Counter';
import {
  EmptyImageIcon,
  TrashIcon,
} from 'universal-components-frontend/src/components/icons';

const CartCardItem = ({
  id,
  photo,
  name,
  vendorCode,
  quantity,
  totalPrice,
}) => {
  return (
    <li
      className="flex flex-col h-[150px]
      border border-borderDefault rounded-lg hover:shadow-md"
    >
      <div className="flex w-full h-[62px]">
        {photo[0] ? (
          <Image
            src={photo[0]?.url}
            alt={photo[0]?.alt}
            width="66"
            height="44"
          />
        ) : (
          <EmptyImageIcon />
        )}
        <div className="flex flex-col">
          <h5 className="font-medium text-[14px] leading-[19.6px] decoration-textPrimary">
            {name}
          </h5>
          <p className="font-normal text-[12px] leading-[18px] decoration-textTertiary">
            Артикул: {vendorCode}
          </p>
        </div>
        <button className="">
          <TrashIcon size="44" color="#888D92" />
        </button>
      </div>
      <div className="flex w-full h-[40px]">
        <div className="border border-borderDefault rounded-lg hover:shadow-md">
          <Counter id={id} counterValue={quantity} />
        </div>
        <p className="font-medium text-[16px] leading-[22.4px] decoration-textPrimary">
          {totalPrice} ₴
        </p>
      </div>
    </li>
  );
};

export default CartCardItem;
