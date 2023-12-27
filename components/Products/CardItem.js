'use client';
import { getExtension } from '@/helpers/checkExtension';
import Image from 'next/image';
import Link from 'next/link';
import BtnAddToCart from '../Buttons/BtnAddToCart';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';

const CardItem = ({ name, id, photo, price, vendorCode, availability }) => {
  const { showModalPreOrder, setShowModalPreOrder } = useContext(StatusContext);

  return (
    <li className="relative cards border border-borderDefault rounded-lg hover:shadow-md">
      {availability === 'під замовлення' && (
        <div className="absolute grid items-center text-center z-10 block rounded-[20px] top-[8px] left-[8px] w-[95px] h-[22px] bg-bgWarningDark">
          <span className="text-[10px] leading-[14px] text-textWarning">
            Під замовлення
          </span>
        </div>
      )}
      <Link
        href={{ pathname: `/product/${id}` }}
        className="cursor-pointerblock"
      >
        <div className="">
          <div className="">
            {photo.length === 0 || !getExtension(photo[0]?.url) ? (
              <Image
                src="/empty-img.jpeg"
                alt="no image"
                width="0"
                height="0"
                priority
                sizes="100vw"
                className="product-card-img object-contain"
              />
            ) : (
              <Image
                src={photo[0]?.url}
                alt={photo[0]?.alt}
                width="0"
                height="0"
                placeholder="blur"
                blurDataURL={photo[0]?.url}
                sizes="100vw"
                className="product-card-img object-contain"
              />
            )}
          </div>

          <div className="flex flex-col grow tablet768:px-3 tablet768:pt-2 tablet768:pb-2 p-2 cards">
            <p className="mb-1 tablet768:text-sm text-[10px] text-textTertiary truncate">
              Артикул: {vendorCode}
            </p>
            <h3 className="mobile320:mb-xs tablet600:mb-sPlus desktop1200:mb-m2 text-ellipsis overflow-hidden h-[50px] desktop1200:h-[66px] text-sm/[16.8px] tablet600:text-base/[20.8px] tablet600:h-[63px] desktop1200:text-lg/[21.6px] text-textPrimary">
              {name}
            </h3>
            <p className="font-medium text-textPrimary tablet768:text-2xl/[28.8px] -tracking-[0.36px] text-lg">
              {price.value} &#8372;
            </p>
          </div>
        </div>
      </Link>
      <div className="mobile320:px-2 tablet600:px-3 pb-3">
        {availability === 'в наявності' ? (
          <div className="flex justify-center rounded-lg border-borderDefault border-[1px] bg-bgWhite h-[48px]">
            {id && (
              <BtnAddToCart photo={photo} name={name} price={price} id={id} />
            )}
          </div>
        ) : availability === 'під замовлення' ? (
          <button
            onClick={() => {
              setShowModalPreOrder(!showModalPreOrder);
              document.body.classList.add('stop-scrolling');
            }}
            className="tablet768:px-6 tablet768:py-3 py-2 w-full text-textBrand tablet768:text-base text-sm tablet768:font-medium button-secondary"
          >
            Передзамовити
          </button>
        ) : (
          <button className="disabled-button tablet768:px-6 tablet768:py-3 py-2 w-full text-textDisabled tablet768:text-base text-sm tablet768:font-medium state-button">
            Додати в кошик
          </button>
        )}
      </div>
    </li>
  );
};

export default CardItem;
