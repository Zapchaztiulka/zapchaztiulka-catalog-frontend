import { ArrowRight } from '@/public/icons'
import React from 'react'

const SpecialProduct = () => {
  return (
    <div>
      {/* special order 320-480px */}
         <div className=" tablet600:hidden h-[196px] w-[288px] mobile375:w-[343px] mobile480:w-[432px] border border-borderDefault rounded-lg hover:shadow-md relative">
          <div className="special-order-image"></div>
          <div className="wave-shape"></div>
          <div className="mt-[125px] desktop1200:mt-[156px] flex flex-col grow px-s pt-6 pb-[15px] mb-s relative">
            <p className="mb-2 text-lg/[25.2px] textPrimary text-medium">
              Не знайшли
              <br /> потрібний товар?
            </p>
            <p className="text-textSecondary text-sm/[19.6px]">
              Розкажіть, що ви шукаєте, а ми спробуємо доставити.
            </p>
          </div>

          <button
            type="button"
            className="mb-4 relative flex items-center py-xs2 px-s gap-1 cursor-pointer border-none active:bg-bgPressedGrey"
          >
            <span className="text-base text-textBrand font-medium">
              Дізнатись більше
            </span>
            <ArrowRight className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
          </button>
        </div>
    </div>
  )
}

export default SpecialProduct
