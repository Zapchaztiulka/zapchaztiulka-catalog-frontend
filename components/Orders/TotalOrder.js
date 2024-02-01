import React from 'react'

const TotalOrder = ({ orderInfoTotal, selectedDelivery }) => {


  const product = orderInfoTotal?.data
  console.log(product);

  const formatNumber = (number) => {
    if (product && orderInfoTotal) {
      if (Number.isInteger(number)) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      } else {
        return number
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          .replace('.', ',');
      }
    }
    return null
}

const getDelivery = (selectedDelivery) => {
  let delivery = '';

  switch (selectedDelivery) {
    case 'novaPoshta':
      delivery = 'Нова Пошта';
      break;
    case 'zapchaztiulkaCourier':
      delivery = 'Кур\'єр запчастюлька';
      break;
    case 'novaPoshtaCourier':
      delivery = 'Кур\'єр Нова Пошта';
      break;
    case 'pickup':
      delivery = 'Самовивіз';
      break;
    default:
      // Значення за замовчуванням, якщо не відповідає жодному з варіантів
      delivery = 'Не визначено';
  }

  return delivery;
}

  return (
    <>
      <div className="flex mb-6 flex-col gap-[16px] bg-bgGreyLigth tablet1024:p-xs desktop1200:p-m desktop1920:p-m2">
        <h4 className="font-medium text-[18px] leading-[25.2px]">
          Ваше замовлення
        </h4>
        <ul className="flex flex-col gap-[16px]">
          {orderInfoTotal &&
            product?.map(item => (
              <li key={item.id} className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="max-w-[239px] truncate text-[14px]/[19.6px] text-textPrimary font-medium">
                    {item.name}
                  </p>
                  <p className="text-[14px]/[19.6px] text-textTertiary">{`x${item.quantity}`}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[12px]/[18px] text-textTertiary max-w-[150px] truncate">
                    {item.vendorCode}
                  </p>
                  <p className="flex justify-end w-[168px] text-[14px]/[19.6px] text-textPrimary font-medium">
                    {formatNumber(item.totalPrice)} &#8372;
                  </p>
                </div>
              </li>
            ))}
        </ul>
        <div className="flex flex-col gap-[16px] py-[16px] border-y border-borderDefault border-dashed">
          <div className="flex gap-2 items-center justify-between">
            <p className="text-[15px]/[21px] text-textPrimary">Доставка</p>
            <p className="text-[14px]/[19.6px] font-medium text-textTertiary">
              {selectedDelivery
                ? getDelivery(selectedDelivery)
                : 'Вибрати доставку'}
            </p>
            <p className="flex justify-end text-[14px]/[19.6px] font-medium text-primary">
              200 &#8372;
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[15px]/[21px] text-textPrimary">Підсумок</p>
            <p className="text-[14px]/[19.6px] font-medium text-textTertiary">
              {formatNumber(orderInfoTotal?.totalAmount)} &#8372;
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[18px]/[25.2px] text-textPrimary font-medium">
            Загалом
          </p>
          <p className="text-[18px]/[25.2px] text-textPrimary font-medium">
            {formatNumber(orderInfoTotal?.totalAmount)} &#8372;
          </p>
        </div>
      </div>

      <button
        type="button"
        className="state-button w-full mobile480:w-[432px] tablet600:w-[285px] h-[48px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
      >
        Офомити замовлення
      </button>
    </>
  );
}

export default TotalOrder
