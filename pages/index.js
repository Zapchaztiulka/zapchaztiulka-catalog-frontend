'use client';
import React, { useContext, useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import CardsList from '@/components/Products/CardsList';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  selectIsLoading,
  selectError,
  selectCountryPriceTrademark,
  selectProducts,
} from '@/redux/products/productsSelectors';
import Loader from '@/components/Loader';
import Filter from '@/components/Filter/Filter';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { FilterIcon } from '@/public/icons';
import FilterMobile from '@/components/Filter/FilterMobile';
import {
  fetchCountryPriceTrademark,
  fetchProducts,
} from '@/redux/products/productsOperations';
import { StatusContext } from '@/context/statusContext';
import { useWindowSize } from '@/hooks/useWindowSize';
import { getLimitByScreenWidth } from '@/helpers/getLimitByScreenWidth';
import { selectCategories } from '@/redux/categories/categoriesSelector';

const StartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(selectIsLoading);
  const data = useSelector(selectProducts);
  const error = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);
  const productInfo = useSelector(selectCountryPriceTrademark);
  const { categories } = useSelector(selectCategories);
  let startPage = router.query.page ? Number(router.query.page) : 1;
  let searchValue = router.query.query || '';
  let countries = router.query.countries || [];
  let trademark = router.query.trademarks || [];
  let minPrice = router.query.min;
  let maxPrice = router.query.max;
  let idCategory = router.query.categories || [];
  let idSubCategory = router.query.subcategories || [];
  const [currentPage, setCurrentPage] = useState(startPage);
  const size = useWindowSize();
  const limit = getLimitByScreenWidth(size);
  const { setCountry, setTrademarks, setIsResetLocalStorage } =
    useContext(StatusContext);

  const countriesUrlArray =
    countries.length > 0
      ? countries.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];
  const trademarkUrlArray =
    trademark.length > 0
      ? trademark.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];
  
  const caterogyUrl =
      idCategory.length === 0 ? idCategory : idCategory?.split(',');
  const subcategoryUrl =
      idSubCategory.length === 0 ? idSubCategory : idSubCategory?.split(',');

  useEffect(() => {
    if (
      countries.length === 0 &&
      trademark.length === 0 &&
      minPrice === undefined &&
      maxPrice === undefined &&
      limit &&
      router.isReady
    ) {
      setIsResetLocalStorage(false);
      dispatch(
        fetchProducts({
          page: router.query.page ? startPage : 1,
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
      console.log('second');
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
    router,
  ]);

  useEffect(() => {
    if (
      (countries.length !== 0 ||
        trademark.length !== 0 ||
        minPrice ||
        maxPrice) &&
      limit
    ) {
      setCountry(countriesUrlArray);
      setTrademarks(trademarkUrlArray);
      dispatch(
        fetchProducts({
          page: router.query.page ? startPage : 1,
          query: searchValue,
          limit: limit,
          countries: countriesUrlArray,
          trademarks: trademarkUrlArray,
          minPrice: minPrice,
          maxPrice: maxPrice,
        })
      );
      setCurrentPage(startPage);
      console.log('third');
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

  const handleChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
    router.push({
      pathname: `/`,
      query: {
        page: value,
        query: searchValue,
        countries: countries,
        trademarks: trademark,
        min: minPrice !== undefined ? minPrice : [],
        max: maxPrice !== undefined ? maxPrice : [],
        categories: idCategory,
        subcategories: subcategoryUrl,
      },
    });
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const storedUserId = localStorage.getItem('userId');
  if (!storedUserId) {
    localStorage.setItem('userId', customAlphabet('0123456789', 24)());
  }

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchCountryPriceTrademark(searchValue));
    }
  }, [searchValue, dispatch, router.isReady]);

  return (
    <>
      <div className="container mt-[130px] flex flex-col tablet1024:flex tablet1024:flex-row gap-s desktop1920:gap-sPlus">
        <div className="hidden tablet1024:block tablet1024:w-[265px] desktop1200:w-[285px] border border-borderDefault rounded-lg shrink-0 p-xs">
          {productInfo ? (
            <Filter
              isLoading={isLoading}
              searchValue={searchValue}
              products={data.products}
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className="tablet1024:hidden">
          <BtnPrimary width={'w-full'} onClick={toggle}>
            <FilterIcon className="w-[24px] h-[24px]" />
            <span>Фільтр</span>
          </BtnPrimary>
          <FilterMobile showFilter={isOpen} toggle={toggle} />
        </div>
        {isLoading && data?.length === 0 && <Loader />}
        <CardsList
          isLoading={isLoading}
          products={data.products}
          totalCount={data?.totalCount}
          searchValue={searchValue}
          size={size}
          limit={limit}
          currentPage={currentPage}
          categories={categories}
          idCategory={idCategory}
          handleChange={handleChange}
          idSubCategory={idSubCategory}
          caterogyUrl={caterogyUrl}
          subcategoryUrl={subcategoryUrl}
        />
      </div>
    </>
  );
};

export default StartPage;
