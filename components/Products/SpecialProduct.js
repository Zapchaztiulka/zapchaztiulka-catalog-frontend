import { ArrowRight } from '@/public/icons'
import React from 'react'

const SpecialProduct = () => {
  return (
    <>     
        <div className="special-order-image"></div>
        <div className="wave-shape"></div>
        <div className="mt-[51px] tablet600:mt-[125px] desktop1200:mt-[156px] flex flex-col grow px-s tablet600:pt-6 tablet600:pb-[15px] mb-xs w-[192px]  relative">
          <p className="mb-1 text-base/[22.4px] tablet600:mb-2 tablet600:text-lg/[25.2px] textPrimary text-medium">
            Не знайшли потрібний товар?
          </p>
          <p className="text-textSecondary text-xs/[18px] tablet600:text-sm/[19.6px]">
            Розкажіть, що ви шукаєте, а ми спробуємо доставити.
          </p>
        </div>

        <button
          type="button"
          className="mb-2 tablet600:mb-4 relative flex items-center py-xs2 px-s gap-1 cursor-pointer border-none active:bg-bgPressedGrey"
        >
          <span className="text-sm tablet600:text-base text-textBrand font-medium">
            Дізнатись більше
          </span>
          <ArrowRight className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
        </button>
      
    </>
  );
}

export default SpecialProduct
