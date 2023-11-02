"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { ArrowDown, ArrowUp, CartIcon, LoopEye } from "@/public/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "@/redux/products/productsSelectors";
import { fetchProductByID } from "@/redux/products/productsOperations";
import { availabilityText, aviabilityType } from "@/helpers/aviabilityProduct";
import Modal from "@/components/Modal";
import {
  mainOptions,
  modalOptions,
  optionThumb,
} from "@/helpers/optionsSlider";
import { getExtension } from "@/helpers/checkExtension";

const empty = "/empty-img.jpeg"

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [indexThumb, setIndexThumb] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
   dispatch(fetchProductByID(id));
    }
 
  }, [dispatch, id]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
    setIndexThumb(id);
  };

  console.log(product);

  return (
    <div className="mt-[130px] mb-[50px] flex flex-col tablet600:flex-row gap-5 tablet600:border tablet600:border-borderDefault tablet600:rounded-lg py-8 px-5">
      <div className="tablet768:min-h-[650px] tablet600:w-[50%] ">
        <h1 className="text-[28px] leading-9 -tracking-[0.42px] text-textPrimary mb-3 tablet600:hidden">
          {product?.name}
        </h1>
        <p className="mb-s text-[15px] text-textTertiary -tracking-[0.225px] tablet600:hidden">
          Артикул: {product?.vendorCode}
        </p>
        {product && (
          <>
            <div className="sticky top-[120px]">
              {product?.photo?.length === 0 ||
              !getExtension(product?.photo[0]?.url) ? (
                <Image
                  src="/empty-img.jpeg"
                  alt="no image"
                  className="product-card-img-byId"
                  width="0"
                  height="0"
                  priority
                  sizes="100vw"
                />
              ) : (
                <>
                  {" "}
                  <div className="custom-class-slide relative">
                    <div className="absolute right-[40px] top-[10px] z-10">
                      <button onClick={() => setShowModal(!showModal)}>
                        <LoopEye height="18" width="18" />
                      </button>
                    </div>
                    <Splide options={mainOptions} ref={mainRef}>
                      {product?.photo?.map((item, i) => (
                        <SplideSlide key={item._id}>
                          <Image
                            src={
                              getExtension(item.url) ? `${item.url}` : { empty }
                            }
                            alt={item.alt}
                            width="0"
                            height="0"
                            priority
                            sizes="100vw"
                            className="product-card-img-byId"
                          />

                          {/* Modal window */}
                          <div>
                            {showModal && (
                              <Modal onClose={() => setShowModal(false)}>
                                <p className="text-[18px] tablet600:text-[24px] tablet1024:text-[28px] leading-7 -tracking-[0.36px] text-textPrimary mb-[114px] mobile375:mb-[90px]  tablet600:mb-[20px] tablet1024:mb-[40px] ">
                                  {product?.name}
                                </p>
                                <Splide options={modalOptions}>
                                  {product?.photo?.map((item) => (
                                    <SplideSlide key={item._id}>
                                      <Image
                                        src={
                                          getExtension(item.url)
                                            ? `${item.url}`
                                            : { empty }
                                        }
                                        alt={item.alt}
                                        width="0"
                                        height="0"
                                        priority
                                        sizes="100vw"
                                        className="product-card-img-modal"
                                      />
                                    </SplideSlide>
                                  ))}
                                </Splide>
                              </Modal>
                            )}
                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                  <div className="hidden tablet600:block custom-class-slide-thumbs">
                    <Splide options={optionThumb}>
                      {product?.photo?.map((thumbnail, index) => (
                        <SplideSlide key={thumbnail._id}>
                          <button onClick={() => handleThumbs(index)}>
                            <Image
                              src={
                                getExtension(thumbnail.url)
                                  ? `${thumbnail.url}`
                                  : { empty }
                              }
                              alt="product thumbnail"
                              width="0"
                              height="0"
                              priority
                              sizes="100vw"
                              className={`${
                                indexThumb === index
                                  ? "border border-borderDefaultBlue rounded-lg"
                                  : "border-none"
                              } w-[78px] h-[52px] tablet768:w-[114px] tablet768:h-[76px] desktop1200:w-[134px] desktop1200:h-[90px] cursor-pointer object-contain overflow-hidden m-1`}
                            />
                          </button>
                        </SplideSlide>
                      ))}
                    </Splide>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="tablet600:w-[50%] ">
        <p className="text-[28px] leading-9 -tracking-[0.42px] text-textPrimary mb-3 tablet600:block hidden">
          {product?.name}
        </p>
        <p className="hidden tablet600:block  tablet600:mb-m desktop1200:mb-m2 text-[15px] desktop1200:text-[16px] text-textTertiary -tracking-[0.225px]">
          Артикул: {product?.vendorCode}
        </p>
        <p className="mb-xs2 font-medium text-textPrimary text-[28px] tablet600:text-m tablet1024:text-[28px]">
          {product?.price.value} &#8372;
        </p>

        <p
          style={{
            backgroundColor: `${aviabilityType(product?.availability)}`,
            color: `${availabilityText(product?.availability)}`,
            borderColor: `${aviabilityType(product?.availability)}`,
          }}
          className="inline-block text-sm font-medium py-xs3 px-xs mb-s border rounded-medium3 text-center"
        >
          {product?.availability}
        </p>

        <div className="flex flex-col gap-3 w-full tablet768:w-[285px] mb-8">
          <button className="flex justify-center state-button lg:px-6 px-3 py-3 ">
            <div className="flex justify-center items-center gap-xs4">
              <CartIcon className="w-[24px] h-[24px] fill-iconContrast" />
              <span className="text-textContrast text-sm tracking-[-0.21px]">
                Додати в кошик
              </span>
            </div>
          </button>
          <button className="flex justify-center button-secondary lg:px-6 px-3 py-3 ">
            <span className="text-textBrand text-base font-medium tracking-[-0.24px]">
              Купити в 1 клік
            </span>
          </button>
        </div>

        <section className="mb-8">
          <h3 className="mb-3 text-lg desktop1200:text-xl text-textPrimary font-medium">
            Основні характеристики:
          </h3>
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
        {product?.description!==" " && <>
        <h4 className="mb-3">Опис</h4>
          <p className="text-base text-textPrimary">{product?.description}</p>
        </>}
        
      </div>
    </div>
  );
};

export default ProductDetails;

//  <Link href={{ pathname: "/cart" }}>
//               Go to the cart
//             </Link>
