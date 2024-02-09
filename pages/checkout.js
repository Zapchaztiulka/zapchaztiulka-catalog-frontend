import React from 'react';
import { ArrowLeftIcon } from 'universal-components-frontend/src/components/icons';
import { useContext, useState, useEffect } from 'react';
import { StatusContext } from '@/context/statusContext';
import Settlelement from '@/components/Orders/Settlelement';
import DeliveryNova from '@/components/Orders/DeliveryNova';
import DeliveryCourier from '@/components/Orders/DeliveryCourier';
import DeliveryBySelf from '@/components/Orders/DeliveryBySelf';
import TotalOrder from '@/components/Orders/TotalOrder';
import Legal from '@/components/Orders/EntityType/Legal';
import Individual from '@/components/Orders/EntityType/Individual';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/redux/cart/cartSelector';
import { fetchOrders } from '@/redux/orders/ordersOperations';
import { addToCheckout, clearCheckout } from '@/redux/checkout/checkoutSlice';
import {
  selectCheckout,
  selectCheckoutLegal,
} from '@/redux/checkout/checkoutSelector';
import CommentOrder from '@/components/Orders/CommentOrder';
import { clearTheCart } from '@/redux/cart/cartSlice';
import { ModalOrderSuccessful } from '@/components';
import { Button } from 'universal-components-frontend/src/components/buttons';
import { selectPatterns } from '@/redux/patterns/patternsSelectors';
import {
  addToCheckoutLegal,
  clearCheckoutLegal,
} from '@/redux/checkout/LegalPerson/legalSlice';

