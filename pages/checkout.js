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
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import CommentOrder from '@/components/Orders/CommentOrder';
import { clearTheCart } from '@/redux/cart/cartSlice';
import { ModalOrderSuccessful } from '@/components';
import { Button } from 'universal-components-frontend/src/components/buttons';
import { selectPatterns } from '@/redux/patterns/patternsSelectors';

const Сheckout = () => {
  const orderInfoTotal = useSelector(selectCart);
  const dispatch = useDispatch();
  const orderInfoData = orderInfoTotal?.data;
  const userData = useSelector(selectCheckout);
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
    legalEntityData: {
      companyName,
      companyCode,
      companyCity,
      companyAddress,
      companyRegion,
    },
  } = userData;
  const patterns = useSelector(selectPatterns);

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
  const [selfAddress, setSelfAddress] = useState(deliveryOffice || '');
  const [addressDelivery, setAddressDelivery] = useState(deliveryAddress || '');
  const [addressDeliveryNP, setAddressDeliveryNP] = useState(
    deliveryAddress || ''
  );
  const [warehouses, setWarehouses] = useState(deliveryOffice || '');
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isEmptyData, setIsEmptyData] = useState(false);
  console.log("TCL: Сheckout -> isEmptyData", isEmptyData)

  const [selectedDelivery, setSelectedDelivery] = useState('');

  const handleCitySelection = cityDeliverRef => {
    dispatch(addToCheckout({ field: 'selectedCity', value: cityDeliverRef }));
  };

  const handleStreetSelection = cityRef => {
    dispatch(addToCheckout({ field: 'cityRef', value: cityRef }));
  };

  const handleCityChange = newCity => {
    dispatch(addToCheckout({ field: 'deliveryCity', value: newCity }));
  };

  const handleWarehouseChange = warehouse => {
    dispatch(addToCheckout({ field: 'deliveryOffice', value: warehouse }));
  };

  const handleDeliveryChange = event => {
    const selectedDeliveryValue = event.target.value;
    setSelectedDelivery(selectedDeliveryValue);
    dispatch(
      addToCheckout({ field: 'deliveryMethodId', value: selectedDeliveryValue })
    );
    dispatch(addToCheckout({ field: 'deliveryOffice', value: '' }));
    setIsErrorMessage(false);
  };

const commentValidation = userComment !== '' && userComment.length<10
console.log("TCL: Сheckout -> userComment.length", userComment.length)

  useEffect(() => {
    setSelectedDelivery(deliveryMethodId || null);
  }, [deliveryMethodId]);

  useEffect(()=>{
    setIsEmptyData(false);
  }, [userType])

  const handleSubmit =  event => {
    event.preventDefault();
    if (
      (userType === 'individual' && selectedDelivery === '') ||
      phone === '' ||
      email === '' ||
      username === '' ||
      userSurname === '' ||
      !commentValidation ||
      (deliveryCity === '' && selectedDelivery !== 'self')
    ) {
      setIsEmptyData(true);
      return;
    }

    if (
      (userType === 'company' ||
      userType === 'entrepreneur' && selectedDelivery === '') ||
      phone === '' ||
      email === '' ||
      username === '' ||
      userSurname === '' ||
      (deliveryCity === '' && selectedDelivery !== 'self') ||
      companyName === '' ||
      companyCode === '' ||
      companyCity === '' ||
      companyAddress === '' ||
      companyRegion === '' ||
      !commentValidation
    ) {
      setIsEmptyData(true);
      return;
    }

    if (selectedDelivery === 'self' && selfAddress === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'np_courier' && addressDelivery === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'np' && warehouses === '') {
      setIsErrorMessage(true);
      return;
    }
    if (selectedDelivery === 'courier' && addressDeliveryNP === '') {
      setIsErrorMessage(true);
      return;
    }

    const requestBody = {
      products: productsInfo,
      userType: isClientStatus ? 'individual' : userType,
      phone: phone.toString().replace(/[ ]/g, ''),
      username: username,
      userSurname: userSurname,
      userMiddleName: userMiddleName,
      email: email,
      deliveryMethodId: deliveryMethodId,
      deliveryOffice: deliveryOffice,
      userComment: userComment,
      deliveryCity: deliveryCity,
      deliveryAddress: deliveryAddress,
      legalEntityData: {
        companyName: isClientStatus ? '' : companyName,
        companyCode: isClientStatus ? '' : companyCode,
        companyRegion: isClientStatus ? '' : companyRegion,
        companyCity: isClientStatus ? '' : companyCity,
        companyAddress: isClientStatus ? '' : companyAddress,
      },
    };
    setShowModalOrderSuccessful(true);
    try {
      dispatch(fetchOrders(requestBody));
      dispatch(clearCheckout());
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
        addToCheckout({
          field: 'userType',
          value: isLegalPerson === 'ФОП' ? 'entrepreneur' : 'company',
        })
      );
    }
  }, [isClientStatus]);
  console.log("TCL: Сheckout -> isClientStatus", isClientStatus)

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

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex justify-between">
                <div className="flex flex-col tablet1024:w-[644px] desktop1200:w-[698px]">
                  <div className="flex gap-2 text-[14px]/[19.6px] mb-6 tablet600:mb-5">
                    <button
                      className={`w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast ${
                        isClientStatus ? 'activeButton' : ''
                      }`}
                      onClick={() => {setIsClientStatus(true)
                      setIsEmptyData(false);}}
                    >
                      Фізична особа
                    </button>
                    <button
                      className={`w-[140px] mobile375:w-[167.5px] py-3 border border-borderDefault rounded-medium3 hover:bg-bgBrandLight3 focus:bg-bgBrandLight3 hover:text-textContrast focus:text-textContrast ${
                        !isClientStatus ? 'activeButton' : ''
                      }`}
                      onClick={() => {
                        setIsClientStatus(false);
                        setIsEmptyData(false)
                      }}
                    >
                      Юридична особа
                    </button>
                  </div>
                  <div>
                    <h2 className="mb-[16px] font-medium text-[18px] leading-[25.2px]">
                      Контактні дані
                    </h2>
                    {!isClientStatus ? (
                      <Legal
                        isLegalPerson={isLegalPerson}
                        setIsLegalPerson={setIsLegalPerson}
                        orderInfoTotal={orderInfoTotal}
                        isEmptyData={isEmptyData}
                        checkoutData={userData}
                        patterns={patterns}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        <Individual
                          orderInfoTotal={orderInfoTotal}
                          patterns={patterns}
                          isEmptyData={isEmptyData}
                          checkoutData={userData}
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
                      isEmptyData={isEmptyData}
                      selectedDelivery={selectedDelivery}
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
                        checkoutData={userData}
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
                      />
                    )}
                  </div>
                </div>

                {/* Залишити коментар */}
                <CommentOrder
                  checkoutData={userData}
                  isEmptyData={isEmptyData}
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
