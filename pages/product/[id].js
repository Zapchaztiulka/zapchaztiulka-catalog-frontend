"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


import { ArrowDown, ArrowUp, CartIcon, EllipsePagination } from "@/public/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "@/redux/products/productsSelectors";
import { fetchProductByID } from "@/redux/products/productsOperations";
import { availabilityText, aviabilityType } from "@/helpers/aviabilityProduct";


const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [index, setIndex] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(0);
 

  useEffect(() => {
        dispatch(fetchProductByID(id));
    }, [dispatch, id]);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const mainOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    height: "382px",
  };

  const optionThumb = {
    type: "slide",
    arrows: false,
    perPage: 4,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    height: "90px",
  }

  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };


  return (
    <div className="mt-[130px] mb-[50px] flex gap-5 border border-borderDefault rounded-lg py-8 px-5">
      <div className="md:h-[382px] md:w-[50%] ">
        {product && (
          <>
            <div>
              {product.photo.length === 0 ? (
                <Image
                  src="/empty-img.jpeg"
                  alt="no image"
                  className="md:h-[382px] md:w-[570px] object-contain"
                  width="0"
                  height="0"
                  priority
                  sizes="100vw"
                />
              ) : (
                <>
                  {" "}
                  <Splide options={mainOptions} ref={mainRef}>
                    {product.photo?.map((item, i) => (
                      <SplideSlide key={item._id}>
                        <Image
                          src={item.url}
                          alt={item.alt}
                          width="0"
                          height="0"
                          priority
                          sizes="100vw"
                          className="md:h-[382px] md:w-[570px] object-contain"
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                  <ul className="flex justify-center items-center mt-1">
                    {product.photo?.map((thumbnail, index) => (
                      <li key={thumbnail._id}>
                        <button
                          onClick={() => handleThumbs(index)}
                          className="pagination-btn"
                        >
                          <EllipsePagination
                            width="12"
                            height="12"
                            className="m-1 cursor-pointer ellipse-icon fill-iconSecondary active:fill-iconBrand"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Splide options={optionThumb}>
                    {product.photo?.map((thumbnail, index) => (
                      <SplideSlide key={thumbnail._id}>
                        <button onClick={() => handleThumbs(index)}>
                          <Image
                            src={thumbnail.url}
                            alt="product thumbnail"
                            width="0"
                            height="0"
                            priority
                            sizes="100vw"
                            className="w-[134px] h-[90px] cursor-pointer object-contain overflow-hidden m-1"
                          />
                        </button>
                      </SplideSlide>
                    ))}
                  </Splide>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="md:w-[50%] ">
        <h1 className="mb-3">{product?.name}</h1>
        <p className="mb-8 md:text-sm text-[10px] text-textTertiary">
          Артикул: {product?.vendorCode}
        </p>
        <p className="md:mb-xs2 mb-1 font-medium text-textPrimary md:text-2xl text-lg">
          {product?.price.value} &#8372;
        </p>

        <p
          style={{
            backgroundColor: `${aviabilityType(product?.availability)}`,
            color: `${availabilityText(product?.availability)}`,
            padding: "6px",
            marginBottom: "16px",
          }}
          className="inline-block text-sm font-medium py-xs3 px-xs mb-s border rounded-borderRadius-medium3 text-center"
        >
          {product?.availability}
        </p>

        <div className="flex flex-col gap-3 w-[237px] mb-8">
          <button className="hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3 ">
            <div className="flex justify-center items-center">
              <CartIcon className="w-[24px] h-[24px] fill-iconContrast" />
              <span className="text-textContrast text-sm tracking-[-0.21px]">
                Додати в кошик
              </span>
            </div>
          </button>
          <button className="hidden md:flex md:justify-between button-secondary lg:px-6 px-3 py-3 ">
            <span className="text-textBrand text-base font-medium tracking-[-0.24px]">
              Купити в 1 клик
            </span>
          </button>
        </div>

        <section className="mb-8">
          <h3 className="mb-3">Основні характеристики:</h3>
          <div className="characteristic">
            <span className="characteristic-label">Вага (кг):</span>
            <span className="characteristic-value">{product?.weight}</span>
          </div>
          <div className="characteristic">
            <span className=" characteristic-label">Код:</span>
            <span className="characteristic-value">{product?.weight}</span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Виробник:</span>
            <span className="characteristic-value">
              {product?.manufacturer.trademark}
            </span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Країна:</span>
            <span className="characteristic-value">{product?.weight}</span>
          </div>

          {isOpen && (
            <>
              <div className="characteristic">
                <span className="characteristic-label">Вага (кг):</span>
                <span className="characteristic-value">nnn</span>
              </div>
              <div className="characteristic">
                <span className=" characteristic-label">Код:</span>
                <span className="characteristic-value">bbb</span>
              </div>
              <div className="characteristic">
                <span className="characteristic-label">Виробник:</span>
                <span className="characteristic-value">ddd</span>
              </div>
              <div className="characteristic">
                <span className="characteristic-label">Країна:</span>
                <span className="characteristic-value">ddd</span>
              </div>
            </>
          )}
          {!isOpen ? (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center py-[9px] cursor-pointer border-none active:bg-bgPressedGrey"
            >
              <span className="text-base text-textBrand font-medium">
                Усі характеристик
              </span>
              <ArrowDown className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center py-[9px] cursor-pointer border-none active:bg-bgPressedGrey"
            >
              <span className="text-base text-textBrand font-medium">
                Приховати
              </span>
              <ArrowUp className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
            </button>
          )}
        </section>

        <h4 className="mb-3">Опис</h4>
        <p className="text-base text-textPrimary">{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

//  <Link href={{ pathname: "/cart" }}>
//               Go to the cart
//             </Link>