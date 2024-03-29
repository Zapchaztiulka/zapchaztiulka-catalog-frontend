import React, { useContext } from 'react';
import BtnTertiary from '../Buttons/BtnTertiary';
import { CloseModal } from '@/public/icons';
import BtnChips from '../Buttons/BtnChips';
import { StatusContext } from '@/context/statusContext';

const Chips = ({
  countriesUrlArray,
  trademarkUrlArray,
  handleDeleteChip,
  minPriceURL,
  maxPriceURL,
}) => {
  const { minPrice, maxPrice, resetLocalStorage, backToHomeUrl } =
    useContext(StatusContext);

  const handleClearAllChips = () => {
    resetLocalStorage();
    backToHomeUrl();
  };

  return (
    <>
      {(countriesUrlArray?.length > 0 ||
        trademarkUrlArray?.length > 0 ||
        minPriceURL ||
        maxPriceURL) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {countriesUrlArray.map((item, index) => {
            return (
              <BtnChips
                key={`${item}-${index}`}
                onClick={() => handleDeleteChip('country', index)}
              >
                <span>{item === '' ? 'Не зазначено' : item}</span>
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
                <span>{item === '' ? 'Не зазначено' : item}</span>
                <CloseModal
                  width={16}
                  height={16}
                  className="stroke-iconPrimary stroke-2"
                />
              </BtnChips>
            );
          })}
          {(minPriceURL || maxPriceURL) && (
            <BtnChips onClick={() => handleDeleteChip('price')}>
              <span>
                {minPriceURL ? minPriceURL : minPrice} -{' '}
                {maxPriceURL ? maxPriceURL : maxPrice} &#8372;
              </span>
              <CloseModal
                width={16}
                height={16}
                className="stroke-iconPrimary stroke-2"
              />
            </BtnChips>
          )}
          <BtnTertiary
            color={'text-textBrand'}
            onClick={() => handleClearAllChips()}
          >
            <CloseModal
              width={24}
              height={24}
              className="stroke-iconBrandDark stroke-2"
            />
            <span>Очистити</span>
          </BtnTertiary>
        </div>
      )}
    </>
  );
};

export default Chips;
