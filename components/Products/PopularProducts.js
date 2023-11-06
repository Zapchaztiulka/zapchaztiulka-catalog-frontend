import React, { useEffect } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectProducts,
} from "@/redux/products/productsSelectors";
import { cutArticle, cutText, cutProductsArray} from "@/helpers/cutTiext";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/redux/products/productsOperations";
import { getExtension } from "@/helpers/checkExtension";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ArrowRight } from "@/public/icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


const PopularProducts = () => {
   const dispatch = useDispatch();
   const size = useWindowSize()
  const data = useSelector(selectProducts);
  const products = data?.products;
  const isLoading = useSelector(selectIsLoading);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
   
   const cuttingProducts = (cutProductsArray(products, size))
   
   const options = {
  type: "slide",
  arrows: false,
  perPage: 2,
  perMove: 1,
  gap: "10px",
  pagination: false,
      mediaQuery: "min",
  drag: true,
  breakpoints: {
    600: {
      height: "57px",
    },
    768: {
      height: "80px",
    },
    1200: {
      height: "94px",
    },
    1920: {
      perPage: 4,
    },
  },
};

  return (
    <section className="mb-6">
      {isLoading && data.length === 0 && <Loader />}

      <div className="flex gap-4">
        <div className="product-card relative">
          <div className="w-full z-10">
            <Image
              src="/special-product-desktop.jpg"
              alt="special order"
              width="0"
              height="0"
              sizes="100vw"
              className="product-card-img object-cover"
            />
          </div>
          <div className="test"></div>
          <div className=" flex flex-col grow px-s pt-6 pb-[15px] mb-s relative">
            <p className="mb-2 text-lg/[25.2px] textPrimary text-medium">
              Не знайшли потрібний товар?
            </p>
            <p className="text-textSecondary text-sm/[19.6px]">
              Розкажіть, що ви шукаєте, а ми спробуємо доставити.
            </p>
          </div>

          <button
            type="button"
            className="mb-4 relative flex items-center py-xs2 px-s gap-1 cursor-pointer border-none active:bg-bgPressedGrey"
          >
            <span className="text-base text-textBrand font-medium">
              Дізнатись більше
            </span>
            <ArrowRight className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
          </button>
        </div>

        {/* Popular products */}

        <Splide options={options} className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center">
          {cuttingProducts?.map(({ name, _id, photo, price, vendorCode }) => {
            return (
              <SplideSlide className="product-card cursor-pointer" key={_id}>
                <Link href={{ pathname: `/product/${_id}` }}>
                  <div className="embla__slide">
                    <div className="w-full">
                      {photo.length === 0 || !getExtension(photo[0]?.url) ? (
                        <Image
                          src="/empty-img.jpeg"
                          alt="no image"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="product-card-img object-contain"
                        />
                      ) : (
                        <Image
                          src={photo[0]?.url}
                          alt={photo[0]?.alt}
                          width="0"
                          height="0"
                          priority
                          sizes="100vw"
                          className="product-card-img object-contain"
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
                        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
                          Додати в кошик
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
        {/* <ul
          className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center"
          
        >
          {cuttingProducts?.map(({ name, _id, photo, price, vendorCode }) => {
            return (
              <li
                className="product-card cursor-pointer"
                key={_id}
              >
                <Link href={{ pathname: `/product/${_id}` }}>
                  <div className="embla__slide">
                    <div className="w-full">
                      {photo.length === 0 || !getExtension(photo[0]?.url) ? (
                        <Image
                          src="/empty-img.jpeg"
                          alt="no image"
                          width="0"
                          height="0"
                          sizes="100vw"
                          className="product-card-img object-contain"
                        />
                      ) : (
                        <Image
                          src={photo[0]?.url}
                          alt={photo[0]?.alt}
                          width="0"
                          height="0"
                          priority
                          sizes="100vw"
                          className="product-card-img object-contain"
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
                        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
                          Додати в кошик
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul> */}
      </div>
    </section>
  );
};

export default PopularProducts;

