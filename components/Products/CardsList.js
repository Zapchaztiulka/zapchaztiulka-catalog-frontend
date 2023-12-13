import React from 'react';
import CardItem from './CardItem';
import { getNumberOfSpecialCard} from '@/helpers/getLimitByScreenWidth';
import { ArrowRight } from '@/public/icons';
import {
  getCategoryName,
  getSubCategoryName,
} from '@/helpers/getNameOfCategory';

const CardsList = ({
  products,
  totalCount,
  searchValue,
  size,
  limit,
  categories,
  idCategory,
  idSubCategory,
  caterogyUrl,
  subcategoryUrl,
}) => {
  const indexOfSpecialCards = getNumberOfSpecialCard(size);
  const nameOfCategory = getCategoryName(categories, idCategory);
  const nameOfSubCategory = getSubCategoryName(categories, idSubCategory);

  return (
    <>
      <div className="z-10">
        {((searchValue !== undefined && searchValue !== '') ||
          caterogyUrl.length === 1 ||
          subcategoryUrl.length === 1) && (
          <div className="mb-m block desktop1200:inline text-2xl/[28.8px] -tracking-[0.36px] tablet600:text-4xl/[46.8px] tablet600:-tracking-[0.54px] font-normal text-textPrimary">
            {searchValue && (
              <p className="inline-block mb-2 desktop1200:mr-4">
                Результати пошуку “{`${searchValue}`}”{' '}
              </p>
            )}
            {caterogyUrl.length === 1 && (
              <p className="inline-block mb-2 desktop1200:mr-4">
                {`${nameOfCategory}`}
              </p>
            )}
            {subcategoryUrl.length === 1 && (
              <p className="inline-block mb-2 desktop1200:mr-4">
                {`${nameOfSubCategory}`}
              </p>
            )}

            <span className="block desktop1200:inline text-textTertiary text-sm">
              {`${totalCount}`} товарів
            </span>
          </div>
        )}
      
        {totalCount === 0 && (
          <div>На жаль, за вашим запитом нічого не знайдено</div>
        )}
        <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
          {products &&
            products?.map(({ name, _id, photo, price, vendorCode }, index) => {
              return (
                <React.Fragment key={_id}>
                  {index === indexOfSpecialCards && (
                    <div
                      key="additional"
                      className="product-card-special relative hover:shadow-lg cursor-pointer rounded-lg"
                    >
                      <>
                        <div className="special-order-cards border border-borderDefault rounded-lg"></div>
                        <div className="wave-shape-card border-x border-b border-borderDefault rounded-lg  hover:shadow-m"></div>
                        <div className="mt-[97px] mobile375:mt-[146px] tablet600:mt-[181px] desktop1200:mt-[223px] flex flex-col grow px-2 desktop1200:px-4 relative">
                          <p className="mb-1 text-base/[22.4px] tablet600:mb-2 tablet600:text-lg/[25.2px] desktop1200:text-2xl/[28.8px] textPrimary text-medium">
                            Не знайшли потрібний товар?
                          </p>
                          <p className="text-textSecondary text-[10px]/[14px] tablet600:text-sm/[19.6px] desktop1200px:text-base/[24px] mb-3 desktop1200:mb-4">
                            Розкажіть, що ви шукаєте, а ми спробуємо доставити.
                          </p>
                          <button
                            type="button"
                            className="relative flex items-center py-xs2 mx-0 gap-1 cursor-pointer border-none active:bg-bgPressedGrey"
                          >
                            <span className="text-sm tablet600:text-base/[22.4px] text-textBrand font-medium">
                              Дізнатись більше
                            </span>
                            {size >= 375 && (
                              <ArrowRight className="w-[24px] h-[24px] stroke-iconBrand fill-none" />
                            )}
                          </button>
                        </div>
                      </>
                    </div>
                  )}
                  <CardItem
                    name={name}
                    id={_id}
                    photo={photo}
                    price={price}
                    vendorCode={vendorCode}
                    index={index}
                    limit={limit}
                  />
                </React.Fragment>
              );
            })}
        </ul>

      </div>
    </>
  );
};

export default CardsList;
