import React from 'react';
import Loader from '../Loader';
import { cutProductsArray } from '@/helpers/cutProductsArray';
import { useWindowSize } from '@/hooks/useWindowSize';
import SpecialProduct from './SpecialProduct';
import CardItem from '@/components/Products/CardItem';

const PopularProducts = ({ products, isLoading }) => {
  const size = useWindowSize();
  const cuttingProducts = cutProductsArray(products, size);

  return (
    <>
      <section className="tablet600:mb-0 popular-products overflow-x-auto tablet1024:overflow-visible">
        {isLoading && <Loader />}

        <div className="flex gap-4 mb-5  tablet600:gap-3 tablet1024:gap-4 desktop1440:gap-5 tablet600:mb-5">
          {/* special order 600-1440px */}
          <div className="desktop1920:hidden hidden tablet600:block product-card-popular relative">
            <SpecialProduct />
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
