import React, { useContext } from 'react';
import BtnTertiary from '../Buttons/BtnTertiary';
import { CloseModal } from '@/public/icons';
import BtnChips from '../Buttons/BtnChips';
import { StatusContext } from '@/context/statusContext';

const Chips = ({ countriesUrlArray, trademarkUrlArray, handleDeleteChip }) => {
  const {
    minValue,
    maxValue,
    minPrice,
    maxPrice,
  } = useContext(StatusContext);

  return (
    <>
      {(countriesUrlArray?.length > 0 ||
        trademarkUrlArray?.length > 0 ||
        minValue ||
        maxValue) && (
        <div className="mb-6 flex flex-wrap gap-2">
          <BtnTertiary color={'text-textError'}>
            <CloseModal
              width={24}
              height={24}
              className="stroke-iconError stroke-2"
            />
            <span>Очистити</span>
          </BtnTertiary>

          {countriesUrlArray.map((item, index) => {
            return (
              <BtnChips
                key={`${item}-${index}`}
                onClick={() => handleDeleteChip('country', index)}
              >
                <span>{item === '' ? 'Інше' : item}</span>
                <CloseModal
                  width={16}
                  height={16}
                  className="stroke-iconPrimary stroke-2"
                />
              </BtnChips>
            );
          })}
          {trademarkUrlArray.map((item, index) => {
            return (
              <BtnChips
                key={`${item}-${index}`}
                onClick={() => handleDeleteChip('trademark', index)}
              >
                <span>{item === '' ? 'Інше' : item}</span>
                <CloseModal
                  width={16}
                  height={16}
                  className="stroke-iconPrimary stroke-2"
                />
              </BtnChips>
            );
          })}
          {(minValue || maxValue) && (
            <BtnChips onClick={() => handleDeleteChip('price')}>
              <span>
                {minValue ? minValue : minPrice} -{' '}
                {maxValue ? maxValue : maxPrice} &#8372;
              </span>
              <CloseModal
                width={16}
                height={16}
                className="stroke-iconPrimary stroke-2"
              />
            </BtnChips>
          )}
        </div>
      )}
    </>
  );
};

export default Chips;
