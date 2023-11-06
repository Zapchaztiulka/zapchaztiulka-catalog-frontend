import { ArrowDown, ArrowUp } from '@/public/icons';
import React from 'react'

const ProductInfo = ({ product, isOpen, toggle }) => {
  return (
    <>
      <section className="mb-8">
        <h3 className="mb-3 text-lg desktop1200:text-xl text-textPrimary font-medium">
          Основні характеристики:
        </h3>
        <div className="characteristic">
          <span className="characteristic-label">Вага (кг):</span>
          <span className="characteristic-value">{product?.weight}</span>
        </div>
        <div className="characteristic">
          <span className=" characteristic-label">Код:</span>
          <span className="characteristic-value">{product?.weight}</span>
        </div>
        <div className="characteristic">
          <span className="characteristic-label">Виробник:</span>
          <span className="characteristic-value">
            {product?.manufacturer?.trademark}
          </span>
        </div>
        <div className="characteristic">
          <span className="characteristic-label">Країна:</span>
          <span className="characteristic-value">{product?.weight}</span>
        </div>

        {isOpen && (
          <>
            <div className="characteristic">
              <span className="characteristic-label">Вага (кг):</span>
              <span className="characteristic-value">nnn</span>
            </div>
            <div className="characteristic">
              <span className=" characteristic-label">Код:</span>
              <span className="characteristic-value">bbb</span>
            </div>
            <div className="characteristic">
              <span className="characteristic-label">Виробник:</span>
              <span className="characteristic-value">ddd</span>
            </div>
            <div className="characteristic">
              <span className="characteristic-label">Країна:</span>
              <span className="characteristic-value">ddd</span>
            </div>
          </>
        )}
        {!isOpen ? (
          <button
            type="button"
            onClick={toggle}
            className="flex items-center py-[9px] cursor-pointer border-none active:bg-bgPressedGrey"
          >
            <span className="text-base text-textBrand font-medium">
              Усі характеристик
            </span>
            <ArrowDown className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggle}
            className="flex items-center py-[9px] cursor-pointer border-none active:bg-bgPressedGrey"
          >
            <span className="text-base text-textBrand font-medium">
              Приховати
            </span>
            <ArrowUp className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
          </button>
        )}
      </section>

      {product?.description !== " " &&  product?.description !== ""  && (
        <>
          <h4 className="mb-3">Опис</h4>
          <p className="text-base text-textPrimary">{product?.description}</p>
        </>
      )}
    </>
  );
};

export default ProductInfo
