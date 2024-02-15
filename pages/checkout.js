import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { useContext, useState, useEffect } from 'react';
import { StatusContext } from '@/context/statusContext';
import Settlelement from '@/components/Orders/Settlelement';
import TotalOrder from '@/components/Orders/TotalOrder';
import Legal from '@/components/Orders/EntityType/Legal';
import Individual from '@/components/Orders/EntityType/Individual';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/redux/cart/cartSelector';
import { fetchOrders } from '@/redux/orders/ordersOperations';
import CommentOrder from '@/components/Orders/CommentOrder';
import { clearTheCart } from '@/redux/cart/cartSlice';
import { ModalOrderSuccessful } from '@/components';
import { Button } from 'universal-components-frontend/src/components/buttons';
import { selectPatterns } from '@/redux/patterns/patternsSelectors';
import {
  addToCheckoutLegal,
  clearCheckoutLegal,
} from '@/redux/checkout/LegalPerson/legalSlice';
import DeliveryComponents from '@/components/Orders/DeliveryComponents/DeliveryComponents';
import { scrollToTop } from '@/helpers/scrollToTop';
import {
  selectCheckout,
  selectCheckoutLegal,
} from '@/redux/checkout/checkoutSelector';
import {
  addToCheckout,
  clearCheckout,
} from '@/redux/checkout/IndividualPerson/checkoutSlice';

