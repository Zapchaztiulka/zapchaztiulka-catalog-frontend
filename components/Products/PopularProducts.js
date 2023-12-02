import React from 'react';
import Loader from '../Loader';
import { cutProductsArray } from '@/helpers/cutProductsArray';
import Image from 'next/image';
import Link from 'next/link';
import { getExtension } from '@/helpers/checkExtension';
import { useWindowSize } from '@/hooks/useWindowSize';
import SpecialProduct from './SpecialProduct';

const PopularProducts = ({ products, isLoading }) => {
  const size = useWindowSize();

  const cuttingProducts = cutProductsArray(products, size);

  return (
    <>
      <section className="tablet600:mb-0 popular-products overflow-x-auto tablet1024:overflow-visible">
        {isLoading && products.length === 0 && <Loader />}

        <div className="flex gap-4 mb-5  tablet600:gap-3 tablet1024:gap-4 desktop1440:gap-5 tablet600:mb-5">
          {/* special order 600-1440px */}
          <div className="desktop1920:hidden hidden tablet600:block product-card-popular relative">
            <SpecialProduct />
          </div>

          <ul className="flex gap-[7px] tablet600:gap-xs tablet600:max-w-[50%] tablet1024:max-w-none tablet1024:gap-s desktop1440:gap-sPlus">
            {products && cuttingProducts?.map(
              ({ name, _id, photo, price, vendorCode }) => {
                return (
                  <li key={_id}>
                    <Link href={{ pathname: `/product/${_id}` }}>
                      <div className="product-card-popular hover:shadow-md cursor-pointer border border-borderDefault rounded-lg">
                        <div className="w-full">
                          {photo.length === 0 ||
                          !getExtension(photo[0]?.url) ? (
                            <Image
                              src="/empty-img.jpeg"
                              alt="no image"
                              width="0"
                              height="0"
                              sizes="100vw"
                              className="product-card-popular  rounded-t-lg object-contain mobile320:h-[111px] tablet600:h-[150px] desktop1200:h-[190px]"
                            />
                          ) : (
                            <Image
                              src={photo[0]?.url}
                              alt={photo[0]?.alt}
                              width="0"
                              height="0"
                              priority
                              sizes="100vw"
                              className="mobile320:h-[111px] tablet600:h-[150px] desktop1200:h-[190px] product-card-popular rounded-t-lg object-contain"
                            />
                          )}
                        </div>

                        <div className="flex flex-col grow tablet768:px-3 tablet768:pt-2 tablet768:pb-3 p-2">
                          <p className="mb-1 tablet768:text-sm text-[10px] text-textTertiary truncate">
                            Артикул: {vendorCode}
                          </p>
                          <h3 className="mobile320:mb-xs tablet600:mb-sPlus desktop1200:mb-m2 text-ellipsis overflow-hidden h-[50px] desktop1200:h-[66px] text-sm/[16.8px] tablet600:text-base/[20.8px] tablet600:h-[63px] desktop1200:text-lg/[21.6px] text-textPrimary">
                            {name}
                          </h3>
                          <p className="tablet768:mb-2 mb-1 font-medium text-textPrimary tablet768:text-2xl text-lg">
                            {price.value} &#8372;
                          </p>

                          <div>
                            <button className="tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
                              Додати в кошик
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>

          {/* special order 1920px */}
          <div className="hidden desktop1920:block product-card-popular  hover:shadow-md relative">
            <SpecialProduct />
          </div>
        </div>
      </section>

      {/* special order 320-480px */}
      <div className="mt-1 tablet600:hidden h-[196px] w-[288px] mobile375:w-[343px] mobile480:w-[432px] border border-borderDefault rounded-lg relative">
        <SpecialProduct />
      </div>
    </>
  );
};

export default PopularProducts;
