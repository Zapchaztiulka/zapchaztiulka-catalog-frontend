import React from 'react';
import DeliveryNova from './DeliveryNova';
import DeliveryBySelf from './DeliveryBySelf';
import Courier from './Courier';
import NPCourier from './NPCourier';

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
      <Courier
        {...props}
        isErrorMessage={props.isErrorMessage}
        checkoutData={props.userData}
        isClientStatus={props.isClientStatus}
        userLegalData={props.userLegalData}
      />
    ),
  },
  np_courier: {
    name: "Кур'єр Нова Пошта",
    component: props => (
      <NPCourier
        {...props}
        isErrorMessage={props.isErrorMessage}
        checkoutData={props.userData}
        isClientStatus={props.isClientStatus}
        userLegalData={props.userLegalData}
      />
    ),
  },
};

export default DeliveryComponents;
