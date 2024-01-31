import React from 'react'

const TotalOrder = () => {
  return (
    <>
                <div className="flex flex-col gap-[16px] bg-bgGreyLigth p-[12px]">
            <h4 className="font-medium text-[18px] leading-[25.2px]">
              Ваше замовлення
            </h4>
            <ul className="flex flex-col gap-[16px]">
              <li>Товар 1</li>
              <li>Товар 2</li>
            </ul>
            <div className="flex flex-col gap-[16px] py-[16px] border-y border-borderDefault border-dashed">
              <p className="">Доставка</p>
              <p className="">Підсумок</p>
            </div>
            <p className="">Загалом</p>
          </div>

          <button
            type="button"
            className="state-button w-full mobile480:w-[432px] tablet600:w-[285px] h-[48px] 
                font-medium text-[16px] leading-[22.4px] tablet600:text-[14px] tablet600:leading-[19.6px] text-textContrast"
          >
            Офомити замовлення
          </button>
    </>
  )
}

export default TotalOrder
