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
      className="flex flex-col h-full py-[16px] tablet600:py-[12px] px-[4px] mobile375:px-[8px] tablet600:px-[12px] 
      gap-[16px] mobile375:gap-[12px] mobile480:gap-[8px] tablet600:gap-[4px]
      border border-borderDefault rounded-lg hover:shadow-md"
    >
      <div className="flex items-center justify-between w-full tablet768:gap-[20px] h-[62px] tablet600:h-[72px]">
        <div className="flex items-center gap-[4px]">
          <div className="flex items-center justify-center min-w-[62px] mobile375:min-w-[76px] tablet600:min-w-[108px] h-[62px] tablet600:h-[72px]">
            {photo[0] ? (
              <Image
                src={photo[0]?.url}
                alt={photo[0]?.alt}
                width="62"
                height="62"
                className="object-scale-down h-[62px] tablet600:h-[72px] tablet600:w-[72px]"
              />
            ) : (
              <EmptyImageIcon size="50px" />
            )}
          </div>
          <div className="flex flex-col w-fit mr-auto">
            <h5 className="font-medium text-[14px] leading-[19.6px] decoration-textPrimary">
              {name}
            </h5>
            <p className="font-normal text-[12px] leading-[18px] decoration-textTertiary">
              Артикул: {vendorCode}
            </p>
          </div>
        </div>
        <div className="hidden tablet768:block ml-auto border border-borderDefault rounded-lg hover:shadow-md">
          <Counter id={id} counterValue={quantity} />
        </div>
        <p className="hidden tablet768:block font-normal text-[15px] leading-[21px] decoration-textPrimary min-w-[124px] text-right">
          {totalPrice} ₴
        </p>
        <button
          className="flex items-center justify-center min-w-[44px] h-[44px]"
          type="button"
          onClick={() => {
            setIsOpenDeleteModal(true);
          }}
        >
          <TrashIcon color="#888D92" />
        </button>
      </div>
      <div className="tablet768:hidden flex justify-between items-center w-full h-[40px] px-[4px] mobile375:pl-[80px] tablet600:pl-[112px]">
        <div className="border border-borderDefault rounded-lg hover:shadow-md">
          <Counter id={id} counterValue={quantity} />
        </div>
        <p
          className="font-medium mobile480:font-normal text-[16px] leading-[22.4px] decoration-textPrimary
        mobile375:font-normal mobile375:text-[14px] mobile375:leading-[19.6px] 
        mobile480:text-[15px] mobile480:leading-[21px]"
        >
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
