import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { LoopEye } from '@/public/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectProduct,
  selectProducts,
} from '@/redux/products/productsSelectors';
import {
  fetchProductByID,
  fetchProducts,
} from '@/redux/products/productsOperations';
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
import { StatusContext } from '@/context/statusContext';
import { EmptyImageIcon } from 'universal-components-frontend/src/components/icons';

import ModalOneClickOrder from '@/components/Modals/ModalOneClickOrder';
import ModalAbsentOrder from '@/components/Modals/ModalAbsentOrder';
import ModalPreOrder from '@/components/Modals/ModalPreOrder';
import ModalOrderSuccessful from '@/components/Modals/ModalOrderSuccessful';
import BtnAddToCart from '@/components/Buttons/BtnAddToCart';
import { Notification } from 'universal-components-frontend/src/components/notifications';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';


const Modal = dynamic(() => import('../../components/Modal'), { ssr: false });

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const data = useSelector(selectProducts);
  const productId = product?._id;
  const [indexThumb, setIndexThumb] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalOneClickOrder, setShowModalOneClickOrder] = useState(false);
  const [showModalAbsentOrder, setShowModalAbsentOrder] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  let arrViewProduct = JSON.parse(
    localStorage.getItem('ProductViewed') || '[]'
  );
  const {
    setCartProducts,
    showModalPreOrder,
    setShowModalPreOrder,
    setPreOrderId,
    showModalOrderSuccessful,
    setShowModalOrderSuccessful,
    showCartNotification,
  } = useContext(StatusContext);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByID(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

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

  const handleSubmitOneClickOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    const _id = product?._id;
    console.log('phone = ', phone);
    // postOrder(phone.replace(/[ ]/g, ''), _id);
    setShowModalOneClickOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  const handleSubmitAbsentOrder = async event => {
    event.preventDefault();
    // mail: event.target.elements.mail.value;
    console.log('E-mail : ', event.target.elements.mail.value);
    setShowModalAbsentOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  // call effect to receive the products from localStorage (cart)
  // useEffect(() => {
  //   const parsedProducts = JSON.parse(localStorage.getItem('cart'));
  //   if (parsedProducts) setCartProducts(parsedProducts);
  // }, []);

  return (
    <>
     <Head>
        <title>{product?.name}</title>
        <meta property="og:description" content={product?.description} />
        <meta name="keywords" content={product?.vendorCode} />
        <meta property="og:title" content={product?.name} />
        <meta name="description" content={product?.description} />
        <meta name="keywords" content={product?.keywords} />

      </Head>
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
                        photo={product?.photo}
                        name={product?.name}
                        price={product?.price}
                        id={product?._id}
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
              {/* Modal for One Click Order */}
              {showModalOneClickOrder && (
                <ModalOneClickOrder
                  onClose={() => setShowModalOneClickOrder(false)}
                  handleSubmitOneClickOrder={handleSubmitOneClickOrder}
                  replacePhoneNumber={replacePhoneNumber}
                />
              )}
              {/* Modal for Pre Order */}
              {showModalPreOrder && (
                <ModalPreOrder onClose={() => setShowModalPreOrder(false)} />
              )}
              {/* Modal for Absent Order */}
              {showModalAbsentOrder && (
                <ModalAbsentOrder
                  onClose={() => setShowModalAbsentOrder(false)}
                  handleSubmitAbsentOrder={handleSubmitAbsentOrder}
                />
              )}
              {/* Modal for Successful Order*/}
              {showModalOrderSuccessful && (
                <ModalOrderSuccessful
                  onClose={() => setShowModalOrderSuccessful(false)}
                  hideCloseBtn
                  availability={product?.availability}
                />
              )}
              {showCartNotification && (
                <Notification
                  message="Товар додано до кошика"
                  className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2"
                  size="small"
                />
              )}
              <ProductInfo product={product} isOpen={isOpen} toggle={toggle} />
            </div>
          </div>
        </div>
      )}

      <h2 className="mb-s text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
        Найбільш популярні
      </h2>
      {data && (
        <div className="pl-s mobile480:pl-m tablet1024:px-m desktop1440:px-[120px] desktop1920:px-[207.5px] tablet1024:container tablet1024:flex tablet1024:flex-col tablet1024:products-start mx-auto">
          <PopularProducts products={data.products} isLoading={isLoading} />
        </div>
      )}
      {productFromLocalStorage.length > 0 && (
        <>
          <h2 className="mb-s mt-6 tablet600:mt-0 text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
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
