'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {
  CartIcon,
  LoopEye,
  Lightning,
  AbsentOrderIcon,
  PreOrderIcon,
  SuccessfulOrderIcon,
} from '@/public/icons';
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
import { postOrder } from '../../services/orderAny';

const Modal = dynamic(() => import('../../components/Modal'), { ssr: false });

const empty = '/empty-img.jpeg';

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
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalOneClickOrder, setShowModalOneClickOrder] = useState(false);
  const [showModalAbsentOrder, setShowModalAbsentOrder] = useState(false);
  const [showModalPreOrder, setShowModalPreOrder] = useState(false);
  const [showModalOrderSuccessful, setShowModalOrderSuccessful] =
    useState(false);
  const isLoading = useSelector(selectIsLoading);
  let arrViewProduct = JSON.parse(
    localStorage.getItem('ProductViewed') || '[]'
  );

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

  function formatPhoneNumber(input) {
    let cleaned = ('' + input).replace(/\D/g, '');
    let formattedNumber = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 3 || i === 6 || i === 8) {
        formattedNumber += ' ';
      }
      formattedNumber += cleaned[i];
    }
    return formattedNumber;
  }

  function displayError(message) {
    errorMessage.textContent = message;
  }

  const replacePhoneNumber = async () => {
    let errorMessage = document.getElementById('errorMessage');
    let phoneNumberInput = document.getElementById('phone');
    phoneNumberInput.addEventListener('input', function (event) {
      let inputPhoneNumber = event.target.value;
      phoneNumberInput.value = formatPhoneNumber(inputPhoneNumber);

      if (event.target.value[0] !== '0') {
        phoneNumberInput.value = inputPhoneNumber.slice(0, 1);
        displayError('Номер телефону має починатись з "0"');
      } else displayError('');
      if (inputPhoneNumber.length > 13) {
        let trimmedPhoneNumber = inputPhoneNumber.slice(0, 13);
        phoneNumberInput.value = trimmedPhoneNumber;
      }
    });
  };

  const handleSubmitOneClickOrder = async event => {
    event.preventDefault();
    replacePhoneNumber();
    const phone = event.target.elements.phone.value;
    const _id = product?._id;
    postOrder(phone.replace(/[ ]/g, ''), _id);
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

  const handleSubmitPreOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    const _id = product?._id;
    // postOrder(phone.replace(/[-]/g, ''), _id);
    setShowModalPreOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  const handleClickOrderSuccessful = async event => {
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
    if (typeof window !== 'undefined') {
      router.push('/');
    }
  };

  return (
    <>
      {product && (
        <div className="container">
          <div className="mt-[130px] mb-5 tablet600:mb-6 flex flex-col tablet600:flex-row gap-5 tablet600:border tablet600:border-borderDefault tablet600:rounded-lg tablet600:py-8 tablet1024:px-5 ">
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
                )}
                {product?.availability === 'під замовлення' && (
                  <button
                    onClick={() => setShowModalPreOrder(!showModalPreOrder)}
                    className="flex justify-center button-secondary lg:px-6 px-3 py-3 text-textBrand text-sm tracking-[-0.21px]"
                  >
                    Зробити передзамовлення
                  </button>
                )}
                {product?.availability === 'відсутній' && (
                  <button
                    onClick={() =>
                      setShowModalAbsentOrder(!showModalAbsentOrder)
                    }
                    className="flex justify-center button-secondary lg:px-6 px-3 py-3 text-textBrand text-sm tracking-[-0.21px]"
                  >
                    Повідомити про наявність
                  </button>
                )}
                {product?.quantity ? (
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
                ) : null}
              </div>
              {/* Modal for click add to cart */}
              {showModalCart && (
                <Modal onClose={() => setShowModalCart(false)}>
                  <div className="w-[200px] h-[100px]">Some content</div>
                </Modal>
              )}
              {/* Modal for One Click Order */}
              {showModalOneClickOrder && (
                <Modal onClose={() => setShowModalOneClickOrder(false)}>
                  <div
                    className="flex flex-col items-center justify-end px-[16px] py-[24px] h-[410px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
                  >
                    <div className="flex items-center justify-center mb-[22px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
                      <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
                        <Lightning width={24} height={24} />
                      </div>
                    </div>
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
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmitOneClickOrder}
                    >
                      <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] decoration-textSecondary">
                        <span className="mb-[4px]">Номер телефону</span>
                        <span className="absolute grid items-center z-10 block top-[34px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
                          +38
                        </span>
                        <input
                          className="p-[10px] pl-[53px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:decoration-textTertiary border-[1px] border-borderDefault rounded-minimal"
                          name="phone"
                          id="phone"
                          type="tel"
                          maxlength="13"
                          pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
                          title="096 123 45 67"
                          autoComplete="off"
                          required
                          onChange={replacePhoneNumber}
                        />
                        <span
                          id="errorMessage"
                          className="text-textWarning"
                        ></span>
                      </label>
                      <button
                        type="submit"
                        className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
                      >
                        Відправити
                      </button>
                    </form>
                  </div>
                </Modal>
              )}
              {/* Modal for Absent Order */}
              {showModalAbsentOrder && (
                <Modal onClose={() => setShowModalAbsentOrder(false)}>
                  <div
                    className="flex flex-col items-center justify-end px-[16px] py-[24px] mobile320:h-[385px] desktop1440:h-[380px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
                  >
                    <div className="flex items-center justify-center mb-[22px] w-[59px] h-[59px] bg-bgErrorLight rounded-[50%]">
                      <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgErrorDark rounded-[50%]">
                        <AbsentOrderIcon width={24} height={24} />
                      </div>
                    </div>
                    <h5
                      className="mb-[12px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
                    >
                      Немає в наявності
                    </h5>
                    <p
                      className="text-center mobile320:mb-[24px] desktop1440:mb-[32px] mobile320:w-[258px] mobile375:w-[315px] desktop1440:w-[632px] mobile320:text-[14px] mobile320:leading-[22px] mobile375:text-[16px] mobile375:leading-[24px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
                    >
                      Введіть адресу своєї пошти, і, як тільки товар з’явиться,
                      Вам прийде лист
                    </p>
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmitAbsentOrder}
                    >
                      <span
                        id="errorMessage"
                        className="text-textWarning"
                      ></span>
                      <input
                        className="mb-[16px] p-[12px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] border-[1px] border-borderDefault rounded-minimal"
                        name="mail"
                        type="email"
                        pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                        title="example@mail.com"
                        required
                      />
                      <button
                        type="submit"
                        className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
                      >
                        Відправити
                      </button>
                    </form>
                  </div>
                </Modal>
              )}
              {/* Modal for Pre Order */}
              {showModalPreOrder && (
                <Modal onClose={() => setShowModalPreOrder(false)}>
                  <div
                    className="flex flex-col items-center justify-end px-[16px] py-[24px] mobile320:h-[431px] desktop1440:h-[408px]
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px] desktop1440:mb-[9px]"
                  >
                    <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[12px] w-[59px] h-[59px] bg-bgBrandLight1 rounded-[50%]">
                      <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgBrandLight2 rounded-[50%]">
                        <PreOrderIcon width={24} height={24} />
                      </div>
                    </div>
                    <h5
                      className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium mobile320:text-[21px] mobile320:leading-[25px] mobile375:text-[24px] mobile375:leading-[28.8px]
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
                    >
                      Передзамовлення товару
                    </h5>
                    <p
                      className="mb-[24px] text-center mobile320:w-[258px] mobile375:w-[300px] desktop1440:w-[500px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
                    >
                      Залиште заявку і наш менеджер зв’яжеться з вами та
                      розповість про умови предзамовлення
                    </p>
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmitPreOrder}
                    >
                      <label className="relative mb-[16px] flex flex-col text-[14px] leading-[19.6px] decoration-textSecondary">
                        <span className="mb-[4px]">Номер телефону</span>
                        <span className="absolute grid items-center z-10 block top-[34px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
                          +38
                        </span>
                        <input
                          className="p-[10px] pl-[53px] mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] placeholder:text-[14px] placeholder:leading-[19.6px] 
                        placeholder:decoration-textTertiary border-[1px] border-borderDefault rounded-minimal"
                          name="phone"
                          type="tel"
                          id="phone"
                          pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
                          title="096 123 45 67"
                          autoComplete="off"
                          required
                          onChange={replacePhoneNumber}
                        />
                        <span
                          id="errorMessage"
                          className="text-textWarning"
                        ></span>
                      </label>
                      <button
                        type="submit"
                        className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
                      >
                        Відправити
                      </button>
                    </form>
                  </div>
                </Modal>
              )}
              {/* Modal for Successful Order*/}
              {showModalOrderSuccessful && (
                <Modal
                  hideCloseBtn
                  onClose={() => setShowModalOrderSuccessful(false)}
                >
                  <div
                    className="flex flex-col items-center justify-center px-[16px] py-[24px] mobile320:h-[278px] desktop1440:h-[380px] 
                mobile320:w-[290px] mobile375:w-[345px] mobile480:w-[432px] tablet600:w-[345px] desktop1440:w-[680px]"
                  >
                    <div className="flex items-center justify-center mobile320:mb-[16px] desktop1440:mb-[8px] w-[59px] h-[59px] bg-bgSuccessLight: rounded-[50%]">
                      <div className="flex items-center justify-center w-[40px] h-[40px] bg-bgSuccessDark rounded-[50%]">
                        <SuccessfulOrderIcon width={24} height={24} />
                      </div>
                    </div>
                    <h5
                      className="mobile320:mb-[12px] desktop1440:mb-[8px] mobile320:font-medium mobile320:text-[24px] mobile320:leading-[28.8px] 
                  desktop1440:font-normal desktop1440:text-[28px] desktop1440:leading-[36.4px] decoration-textPrimary"
                    >
                      {product?.availability !== 'відсутній' ? (
                        <span>Замовлення успішне!</span>
                      ) : (
                        <span>Ваша заявка прийнята!</span>
                      )}
                    </h5>
                    <p
                      className="mobile320:mb-[24px] desktop1440:mb-[32px] text-center mobile320:w-[258px] desktop1440:w-[632px] mobile320:text-[15px] mobile320:leading-[21px] 
                  desktop1440:text-[16px] desktop1440:leading-[24px] decoration-textSecondary"
                    >
                      {product?.availability !== 'відсутній' ? (
                        <span>
                          Очікуйте дзвінка нашого менеджера протягом 5 хвилин
                        </span>
                      ) : (
                        <span>
                          Ми сповістимо Вас, коли товар з'явиться в продажі
                        </span>
                      )}
                    </p>
                    <button
                      type="button"
                      className="mobile320:w-[258px] mobile375:w-[313px] desktop1440:w-[404px] h-[48px] font-medium text-[16px] leading-[22.4px] state-button text-textContrast"
                      onClick={handleClickOrderSuccessful}
                    >
                      Перейти до каталогу
                    </button>
                  </div>
                </Modal>
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
