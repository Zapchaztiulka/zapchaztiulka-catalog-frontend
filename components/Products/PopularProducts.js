import React, { useEffect } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectProducts,
} from "@/redux/products/productsSelectors";
import { cutArticle, cutText, cutProductsArray } from "@/helpers/cutTiext";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/redux/products/productsOperations";
import { getExtension } from "@/helpers/checkExtension";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ArrowRight } from "@/public/icons";
import SpecialProduct from "./SpecialProduct";

const PopularProducts = () => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const data = useSelector(selectProducts);
  const products = data?.products;
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cuttingProducts = cutProductsArray(products, size);

  return (
    <>
      <section className="mb-6 popular-products overflow-x-auto tablet1024:overflow-visible">
        {isLoading && data.length === 0 && <Loader />}

        <div className="flex gap-4 tablet600:gap-3 tablet1024:gap-4 desktop1440:gap-5">
          
          {/* special order 600-1440px */}
          <div className="desktop1920:hidden hidden tablet600:block product-card-popular border border-borderDefault rounded-lg hover:shadow-md relative">
            <SpecialProduct />
          </div>

          <ul className="flex gap-[7px] tablet600:gap-xs tablet600:max-w-[50%] tablet1024:max-w-none tablet1024:gap-s desktop1440:gap-sPlus">
            {cuttingProducts?.map(({ name, _id, photo, price, vendorCode }) => {
              return (
                <li
                  className="product-card-popular border border-borderDefault rounded-lg hover:shadow-md cursor-pointer"
                  key={_id}
                >
                  <Link href={{ pathname: `/product/${_id}` }}>
                    <div className="product-card-popular">
                      <div className="w-full">
                        {photo.length === 0 || !getExtension(photo[0]?.url) ? (
                          <Image
                            src="/empty-img.jpeg"
                            alt="no image"
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="product-card-popular rounded-t-lg object-contain mobile320:h-[111px] tablet600:h-[150px] desktop1200:h-[190px]"
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
                        <p className="mb-1 tablet768:text-sm text-[10px] text-textTertiary">
                          Артикул: {cutArticle(vendorCode)}
                        </p>
                        <h3 className="mobile320:mb-xs tablet600:mb-sPlus desktop1200:mb-m2 overflow-y-hidden mobile320:h-[58px] tablet600:h-[70px] tablet1024:h-[78px] desktop1200:h-[78px] mobile320:text-sm tablet600:text-base desktop1200:text-lg text-textPrimary">
                          {cutText(name)}
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
            })}
          </ul>

          {/* special order 1920px */}
          <div className="hidden desktop1920:block product-card-popular border border-borderDefault rounded-lg hover:shadow-md relative">
            <SpecialProduct />
          </div>
        </div>
      </section>

       {/* special order 320-480px */}
      <div className=" tablet600:hidden h-[196px] w-[288px] mobile375:w-[343px] mobile480:w-[432px] border border-borderDefault rounded-lg relative">
        <SpecialProduct />
      </div>
    </>
  );
};

export default PopularProducts;
