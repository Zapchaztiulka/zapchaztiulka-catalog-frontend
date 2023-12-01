'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { CartIcon, LoopEye } from '@/public/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectProduct,
} from '@/redux/products/productsSelectors';
import { fetchProductByID } from '@/redux/products/productsOperations';
import { availabilityText, aviabilityType } from '@/helpers/aviabilityProduct';
import {
  mainOptions,
  modalOptions,
  optionThumb,
} from '@/helpers/optionsSlider';
import { getExtension } from '@/helpers/checkExtension';
import ProductInfo from '@/components/Products/ProductInfo';
import RecentlyViewProducts from '@/components/Products/RecentlyViewProducts';
import PopularProducts from '@/components/Products/PopularProducts';

import { CloseModal } from '@/public/icons';

const Modal = dynamic(() => import('../../components/Modal'), { ssr: false });

const empty = '/empty-img.jpeg';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productId = product?._id;
  const [indexThumb, setIndexThumb] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalOneClickOrder, setShowModalOneClickOrder] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  let arrViewProduct = JSON.parse(
    localStorage.getItem('ProductViewed') || '[]'
  );

  useEffect(() => {
    dispatch(fetchProductByID(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productId === id && productId !== null) {
      if (product !== null) {
        arrViewProduct.unshift(product);
      }
      localStorage.setItem(
        'ProductViewed',
        JSON.stringify(arrViewProduct.slice(0, 5))
      );
    }
    return;
  }, [product]);

  const getUniqueViewedProducts = () => {
    if (typeof arrViewProduct != 'undefined' && arrViewProduct != null) {
      const newMap = new Map();
      arrViewProduct?.forEach(item => newMap.set(item?._id, item));
      return [...newMap.values()];
    }
  };
  const productFromLocalStorage = getUniqueViewedProducts();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const mainRef = useRef(null);

  const handleThumbs = id => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
    setIndexThumb(id);
  };

  return (
    <>
      <div className="container">
        <div className="mt-[130px] mb-5 tablet600:mb-6 flex flex-col tablet600:flex-row gap-5 tablet600:border tablet600:border-borderDefault tablet600:rounded-lg tablet600:py-8 tablet1024:px-5 ">
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
                      {' '}
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
            <p className="text-[28px] leading-9 -tracking-[0.42px] text-textPrimary mb-3 tablet600:block hidden">
              {product?.name}
            </p>
            <p className="hidden tablet600:block  tablet600:mb-m desktop1200:mb-m2 text-[15px] desktop1200:text-[16px] text-textTertiary -tracking-[0.225px]">
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
              <button
                onClick={() => setShowModalCart(!showModalCart)}
                className="flex justify-center state-button lg:px-6 px-3 py-3 "
              >
                <div className="flex justify-center products-center gap-xs4">
                  <CartIcon className="w-[24px] h-[24px] fill-iconContrast" />
                  <span className="text-textContrast text-sm tracking-[-0.21px]">
                    Додати в кошик
                  </span>
                </div>
              </button>
              <button
                onClick={() =>
                  setShowModalOneClickOrder(!showModalOneClickOrder)
                }
                className="flex justify-center button-secondary lg:px-6 px-3 py-3 "
              >
                <span className="text-textBrand text-base font-medium tracking-[-0.24px]">
                  Купити в 1 клік
                </span>
              </button>
            </div>
            {/* Modal for click add to cart */}

            {showModalCart && (
              <Modal onClose={() => setShowModalCart(false)}>
                <div className="w-[200px] h-[100px]">Some content</div>
              </Modal>
            )}
            {showModalOneClickOrder && (
              <Modal onClose={() => setShowModalOneClickOrder(false)}>
                <div
                  className="flex flex-col items-center justify-end px-[16px] py-[24px] h-[410px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
                >
                  <CloseModal width={50} height={50} className="mb-[22px]" />
                  <h5
                    className="mb-[12px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
                  >
                    Швидке замовлення
                  </h5>
                  <p
                    className="mobile320:mb-[24px] desktop1440:mb-[32px] text-center mobile320:w-[258px] desktop1440:w-[632px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
                  >
                    Залиште заявку і наш менеджер зв’яжеться з вами!
                  </p>
                  <form className="flex flex-col">
                    <label className="mb-[16px] flex flex-col text-[14px] leading-[19.6px] decoration-textSecondary">
                      <span className="mb-[4px]">Номер телефону</span>
                      <input
                        className="p-[12px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:decoration-textTertiary border-[1px] border-borderDefault rounded-minimal"
                        placeholder="+38"
                      />
                    </label>
                    <button
                      type="submit"
                      className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] bg-bgBrandDark rounded-medium font-medium text-[16px] leading-[22.4px] text-textContrast"
                    >
                      Відправити
                    </button>
                  </form>
                </div>
              </Modal>
            )}
            <ProductInfo product={product} isOpen={isOpen} toggle={toggle} />
          </div>
        </div>
      </div>
      <h2 className="mb-s text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
        Найбільш популярні
      </h2>
      <div className="pl-s mobile480:pl-m tablet1024:px-m desktop1440:px-[120px] desktop1920:px-[207.5px] tablet1024:container tablet1024:flex tablet1024:flex-col tablet1024:products-start mx-auto">
        <PopularProducts />
      </div>
      {productFromLocalStorage.length > 0 && (
        <>
          <h2 className="mb-s mt-6 text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
            Переглянуті товари
          </h2>
          <div className="pl-xs mt-6 tablet600:mt-0 mobile480:pl-m tablet1024:px-m desktop1440:px-[120px] desktop1920:px-[207.5px] tablet1024:container tablet1024:flex tablet1024:flex-col tablet1024:products-start mx-auto">
            <RecentlyViewProducts
              productFromLocalStorage={productFromLocalStorage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
