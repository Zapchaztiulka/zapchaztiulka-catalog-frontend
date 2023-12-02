'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { scrollToTop } from '@/helpers/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import {
  selectIsLoading,
  selectProducts,
} from '@/redux/products/productsSelectors';
import { fetchProducts } from '@/redux/products/productsOperations';
import { theme } from '@/helpers/themeMaterial';
import CardItem from './CardItem';
import { StatusContext } from '@/context/statusContext';
import { selectCategories } from '@/redux/categories/categoriesSelector';
import { getLimitByScreenWidth, getNumberOfSpecialCard } from '@/helpers/getLimitByScreenWidth';
import { useWindowSize } from '@/hooks/useWindowSize';
import { ArrowRight } from '@/public/icons';
import { getCategoryName, getSubCategoryName } from '@/helpers/getNameOfCategory';
import Chips from '../Chips/Chips';

const CardsList = ({ isLoading, products, totalCount }) => {
  const router = useRouter();
  let startPage = router.isReady ? Number(router.query.page) : 1;
  const dispatch = useDispatch();
  const { categories } = useSelector(selectCategories);
  const [currentPage, setCurrentPage] = useState(startPage || 1);
  const searchValue = router.isReady ? router.query.query : '';
  let countries = router.query.countries || [];
  let trademark = router.query.trademarks || [];
  let minPrice = router.query.min;
  let maxPrice = router.query.max;
  let idCategory = router.query.categories || [];
  let idSubCategory = router.query.subcategories || [];
  const { setCountry, setTrademarks, minValue, maxValue } =
    useContext(StatusContext);

  const size = useWindowSize();

  const countriesUrlArray =
    countries.length === 0 ? countries : countries?.split(',');
  const trademarkUrlArray =
    trademark.length === 0 ? trademark : trademark?.split(',');
  const caterogyUrl =
    idCategory.length === 0 ? idCategory : idCategory?.split(',');
  const subcategoryUrl =
    idSubCategory.length === 0 ? idSubCategory : idSubCategory?.split(',');

  const limit = getLimitByScreenWidth(size);
  const indexOfSpecialCards = getNumberOfSpecialCard(size);
  const nameOfCategory = getCategoryName(categories, idCategory);
  const nameOfSubCategory = getSubCategoryName(categories, idSubCategory);

  useEffect(() => {
    if (Object.keys(router.query).length === 0 && router.isReady) {
      setCurrentPage(1);
      dispatch(fetchProducts({ page: 1, limit: limit }));
      console.log('me first');
    }
  }, [
    dispatch,
    router.isReady,
    limit,
    Object.keys(router.query).length,
    router.query.query,
  ]);

  useEffect(() => {
    if (
      countriesUrlArray.length === 0 &&
      trademarkUrlArray.length === 0 &&
      minPrice === undefined &&
      maxPrice === undefined &&
      Object.keys(router.query).length !== 0
    ) {
      setCountry([]);
      setTrademarks([]);
      dispatch(
        fetchProducts({
          page: startPage,
          query: searchValue,
          limit: limit,
          countries: countriesUrlArray,
          trademarks: trademarkUrlArray,
          minPrice: minPrice,
          maxPrice: maxPrice,
          categories: caterogyUrl,
          subcategories: subcategoryUrl,
        })
      );
      setCurrentPage(startPage);
      console.log('me second');
    }
  }, [
    dispatch,
    startPage,
    countries.length,
    trademark.length,
    limit,
    searchValue,
    caterogyUrl[0],
    subcategoryUrl[0],
    router.query,
  ]);

  useEffect(() => {
    if (
      countriesUrlArray.length !== 0 ||
      trademarkUrlArray.length !== 0 ||
      minPrice ||
      maxPrice
    ) {
      setCountry(countriesUrlArray);
      setTrademarks(trademarkUrlArray);
      dispatch(
        fetchProducts({
          page: startPage,
          query: searchValue,
          limit: limit,
          countries: countriesUrlArray,
          trademarks: trademarkUrlArray,
          minPrice: minPrice,
          maxPrice: maxPrice,
        })
      );
      setCurrentPage(startPage);
      console.log('me third');
    }
  }, [
    dispatch,
    startPage,
    countries.length,
    trademark.length,
    minPrice,
    maxPrice,
    searchValue,
    limit,
  ]);

  let pagesCount = Math.ceil(totalCount / limit);

  const handleChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
    router.push({
      pathname: `/`,
      query: {
        page: value,
        query: searchValue,
        countries: countriesUrlArray,
        trademarks: trademarkUrlArray,
        minPrice: minPrice !== undefined ? minPrice : [],
        maxPrice: maxPrice !== undefined ? maxPrice : [],
        categories: idCategory,
        subcategories: subcategoryUrl,
      },
    });
  };

  return (
    <>
      {!isLoading && (
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
                {`${data.totalCount}`} товарів
              </span>
            </div>
          )}
          {minValue || (maxValue && <Chips />)}
          <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
            {products &&
              products?.map(
                ({ name, _id, photo, price, vendorCode }, index) => {
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
                                Розкажіть, що ви шукаєте, а ми спробуємо
                                доставити.
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
                }
              )}
          </ul>
          <section>
            {products && pagesCount > 1 && (
              <ThemeProvider theme={theme}>
                <div className="flex justify-center relative">
                  <Pagination
                    shape="rounded"
                    count={pagesCount}
                    siblingCount={1}
                    boundaryCount={size > 480 ? 2 : 1}
                    page={currentPage}
                    onChange={handleChange}
                    onClick={scrollToTop}
                  />
                </div>
              </ThemeProvider>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default CardsList;
