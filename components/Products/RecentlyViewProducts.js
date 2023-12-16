import { cutProductsViewedArray } from '@/helpers/cutProductsArray';
import { useWindowSize } from '@/hooks/useWindowSize';
import CardItem from '@/components/Products/CardItem';
import React from 'react';

const RecentlyViewProducts = ({ productFromLocalStorage }) => {
  const size = useWindowSize();
  const cuttingProducts = cutProductsViewedArray(productFromLocalStorage, size);

  return (
    <>
      <section className="mb-6 popular-products overflow-x-auto tablet1024:overflow-visible">
        <ul className="flex gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1440:gap-sPlus mb-5">
          {productFromLocalStorage &&
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
      </section>
    </>
  );
};

export default RecentlyViewProducts;
