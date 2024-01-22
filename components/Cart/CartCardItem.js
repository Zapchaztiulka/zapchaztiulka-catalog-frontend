'use client';
import Image from 'next/image';
import Counter from '../Buttons/Counter';
import {
  EmptyImageIcon,
  TrashIcon,
} from 'universal-components-frontend/src/components/icons';
import { useState } from 'react';
import ModalDeleteFromCart from '@/components/Modals/ModalDeleteFromCart';

const CartCardItem = ({
  id,
  photo,
  name,
  vendorCode,
  quantity,
  totalPrice,
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  return (
    <li
      className="flex flex-col h-[150px] py-[16px] px-[3px] gap-[16px]
      border border-borderDefault rounded-lg hover:shadow-md"
    >
      <div className="flex items-center justify-between w-full h-[62px]">
        <div className="flex items-center justify-center w-[66px] h-[62px]">
          {photo[0] ? (
            <Image
              src={photo[0]?.url}
              alt={photo[0]?.alt}
              width="66"
              height="62"
              className="object-scale-down h-[62px]"
            />
          ) : (
            <EmptyImageIcon size="50px" />
          )}
        </div>
        <div className="flex flex-col w-[172px] mr-auto">
          <h5 className="font-medium text-[14px] leading-[19.6px] decoration-textPrimary">
            {name}
          </h5>
          <p className="font-normal text-[12px] leading-[18px] decoration-textTertiary">
            Артикул: {vendorCode}
          </p>
        </div>
        <button
          className="flex items-center justify-center w-[42px] h-[42px]"
          type="button"
          onClick={() => {
            setIsOpenDeleteModal(true);
          }}
        >
          <TrashIcon color="#888D92" />
        </button>
      </div>
      <div className="flex justify-between items-center w-full h-[40px] px-[4px]">
        <div className="border border-borderDefault rounded-lg hover:shadow-md">
          <Counter id={id} counterValue={quantity} />
        </div>
        <p className="font-medium text-[16px] leading-[22.4px] decoration-textPrimary">
          {totalPrice} ₴
        </p>
      </div>
      {/* Modal for Delete one product from cart*/}
      {isOpenDeleteModal && (
        <ModalDeleteFromCart
          onClose={() => {
            setIsOpenDeleteModal(false);
            document.body.classList.add('stop-scrolling');
          }}
          hideCloseBtn
          title={'Видалити товар'}
          desctription={
            'Ви впевнені, що хочете видалити товар? Відмініти цю дію неможливо.'
          }
          delButtonText={'Видалити товар'}
          id={id}
        />
      )}
    </li>
  );
};

export default CartCardItem;
