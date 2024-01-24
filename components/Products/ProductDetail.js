import React, { useContext } from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { getExtension } from '@/helpers/checkExtension';
import { EmptyImageIcon } from 'universal-components-frontend/src/components/icons';
import { LoopEye } from '@/public/icons';
import { availabilityText, aviabilityType } from '@/helpers/aviabilityProduct';

import BtnAddToCart from '@/components/Buttons/BtnAddToCart';
import {
  mainOptions,
  modalOptions,
  optionThumb,
} from '@/helpers/optionsSlider';
import ProductInfo from './ProductInfo';
import MergedModals from '../Modals/MergedModals';
import { StatusContext } from '@/context/statusContext';

const Modal = dynamic(() => import('../Modal'), { ssr: false });

const ProductDetail = ({ product, isOpen, setShowModal, showModal, toggle, mainRef, handleThumbs,indexThumb}) => {

    const {
    showModalPreOrder,
    setShowModalPreOrder,
    setPreOrderId,
    showModalOneClickOrder,
    setShowModalOneClickOrder,
    showModalAbsentOrder,
    setShowModalAbsentOrder,
    } = useContext(StatusContext);
  
  return (
    <>
      {product && (
        <div className="container">
          <div className="mt-[117px] mb-3">
            <Breadcrumbs
              product={product}
              idCategory={product.categories[0]?._id}
              idSubCategory={product.subcategories[0]?._id}
              nameOfCategoryForIDPage={product.categories[0]?.categoryName}
              nameOfSubCategoryForIDPage={
                product.subcategories[0]?.subcategoryName
              }
            />
          </div>
          <div className="mt-2 mb-5 tablet600:mb-6 flex flex-col tablet600:flex-row gap-5 tablet600:border tablet600:border-borderDefault tablet600:rounded-lg tablet600:py-8  tablet600:px-5 ">
            <div className="tablet768:min-h-[650px] tablet600:w-[50%] ">
              <h1 className="text-[28px] leading-9 -tracking-[0.42px] break-words text-textPrimary mb-3 tablet600:hidden">
                {product?.name}
              </h1>
              <p className="mb-s text-[15px] text-textTertiary break-words -tracking-[0.225px] tablet600:hidden">
                Артикул: {product?.vendorCode}
              </p>
              {product && (
                <>
                  <div className="sticky top-[120px]">
                    {product?.photo?.length === 0 ||
                    !getExtension(product?.photo[0]?.url) ? (
                      <div className="product-card-img-byId flex justify-center items-center">
                        <EmptyImageIcon className="" size="big" />
                      </div>
                    ) : (
                      <>
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
                                    getExtension(item.url)
                                      ? `${item.url}`
                                      : { empty }
                                  }
                                  alt={item.alt}
                                  width="0"
                                  height="0"
                                  priority
                                  sizes="100vw"
                                  className="product-card-img-byId"
                                />

                                {/* Modal window - show products`s images */}
                                <div>
                                  {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                      <div className="wrapper-modal-content">
                                        <p className="text-[18px] tablet600:text-[24px] text-center tablet1024:text-[28px] leading-7 -tracking-[0.36px] text-textPrimary mb-[114px] mobile375:mb-[90px]  tablet600:mb-[20px] tablet1024:mb-[40px] ">
                                          {product?.name}
                                        </p>
                                        <Splide options={modalOptions}>
                                          {product?.photo?.map(item => (
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
                                      </div>
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
                                        ? 'border border-borderDefaultBlue rounded-lg'
                                        : 'border-none'
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
              <p className="text-[28px] leading-9 -tracking-[0.42px] text-textPrimary mb-3 tablet600:block hidden break-words">
                {product?.name}
              </p>
              <p className="hidden tablet600:block  tablet600:mb-m desktop1200:mb-m2 text-[15px] desktop1200:text-[16px] text-textTertiary -tracking-[0.225px] break-words">
                Артикул: {product?.vendorCode}
              </p>
              <p className="mb-xs2 font-medium text-textPrimary text-[28px] tablet600:text-m tablet1024:text-[28px]">
                {product?.price?.value} &#8372;
              </p>
              <p
                style={{
                  backgroundColor: `${aviabilityType(product?.availability)}`,
                  color: `${availabilityText(product?.availability)}`,
                  borderColor: `${aviabilityType(product?.availability)}`,
                }}
                className="inline-block text-sm font-medium py-xs3 px-xs2 mb-s border rounded-medium3 text-center"
              >
                {product?.availability}
              </p>
              <div className="flex flex-col gap-3 w-full tablet768:w-[285px] mb-8">
                {product?.availability === 'в наявності' && (
                  <div className="flex justify-center rounded-lg border-borderDefault border-[1px] bg-bgWhite h-[48px]">
                    {product?._id && (
                      <BtnAddToCart
                        id={product?._id}
                        photo={product?.photo}
                        name={product?.name}
                        price={product?.price}
                        vendorCode={product?.vendorCode}
                        visibleCartIcon
                      />
                    )}
                  </div>
                )}
                {product?.availability === 'під замовлення' && (
                  <button
                    onClick={() => {
                      setShowModalPreOrder(!showModalPreOrder);
                      setPreOrderId(product?._id);
                      document.body.classList.add('stop-scrolling');
                    }}
                    className="h-[48px] flex justify-center button-secondary lg:px-6 px-3 py-3 text-textBrand text-sm tracking-[-0.21px]"
                  >
                    Зробити передзамовлення
                  </button>
                )}
                {product?.availability === 'відсутній' && (
                  <button
                    onClick={() => {
                      setShowModalAbsentOrder(!showModalAbsentOrder);
                      document.body.classList.add('stop-scrolling');
                    }}
                    className="h-[48px] flex justify-center button-secondary lg:px-6 px-3 py-3 text-textBrand text-sm tracking-[-0.21px]"
                  >
                    Повідомити про наявність
                  </button>
                )}
                {product?.availability === 'в наявності' ? (
                  <button
                    onClick={() => {
                      setShowModalOneClickOrder(!showModalOneClickOrder);
                      document.body.classList.add('stop-scrolling');
                    }}
                    className="h-[48px] flex justify-center button-secondary lg:px-6 px-3 py-3 "
                  >
                    <span className="text-textBrand text-base font-medium tracking-[-0.24px]">
                      Купити в 1 клік
                    </span>
                  </button>
                ) : null}
              </div>
              {/* Modals */}
              <MergedModals product={product} />
              <ProductInfo product={product} isOpen={isOpen} toggle={toggle} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail
