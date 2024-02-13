import React from 'react';
import DeliveryNova from '../DeliveryNova';
import DeliveryBySelf from '../DeliveryBySelf';
import DeliveryCourier from '../DeliveryCourier';

const DeliveryComponents = {
  np: {
    name: 'Нова пошта відділення',
    component: props => (
      <DeliveryNova
        {...props}
        onWarehouseChange={props.handleWarehouseChange}
        warehouses={props.warehouses}
        setWarehouses={props.setWarehouses}
        checkoutData={props.userData}
        isClientStatus={props.isClientStatus}
        userLegalData={props.userLegalData}
      />
    ),
  },
  self: {
    name: 'Самовивіз',
    component: props => (
      <DeliveryBySelf
        {...props}
        setSelfAddress={props.setSelfAddress}
        selfAddress={props.selfAddress}
        isErrorMessage={props.isErrorMessage}
        isClientStatus={props.isClientStatus}
      />
    ),
  },
  courier: {
    name: "Кур'єр Запчастюлька",
    component: props => (
      <DeliveryCourier
        {...props}
        isErrorMessage={props.isErrorMessage}
        addressDelivery={props.addressDelivery}
        setAddressDelivery={props.setAddressDelivery}
        checkoutData={props.userData}
        isClientStatus={props.isClientStatus}
        userLegalData={props.userLegalData}
        setIsErrorMessage={props.setIsErrorMessage}
      />
    ),
  },
  np_courier: {
    name: "Кур'єр Нова Пошта",
    component: props => (
      <DeliveryCourier
        {...props}
        isErrorMessage={props.isErrorMessage}
        addressDelivery={props.addressDelivery}
        setAddressDelivery={props.setAddressDelivery}
        checkoutData={props.userData}
        isClientStatus={props.isClientStatus}
        userLegalData={props.userLegalData}
        setIsErrorMessage={props.setIsErrorMessage}
      />
    ),
  },
};

export default DeliveryComponents;
