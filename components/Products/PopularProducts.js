import React from 'react';
import Loader from '../Loader';
import { cutProductsArray } from '@/helpers/cutProductsArray';
import { useWindowSize } from '@/hooks/useWindowSize';
import CardItem from '@/components/Products/CardItem';
import NotFoundProduct from './NotFoundProduct';

const PopularProducts = ({ products, isLoading }) => {
  const size = useWindowSize();
  const cuttingProducts = cutProductsArray(products, size);

  return (
    <>
      <section className="tablet600:mb-0 popular-products overflow-x-auto tablet1024:overflow-visible">
        {isLoading && <Loader />}

        <div className="flex gap-4 mb-5 tablet600:gap-3 tablet1024:gap-4 desktop1440:gap-5 tablet600:mb-5">
          {/* special order 600-1440px */}
          <div className="desktop1920:hidden hidden tablet600:block product-card-popular relative">
            <NotFoundProduct
              containerStyles="containerStylesForIdProduct"
              waveImageStyles="waveImageStylesForIdProduct"
              textStylesForNotFoundProduct=" mt-[151px] desktop1200:mt-[211px] gap-s p-s"
              headStyles="w-[185px] desktop1200:w-[198px] text-lg/[25.2px] mb-2 desktop1200:text-[24px]/[28.8px]"
              textStyles="w-[180px] desktop1200:w-[205px] text-[14px]/[19.6px] desktop1200:text-base/[24px]"
            />
          </div>

          <ul className="flex gap-[7px] tablet600:gap-xs tablet600:max-w-[50%] tablet1024:max-w-none tablet1024:gap-s desktop1440:gap-sPlus">
            {products &&
              cuttingProducts?.map(
                ({ name, _id, photo, price, vendorCode, availability }) => {
                  return (
                    <CardItem
                      key={_id}
                      name={name}
                      id={_id}
                      photo={photo}
                      price={price}
                      vendorCode={vendorCode}
                      availability={availability}
                    />
                  );
                }
              )}
          </ul>

          {/* special order 1920px */}
          <div className="hidden desktop1920:block product-card-popular  hover:shadow-md relative">
            <NotFoundProduct
              containerStyles="containerStylesForIdProduct"
              waveImageStyles="waveImageStylesForIdProduct"
              textStylesForNotFoundProduct=" mt-[151px] desktop1200:mt-[211px] gap-s p-s"
              headStyles="text-lg/[25.2px] mb-2 desktop1200:text-[24px]/[28.8px]"
              textStyles="text-[14px]/[19.6px] desktop1200:text-base/[24px]"
            />
          </div>
        </div>
      </section>

      {/* special order 320-480px */}
      <div className="mt-1 tablet600:hidden h-[196px] w-[288px] mobile375:w-[343px] mobile480:w-[432px]  relative">
        <NotFoundProduct
          containerStyles="containerStyles"
          waveImageStyles="waveImageStyles"
          textStylesForNotFoundProduct="w-[185.22px] mt-[43px] gap-xs py-xs2 px-xs"
          headStyles="text-base/[22.4px] mb-1"
          textStyles="text-[12px]/[18px] "
        />
      </div>
    </>
  );
};

export default PopularProducts;