const Сheckout = () => {
  const orderInfoTotal = useSelector(selectCart);
  const dispatch = useDispatch();
  const orderInfoData = orderInfoTotal?.data;
  const userData = useSelector(selectCheckout);
  const userLegalData = useSelector(selectCheckoutLegal);
  const {
    phone,
    email,
    username,
    userSurname,
    userMiddleName,
    deliveryMethodId,
    deliveryOffice,
    deliverySelf,
    userComment,
    deliveryCity,
    deliveryAddress,
    deliveryAddressNP,
  } = userData;
  const {
    emailLegal,
    phoneLegal,
    usernameLegal,
    userSurnameLegal,
    userMiddleNameLegal,
    userTypeLegal,
    legalEntityData: {
      companyName,
      companyCode,
      entrepreneurCode,
      companyRegion,
      companyCity,
      companyAddress,
    },
    deliveryMethodIdLegal,
    deliveryOfficeLegal,
    deliverySelfLegal,
    deliveryCityLegal,
    deliveryAddressLegal,
    deliveryAddressLegalNP,
    userCommentLegal,
  } = userLegalData;

  const patterns = useSelector(selectPatterns);
  const min = patterns?.min;
  const max = patterns?.max;

  const productsInfo = orderInfoData?.map(item => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  const {
    setShowModalCart,
    showModalOrderSuccessful,
    setShowModalOrderSuccessful,
    aviabilityProduct,
    backToHomeUrl,
  } = useContext(StatusContext);

  const [isClientStatus, setIsClientStatus] = useState(true);
  const [isLegalPerson, setIsLegalPerson] = useState('ФОП');
  const [cityDelivery, setCityDelivery] = useState(
    isClientStatus ? deliveryCity || '' : deliveryCityLegal || ''
  );
  const [selfAddress, setSelfAddress] = useState(
    isClientStatus ? deliverySelf || '' : deliverySelfLegal || ''
  );
  const [addressDelivery, setAddressDelivery] = useState(
    isClientStatus ? deliveryAddress || '' : deliveryAddressLegal || ''
  );
  const [addressDeliveryNP, setAddressDeliveryNP] = useState(
    isClientStatus ? deliveryAddressNP || '' : deliveryAddressLegalNP || ''
  );
  const [warehouses, setWarehouses] = useState(
    isClientStatus ? deliveryOffice || '' : deliveryOfficeLegal || ''
  );
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isEmptyDataIndividual, setIsEmptyDataIndividual] = useState(false);

  const [isEmptyDataLegal, setIsEmptyDataLegal] = useState(false);

  const [selectedDelivery, setSelectedDelivery] = useState(
    isClientStatus ? deliveryMethodId || '' : deliveryMethodIdLegal || ''
  );

  useEffect(() => {
    if (isClientStatus) {
      setCityDelivery(deliveryCity);
    }
    if (!isClientStatus) {
      setCityDelivery(deliveryCityLegal);
    }
  }, [deliveryCity, deliveryCityLegal, isClientStatus]);

  const handleCitySelection = cityDeliverRef => {
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'selectedCityLegal',
          value: cityDeliverRef,
        })
      );
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'selectedCity', value: cityDeliverRef }));
    }
  };

  const handleStreetSelection = cityRef => {
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'cityRefLegal', value: cityRef }));
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'cityRef', value: cityRef }));
    }
  };

  const handleCityChange = newCity => {
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'deliveryCityLegal', value: newCity })
      );
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryCity', value: newCity }));
    }
  };

  const handleWarehouseChange = warehouse => {
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({ field: 'deliveryOfficeLegal', value: warehouse })
      );
    }
    if (isClientStatus) {
      dispatch(addToCheckout({ field: 'deliveryOffice', value: warehouse }));
    }
  };

  const handleDeliveryChange = event => {
    const selectedDeliveryValue = event.target.value;
    setSelectedDelivery(selectedDeliveryValue);
    if (!isClientStatus) {
      dispatch(
        addToCheckoutLegal({
          field: 'deliveryMethodIdLegal',
          value: selectedDeliveryValue,
        })
      );
    }
    if (isClientStatus) {
      dispatch(
        addToCheckout({
          field: 'deliveryMethodId',
          value: selectedDeliveryValue,
        })
      );
    }
    setIsErrorMessage(false);
  };

  // Скидання обраного методу доставки при зміні вибору
  useEffect(() => {
    if (!isClientStatus) {
      setSelectedDelivery(deliveryMethodIdLegal || null);
    }
    if (isClientStatus) {
      setSelectedDelivery(deliveryMethodId || null);
    }
  }, [deliveryMethodId, deliveryMethodIdLegal, isClientStatus]);

  //Валідація довжини значень властивостей в тілі запиту
  const userNameLength =
    username.length < min.user || username.length > max.user;
  const userMiddleNameLength =
    userMiddleName.length < min.user || userMiddleName.length > max.user;
  const userSurNameLength =
    userSurname.length < min.user || userSurname.length > max.user;
  const userCommentLength =
    userComment.length < min.description ||
    userComment.length > max.description;

  const userNameLegalLength =
    usernameLegal?.length < min.user || usernameLegal?.length > max.user;
  const userNameMiddleLegalLength =
    userMiddleNameLegal?.length < min.user ||
    userMiddleNameLegal?.length > max.user;
  const userSurNameLegalLength =
    userSurnameLegal?.length < min.user || userSurnameLegal?.length > max.user;
  const userCommentLegalLength =
    userCommentLegal?.length < min.description ||
    userCommentLegal?.length > max.description;
  const companyAddressLength =
    companyAddress?.length < min.companyAddress ||
    companyAddress?.length > max.companyAddress;

  // перевірка пустоти та валідації даних для фізичних осіб
  const isFormValid = () => {
    if (isClientStatus) {
      if (
        phone === '' ||
        email === '' ||
        username === '' ||
        userSurname === '' ||
        deliveryCity === '' ||
        userNameLength ||
        userSurNameLength ||
        (userMiddleName !== '' && userMiddleNameLength) ||
        (userComment !== '' && userCommentLength)
      ) {
        setIsEmptyDataIndividual(true);
        return false;
      }
    } else {
      setIsEmptyDataIndividual(false);
    }
    return true;
  };

  // перевірка пустоти та валідації даних для юридичних осіб
  const isFormValidLegal = () => {
    if (!isClientStatus) {
      if (
        phoneLegal === '' ||
        emailLegal === '' ||
        usernameLegal === '' ||
        userSurnameLegal === '' ||
        companyName === '' ||
        deliveryCityLegal === '' ||
        (userTypeLegal === 'company'
          ? companyCode === ''
          : entrepreneurCode === '') ||
        companyCity === '' ||
        companyAddress === '' ||
        companyRegion === '' ||
        userNameLegalLength ||
        userSurNameLegalLength ||
         companyAddressLength ||
        (userMiddleNameLegal !== '' && userNameMiddleLegalLength) ||
        (userCommentLegal !== '' && userCommentLegalLength)
      ) {
        setIsEmptyDataLegal(true);
        return false;
      }
    } else {
      setIsEmptyDataLegal(false);
    }
    return true;
  };

  const deliveryOfficeMap = {
    courier: '',
    np_courier: '',
    self: isClientStatus ? deliverySelf : deliverySelfLegal,
    np: isClientStatus ? deliveryOffice : deliveryOfficeLegal,
  };

  const deliveryAddressMap = {
    self: '',
    np: '',
    courier: isClientStatus ? deliveryAddress : deliveryAddressLegal,
    np_courier: isClientStatus ? deliveryAddressNP : deliveryAddressLegalNP,
  };

  // Сабміт форми з відправкою тіла запиту та перевіркою на помилки
  const handleSubmit = event => {
    event.preventDefault();
    const isIndividualFormValid = isFormValid();
    const isLegalFormValid = isFormValidLegal();

    if (!isIndividualFormValid && isClientStatus) {
      setIsEmptyDataIndividual(true);
      return;
    }

    if (!isLegalFormValid && !isClientStatus) {
      setIsEmptyDataLegal(true);
      return;
    }
    if (selectedDelivery === 'self' && selfAddress === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'np_courier' && addressDeliveryNP === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'np' && warehouses === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'courier' && addressDelivery === '') {
      setIsErrorMessage(true);
      return;
    }

    const requestBody = {
      products: productsInfo,
      userType: isClientStatus ? 'individual' : userTypeLegal,
      phone: isClientStatus
        ? phone.toString().replace(/[ ]/g, '')
        : phoneLegal.toString().replace(/[ ]/g, ''),
      username: isClientStatus ? username : usernameLegal,
      userSurname: isClientStatus ? userSurname : userSurnameLegal,
      userMiddleName: isClientStatus ? userMiddleName : userMiddleNameLegal,
      email: isClientStatus ? email : emailLegal,
      deliveryMethodId: isClientStatus
        ? deliveryMethodId
        : deliveryMethodIdLegal,
      deliveryOffice: deliveryOfficeMap[selectedDelivery],
      userComment: isClientStatus ? userComment : userCommentLegal,
      deliveryCity: isClientStatus ? deliveryCity : deliveryCityLegal,
      deliveryAddress: deliveryAddressMap[selectedDelivery],
      legalEntityData: isClientStatus
        ? undefined
        : {
            companyName: companyName,
            companyCode:
              userTypeLegal === 'company' ? companyCode : entrepreneurCode,
            companyRegion: companyRegion,
            companyCity: companyCity,
            companyAddress: companyAddress,
          },
    };
    try {
      setShowModalOrderSuccessful(true);
      setIsEmptyDataIndividual(false);
      setIsEmptyDataLegal(false);
      dispatch(fetchOrders(requestBody));
      dispatch(clearCheckout());
      dispatch(clearCheckoutLegal());
      dispatch(clearTheCart());
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const closeModal = () => {
    setShowModalOrderSuccessful(false);
    backToHomeUrl();
  };

  useEffect(() => {
    if (isClientStatus) {
      dispatch(
        addToCheckout({
          field: 'userType',
          value: 'individual',
        })
      );
    } else {
      dispatch(
        addToCheckoutLegal({
          field: 'userTypeLegal',
          value: isLegalPerson === 'ФОП' ? 'entrepreneur' : 'company',
        })
      );
    }
  }, [isClientStatus]);

  // Сортуємо опції з вибору доставки, обрана опція рендериться першою
  const sortedComponents = Object.keys(DeliveryComponents).sort((a, b) => {
    if (a === selectedDelivery) return -1;
    if (b === selectedDelivery) return 1;
    return 0;
  });

  return (
    <>
      {orderInfoData.length === 0 &&
      orderInfoTotal &&
      !showModalOrderSuccessful ? (
        <div className="h-[100vh] relative mt-[183px] flex flex-col items-center">
          <h2 className="text-2xl/[28.8px] text-textPrimary font-medium mb-3">
            Ви ще не додали жодного продукту до кошику
          </h2>
          <p className="text-base/[24px] text-textSecondary mb-6">
            Давайте це виправимо - пошукайте товар в каталозі.
          </p>
          <Button
            buttonType="primary"
            type="submit"
            text="Перейти до каталогу"
            className="bg-bgBrandDark py-2 px-m w-auto"
            size="small"
            onClick={() => backToHomeUrl()}
          />
        </div>
      ) : (
        <>
          <div className="h-full container pt-[16px] mt-[57px] tablet1024:mt-[81px]">
            <button
              className="flex items-center font-normal text-[14px] leading-[19.6px] text-textPrimary"
              onClick={() => {
                setShowModalCart(true);
                document.body.classList.add('stop-scrolling');
              }}
            >
              <ArrowLeftIcon size="24px" /> Назад до кошика
            </button>
            <h1 className="font-medium text-[28px]/[33.6px] tablet600:text-[36px]/[46.8px] text-textPrimary mt-3 mb-6">
              Оформлення замовлення
            </h1>
            <div className="flex tablet1024:gap-6 desktop1200:gap-8 desktop1920:gap-[112px]">
              <div className="tablet1024:w-[644px] desktop12000:w-[698px]">
                <div className="flex gap-2 text-[14px]/[19.6px] mb-6 tablet600:mb-5">
                  <button
                    className={`w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast ${
                      isClientStatus ? 'activeButton' : ''
                    }`}
                    onClick={() => {
                      setIsClientStatus(true);
                      setIsEmptyDataLegal(false);
                    }}
                  >
                    Фізична особа
                  </button>
                  <button
                    className={`w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast ${
                      !isClientStatus ? 'activeButton' : ''
                    }`}
                    onClick={() => {
                      setIsClientStatus(false);
                      setIsEmptyDataIndividual(false);
                    }}
                  >
                    Юридична особа
                  </button>
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="flex justify-between">
                    <div className="flex flex-col tablet1024:w-[644px] desktop1200:w-[698px]">
                      <div>
                        <h2 className="mb-[16px] font-medium text-[18px] leading-[25.2px]">
                          Контактні дані
                        </h2>
                        {!isClientStatus ? (
                          <Legal
                            isLegalPerson={isLegalPerson}
                            setIsLegalPerson={setIsLegalPerson}
                            orderInfoTotal={orderInfoTotal}
                            isEmptyDataLegal={isEmptyDataLegal}
                            checkoutData={userData}
                            patterns={patterns}
                            userLegalData={userLegalData}
                            userType={userTypeLegal}
                            isClientStatus={isClientStatus}
                          />
                        ) : (
                          <div className="flex flex-wrap gap-3">
                            <Individual
                              patterns={patterns}
                              isEmptyData={isEmptyDataIndividual}
                              checkoutData={userData}
                              isClientStatus={isClientStatus}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid">
                    {/* Дані доставки */}
                    <div className="grid flex-col gap-[16px] mt-6 mb-6 tablet1024:w-[644px] desktop12000:w-[698px]">
                      <h3 className="font-medium text-[18px] leading-[25.2px]">
                        Спосіб та дані доставки
                      </h3>
                      <div>
                        <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
                          Оберіть місто доставки{' '}
                          <span className="text-textError">*</span>
                        </p>
                        <Settlelement
                          onSelectCity={handleCitySelection}
                          onCityChange={handleCityChange}
                          onSelectCityRef={handleStreetSelection}
                          checkoutData={userData}
                          userLegalData={userLegalData}
                          isEmptyDataLegal={isEmptyDataLegal}
                          isEmptyDataIndividual={isEmptyDataIndividual}
                          selectedDelivery={selectedDelivery}
                          isClientStatus={isClientStatus}
                          cityDelivery={cityDelivery}
                          setCityDelivery={setCityDelivery}
                        />
                      </div>

                      {/* Способи доставки - опції */}
                      <div className="w-full">
                        {sortedComponents.map(key => (
                          <div
                            key={key}
                            className={`flex flex-col gap-[8px] ${
                              selectedDelivery === key
                                ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                                : ''
                            } `}
                          >
                            <div className="flex items-center gap-[8px] h-[44px]">
                              <input
                                type="radio"
                                name="delivery"
                                id={key}
                                value={key}
                                className="w-[16px] h-[16px] ml-[14px]"
                                checked={selectedDelivery === key}
                                onChange={handleDeliveryChange}
                              />
                              <label
                                htmlFor={key}
                                className="flex items-center justify-between w-full"
                              >
                                <span>{DeliveryComponents[key].name}</span>
                              </label>
                            </div>
                            {selectedDelivery === key &&
                              DeliveryComponents[key].component({
                                selectedDelivery,
                                handleWarehouseChange,
                                warehouses,
                                setWarehouses,
                                userData,
                                isClientStatus,
                                userLegalData,
                                setSelfAddress,
                                selfAddress,
                                isErrorMessage,
                                setAddressDelivery,
                                addressDelivery,
                                setAddressDeliveryNP,
                                addressDeliveryNP,
                                setIsErrorMessage,
                              })}
                          </div>
                        ))}
                      </div>

                      {/* Залишити коментар */}
                      <CommentOrder
                        isEmptyDataLegal={isEmptyDataLegal}
                        isEmptyDataIndividual={isEmptyDataIndividual}
                        isClientStatus={isClientStatus}
                      />

                      <div className="tablet768:w-[566px] tablet768:justify-self-center tablet1024:hidden mt-6">
                        {/* Підсумок замовлення */}
                        <TotalOrder
                          orderInfoTotal={orderInfoTotal}
                          selectedDelivery={selectedDelivery}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={scrollToTop}
                      className="state-button flex justify-center tablet768:justify-self-center tablet1024:justify-self-end w-full tablet768:w-[432px] tablet1024:w-[285px] py-[14px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
                    >
                      Оформити замовлення
                    </button>
                  </div>
                </form>
              </div>
              <div className="hidden tablet1024:block tablet1024:w-[300px] desktop1200:w-[470px]  desktop1920:w-[588px] ">
                {/* Підсумок замовлення */}
                <TotalOrder
                  orderInfoTotal={orderInfoTotal}
                  selectedDelivery={selectedDelivery}
                />
              </div>
            </div>
          </div>
          {/* Modal for Successful Order*/}
          {showModalOrderSuccessful && (
            <ModalOrderSuccessful
              onClose={closeModal}
              hideCloseBtn
              availability={aviabilityProduct}
            />
          )}
        </>
      )}
    </>
  );
};

export default Сheckout;