const Сheckout = () => {
  const orderInfoTotal = useSelector(selectCart);
  const dispatch = useDispatch();
  const orderInfoData = orderInfoTotal?.data;
  const userData = useSelector(selectCheckout);
  console.log("TCL: Сheckout -> userData", userData)
  const userLegalData = useSelector(selectCheckoutLegal);
  console.log("TCL: Сheckout -> userLegalData", userLegalData)
  const {
    userType,
    phone,
    email,
    username,
    userSurname,
    userMiddleName,
    deliveryMethodId,
    deliveryOffice,
    userComment,
    deliveryCity,
    deliveryAddress,
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
      companyRegion,
      companyCity,
      companyAddress,
    },
    deliveryMethodIdLegal,
    deliveryOfficeLegal,
    deliveryCityLegal,
    deliveryAddressLegal,
    userCommentLegal,
  } = userLegalData;

  const patterns = useSelector(selectPatterns);
  const { min, max } = patterns;

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
    isClientStatus ? deliveryOffice || '' : deliveryOfficeLegal || ''
  );
  const [addressDelivery, setAddressDelivery] = useState(
    isClientStatus ? deliveryAddress || '' : deliveryAddressLegal || ''
  );
  const [addressDeliveryNP, setAddressDeliveryNP] = useState(
    isClientStatus ? deliveryAddress || '' : deliveryAddressLegal || ''
  );
  const [warehouses, setWarehouses] = useState(
    isClientStatus ? deliveryOffice || '' : deliveryOfficeLegal || ''
  );
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isEmptyDataIndividual, setIsEmptyDataIndividual] = useState(false);
  console.log("TCL: Сheckout -> [isEmptyDataIndividual", isEmptyDataIndividual)

  const [isEmptyDataLegal, setIsEmptyDataLegal] = useState(false);
  console.log("TCL: Сheckout -> isEmptyDataLegal", isEmptyDataLegal)

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
      dispatch(addToCheckoutLegal({ field: 'deliveryOfficeLegal', value: '' }));
    }
    if (isClientStatus) {
      dispatch(
        addToCheckout({
          field: 'deliveryMethodId',
          value: selectedDeliveryValue,
        })
      );
      dispatch(addToCheckout({ field: 'deliveryOffice', value: '' }));
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
  username !== '' && username.length >= min.user && username.length <= max.user;
  const userMiddleNameLength =
    userMiddleName!=='' && userMiddleName.length >= min.user &&
    userMiddleName.length <= max.user;
  const userSurNameLength =
    userSurname!=='' && userSurname.length >= min.user && userSurname.length <= max.user;
  const userCommentLength =
    userComment!=='' && userComment.length >= min.description &&
    userComment.length <= max.description;

  const userNameLegalLength =
    usernameLegal?.length >= min.user && usernameLegal?.length <= max.user;
  const userNameMiddleLegalLength =
    userMiddleNameLegal?.length >= min.user &&
    userMiddleNameLegal?.length <= max.user;
  const userSurNameLegalLength =
    userSurnameLegal?.length >= min.user &&
    userSurnameLegal?.length <= max.user;
  const userCommentLegalLength =
    userCommentLegal?.length >= min.description &&
    userCommentLegal?.length <= max.description;
  const companyAddressLength =
    companyAddress?.length >= min.companyAddress &&
    companyAddress?.length <= max.companyAddress;

  // перевірка пустоти та валідації даних для фізичних осіб
const isFormValid = () => {
  if (isClientStatus) {
    if (
      selectedDelivery === '' ||
      selectedDelivery === null ||
      phone === '' ||
      email === '' ||
      username === '' ||
      userSurname === '' ||
      deliveryCity === '' 
    ) {
      setIsEmptyDataIndividual(true);
      return false;
    }
  } else {
    setIsEmptyDataIndividual(false); 
  }
  return true;
};
 
  console.log('TCL: Сheckout ->selectedDelivery ', selectedDelivery);
  
  console.log('TCL: Сheckout ->selfAddress ', selfAddress);

  
  console.log('TCL: Сheckout ->addressDelivery ', addressDelivery);
  
  console.log('TCL: Сheckout -> deliveryCity ', deliveryCity);

  // перевірка пустоти та валідації даних для юридичних осіб
const isFormValidLegal = () => {
  if (!isClientStatus) {
    if (
      selectedDelivery === '' ||
      selectedDelivery === null ||
      phoneLegal === '' ||
      emailLegal === '' ||
      usernameLegal === '' ||
      userSurnameLegal === '' ||
      companyName === '' ||
      companyCode === '' ||
      companyCity === '' ||
      companyAddress === '' ||
      companyRegion === ''
    ) {
      setIsEmptyDataLegal(true);
      return false;
    }
  } else {
    setIsEmptyDataLegal(false); 
  }
  return true;
};


  // Сабміт форми з відправкою тіла запиту та перевіркою на помилки
  const handleSubmit = event => {
    event.preventDefault();
   if (!isFormValid() || !isFormValidLegal()) {
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

        setIsEmptyDataIndividual(false);
        setIsEmptyDataLegal(false);

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
      deliveryOffice: isClientStatus ? deliveryOffice : deliveryOfficeLegal,
      userComment: isClientStatus ? userComment : userCommentLegal,
      deliveryCity: isClientStatus ? deliveryCity : deliveryCityLegal,
      deliveryAddress: isClientStatus ? deliveryAddress : deliveryAddressLegal,
      legalEntityData: isClientStatus
        ? undefined
        : {
            companyName: companyName,
            companyCode: companyCode,
            companyRegion: companyRegion,
            companyCity: companyCity,
            companyAddress: companyAddress,
          },
    };
    try {
      setShowModalOrderSuccessful(true);
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
            <h1 className="font-medium text-[36px]/[46.8px] text-textPrimary mt-3 mb-6">
              Оформлення замовлення
            </h1>
            <div className="flex gap-2 text-[14px]/[19.6px] mb-6 tablet600:mb-5">
              <button
                className={`w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast ${
                  isClientStatus ? 'activeButton' : ''
                }`}
                onClick={() => {
                  setIsClientStatus(true);
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

                <div className="hidden tablet1024:block tablet1024:w-[300px] desktop1200:w-[470px]  desktop1920:w-[588px] ">
                  {/* Підсумок замовлення */}
                  <TotalOrder
                    orderInfoTotal={orderInfoTotal}
                    selectedDelivery={selectedDelivery}
                  />
                </div>
              </div>

              <div className="grid">
                {/* Дані доставки */}
                <div className="flex flex-col gap-[16px] mt-6 mb-6">
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

                  {/* Нова пошта відділення */}
                  <div
                    className={`flex flex-col gap-[8px] ${
                      selectedDelivery === 'np'
                        ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                        : ''
                    } `}
                  >
                    <div className="flex items-center gap-[8px] h-[44px]">
                      <input
                        type="radio"
                        name="delivery"
                        id="np"
                        value="np"
                        className="w-[16px] h-[16px] ml-[14px]"
                        checked={selectedDelivery === 'np'}
                        onChange={handleDeliveryChange}
                      />
                      <label
                        htmlFor="np"
                        className="flex items-center justify-between w-full"
                      >
                        <span>Нова пошта</span>
                      </label>
                    </div>
                    {selectedDelivery === 'np' && (
                      <div className="pl-[32px] pr-[12px]">
                        <p className="mb-[4px] text-[14px]/[19.6px] text-textSecondary">
                          Оберіть поштове відділення{' '}
                          <span className="text-textError">*</span>
                        </p>
                        <DeliveryNova
                          onWarehouseChange={handleWarehouseChange}
                          isErrorMessage={isErrorMessage}
                          warehouses={warehouses}
                          setWarehouses={setWarehouses}
                          checkoutData={userData}
                          isClientStatus={isClientStatus}
                          userLegalData={userLegalData}
                        />
                      </div>
                    )}
                  </div>

                  {/* Самовивіз */}
                  <div
                    className={`flex flex-col gap-[8px] ${
                      selectedDelivery === 'self'
                        ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                        : ''
                    } `}
                  >
                    <div className="flex items-center gap-[8px] h-[44px]">
                      <input
                        type="radio"
                        name="delivery"
                        id="self"
                        value="self"
                        className="w-[16px] h-[16px] ml-[14px]"
                        checked={selectedDelivery === 'self'}
                        onChange={handleDeliveryChange}
                      />
                      <label
                        htmlFor="self"
                        className="flex items-center justify-between w-full"
                      >
                        <span>Самовивіз</span>
                        <span className="flex items-center justify-center w-[116px] h-[28px] bg-bgGreyLigth rounded-medium3 font-medium text-[14px] leading-[19.6px]">
                          Безкоштовно
                        </span>
                      </label>
                    </div>
                    {selectedDelivery === 'self' && (
                      <DeliveryBySelf
                        setSelfAddress={setSelfAddress}
                        selfAddress={selfAddress}
                        isErrorMessage={isErrorMessage}
                        isClientStatus={isClientStatus}
                      />
                    )}
                  </div>

                  {/* Кур'єр запчастюлькі */}
                  <div
                    className={`flex flex-col gap-[8px] ${
                      selectedDelivery === 'courier'
                        ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                        : ''
                    } `}
                  >
                    <div className="flex items-center gap-[8px] h-[44px]">
                      <input
                        type="radio"
                        name="delivery"
                        id="courier"
                        value="courier"
                        className="w-[16px] h-[16px] ml-[14px]"
                        checked={selectedDelivery === 'courier'}
                        onChange={handleDeliveryChange}
                      />
                      <label
                        htmlFor="courier"
                        className="flex items-center justify-between w-full"
                      >
                        <span>Кур'єр Запчастюлька</span>
                        <span className="flex items-center justify-center w-[89px] h-[28px] bg-bgGreyLigth rounded-medium3 font-medium text-[14px] leading-[19.6px]">
                          Від 220 ₴
                        </span>
                      </label>
                    </div>
                    {selectedDelivery === 'courier' && (
                      <DeliveryCourier
                        isErrorMessage={isErrorMessage}
                        addressDelivery={addressDelivery}
                        setAddressDelivery={setAddressDelivery}
                        checkoutData={userData}
                        isClientStatus={isClientStatus}
                        userLegalData={userLegalData}
                      />
                    )}
                  </div>

                  {/* Кур'єр Нової Пошти */}
                  <div
                    className={`flex flex-col gap-[8px] ${
                      selectedDelivery === 'np_courier'
                        ? 'border border-borderDefaultBlue rounded-minimal pt-s pb-m'
                        : ''
                    } `}
                  >
                    <div className="flex items-center gap-[8px] h-[44px]">
                      <input
                        type="radio"
                        name="delivery"
                        id="np_courier"
                        value="np_courier"
                        className="w-[16px] h-[16px] ml-[14px]"
                        checked={selectedDelivery === 'np_courier'}
                        onChange={handleDeliveryChange}
                      />
                      <label
                        htmlFor="np_courier"
                        className="flex items-center justify-between w-full"
                      >
                        <span>Кур'єр Нова Пошта</span>
                      </label>
                    </div>
                    {selectedDelivery === 'np_courier' && (
                      <DeliveryCourier
                        isErrorMessage={isErrorMessage}
                        addressDelivery={addressDeliveryNP}
                        setAddressDelivery={setAddressDeliveryNP}
                        checkoutData={userData}
                        isClientStatus={isClientStatus}
                        userLegalData={userLegalData}
                      />
                    )}
                  </div>
                </div>

                {/* Залишити коментар */}
                <CommentOrder
                  isEmptyDataLegal={isEmptyDataLegal}
                  isEmptyDataIndividual={isEmptyDataIndividual}
                  isClientStatus={isClientStatus}
                />

                <div className=" tablet1024:hidden mt-6">
                  {/* Підсумок замовлення */}
                  <TotalOrder
                    orderInfoTotal={orderInfoTotal}
                    selectedDelivery={selectedDelivery}
                  />
                </div>

                <button
                  type="submit"
                  className="state-button flex justify-center justify-self-end w-full mobile480:w-[432px] tablet600:w-[285px] py-[14px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
                >
                  Оформити замовлення
                </button>
              </div>
            </form>
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
