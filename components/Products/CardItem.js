'use client';
import { getExtension } from '@/helpers/checkExtension';
import Image from 'next/image';
import Link from 'next/link';
import BtnAddToCart from '../Buttons/BtnAddToCart';
import { useContext, useState } from 'react';
import { StatusContext } from '@/context/statusContext';
import {
  EmptyImageIcon,
  LoadingIcon,
} from 'universal-components-frontend/src/components/icons';
import { useWindowSize } from '@/hooks/useWindowSize';

const CardItem = ({ id, name, photo, price, vendorCode, availability }) => {
  const {
    showModalPreOrder,
    setShowModalPreOrder,
    setPreOrderId,
    setShowModalAbsentOrder,
    showModalAbsentOrder,
    aviabilityProduct, setAviabilityProduct
  } = useContext(StatusContext);
  const [loadingImage, setLoadingImage] = useState(true);
  const onImageLoad = () => {
    setLoadingImage(false);
  };

   const size = useWindowSize()

  return (
    <li className="relative cards border border-borderDefault rounded-lg hover:shadow-md">
      {availability === 'під замовлення' && (
        <div className="absolute grid items-center text-center z-9 rounded-[20px] top-[8px] left-[8px] w-[95px] h-[22px] bg-bgWarningDark">
          <span className="text-[10px] leading-[14px] text-textWarning">
            Під замовлення
          </span>
        </div>
      )}
      {availability === 'відсутній' && (
        <div className="absolute grid items-center text-center z-9 rounded-[20px] top-[8px] left-[8px] w-[70px] h-[22px] bg-bgErrorDark">
          <span className="text-[10px] leading-[14px] text-textError">
            Відсутній
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
              <div className="product-card-img object-contain flex justify-center items-center">
                <EmptyImageIcon className="w-[64px] h-[64px] tablet600:w-[88px] tablet600:h-[88px] desktop1200:w-[103px] desktop1200:h-[102px]" />
              </div>
            ) : (
              <>
                <div
                  style={{ display: loadingImage ? 'flex' : 'none' }}
                  className="product-card-img object-contain flex justify-center items-center"
                >
                  <LoadingIcon size="54" />
                </div>
                <Image
                  src={photo[0]?.url}
                  alt={photo[0]?.alt}
                  width="0"
                  height="0"
                  priority={photo ? true : false}
                  quality={70}
                  onLoad={onImageLoad}
                  sizes="100vw"
                  className="product-card-img object-contain"
                  style={{ display: loadingImage ? 'none' : 'block' }}
                />
              </>
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
        {availability === 'в наявності' && (
          <div className="flex justify-center ">
            {id && (
              <BtnAddToCart
                id={id}
                photo={photo}
                name={name}
                price={price}
                vendorCode={vendorCode}
              />
            )}
          </div>
        )}
        {availability === 'під замовлення' && (
          <button
            onClick={() => {
              setShowModalPreOrder(!showModalPreOrder);
              setPreOrderId(id);
              document.body.classList.add('stop-scrolling');
            }}
            className="tablet600:py-[11px] py-[7px] text-center w-full text-[14px]/[24px] tablet600:text-base/[24px] text-textBrand button-secondary"
          >
            Передзамовити
          </button>
        )}
        {availability === 'відсутній' && (
          <button
            onClick={() => {
              setShowModalAbsentOrder(!showModalAbsentOrder);
              setAviabilityProduct(availability)
              setPreOrderId(id);
              document.body.classList.add('stop-scrolling');
            }}
            className="tablet600:py-[11px] py-[7px] text-center w-full text-[14px]/[24px] tablet600:text-base/[24px] text-textBrand button-secondary"
          >
            {size >= 1200 ? 'Повідомити про наявність' : 'Повідомити'}
          </button>
        )}
      </div>
    </li>
  );
};

export default CardItem;
