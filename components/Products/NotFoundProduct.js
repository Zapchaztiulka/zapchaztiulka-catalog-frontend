import React from 'react'
import {
ArrowRightIcon
} from 'universal-components-frontend/src/components/icons';
import { Button } from 'universal-components-frontend/src/components/buttons';


const NotFoundProduct = ({containerStyles, waveImageStyles }) => {

  return (
    <div>
      <div className={containerStyles}>
        <div className={waveImageStyles}></div>
        <div className="flex flex-col gap-xs py-xs2 w-[185.22px] mt-[43px] relative z-10">
          <div className="px-xs">
            <h3 className="text-base/[22.4px] text-textPrimary font-medium mb-1">
              Не знайшли потрібний товар?
            </h3>
            <p className="text-[12px]/[18px] text-textSecondary">
              Розкажіть, що ви шукаєте, а ми спробуємо доставити.
            </p>
          </div>
          <Button
            buttonType="tertiary"
            text="Дізнатись більше"
            className="justify-start pl-0 text-sm tablet600:text-base/[22.4px] text-textBrand font-medium px-xs py-xs2"
            iconProps={{ color: '#1570EF' }}
            iconSide="right"
            icon={ArrowRightIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFoundProduct
