import React from 'react'
import {
ArrowRightIcon
} from 'universal-components-frontend/src/components/icons';
import { Button } from 'universal-components-frontend/src/components/buttons';


const NotFoundProduct = ({
  containerStyles,
  waveImageStyles,
  textStylesForNotFoundProduct,
  headStyles,
  textStyles
}) => {
  return (
    <div className="h-full relative">
      <div className={waveImageStyles}></div>
      <div className={containerStyles}>
        <div
          className={`flex flex-col ${textStylesForNotFoundProduct} relative z-10`}
        >
          <div>
            <h3 className={`${headStyles} text-textPrimary font-medium`}>
              Не знайшли потрібний товар?
            </h3>
            <p className={`${textStyles} text-textSecondary`}>
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
            style={{ justifyContent: 'flex-start' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundProduct
