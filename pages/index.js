'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import Chips from '@/components/Chips/Chips';
import PaginationProducts from '@/components/Pagination/Pagination';

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
  const { setCountry, setTrademarks, setMinValue, setMaxValue } =
    useContext(StatusContext);
  const [triggerForEmptyChips, setTriggerForEmptyChips] = useState(true);

  let countriesUrlArray =
    countries.length > 0
      ? countries.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];
  let trademarkUrlArray =
    trademark.length > 0
      ? trademark.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];

  const caterogyUrl =
    idCategory.length === 0 ? idCategory : idCategory?.split(',');
  const subcategoryUrl =
    idSubCategory.length === 0 ? idSubCategory : idSubCategory?.split(',');

  const pagesCount = Math.ceil(data?.totalCount / limit);

  const handleDeleteChip = (chipType, index) => {
  
    switch (chipType) {
      case 'country':
        const updatedCountries = [...countriesUrlArray];
        updatedCountries.splice(index, 1);
        dispatchProducts(updatedCountries, trademarkUrlArray);
        console.log(countriesUrlArray);
        router.push({
          pathname: `/`,
          query: {
            page: currentPage,
            query: searchValue,
            countries:
              updatedCountries.length > 0
                ? updatedCountries.join(',')
                : updatedCountries,
            trademarks:
              trademarkUrlArray.length > 0
                ? trademarkUrlArray.join(',')
                : trademarkUrlArray,
            min: minPrice ? minPrice : [],
            max: maxPrice ? maxPrice : [],
          },
        });
        setCountry([]);
        break;
      case 'trademark':
        const updatedTrademarks = [...trademarkUrlArray];
        updatedTrademarks.splice(index, 1);
        dispatchProducts(countriesUrlArray, updatedTrademarks);
        router.push({
          pathname: `/`,
          query: {
            page: currentPage,
            query: searchValue,
            countries:
              countriesUrlArray.length > 0
                ? countriesUrlArray.join(',')
                : countriesUrlArray,
            trademarks:
              updatedTrademarks.length > 0
                ? updatedTrademarks.join(',')
                : updatedTrademarks,
            min: minPrice ? minPrice : [],
            max: maxPrice ? maxPrice : [],
          },
        });
        setTrademarks([]);
        break;
      case 'price':
        setMinValue('');
        setMaxValue('');
        dispatchProducts(countriesUrlArray, trademarkUrlArray);
        router.push({
          pathname: `/`,
          query: {
            page: currentPage,
            query: searchValue,
            countries:
              countriesUrlArray.length > 0
                ? countriesUrlArray.join(',')
                : countriesUrlArray,
            trademarks:
              trademarkUrlArray.length > 0
                ? trademarkUrlArray.join(',')
                : trademarkUrlArray,
            min: minPrice ? minPrice : [],
            max: maxPrice ? maxPrice : [],
          },
        });
        break;
      default:
        break;
    }
  };

  const dispatchProducts = (updatedCountries, updatedTrademarks) => {
    dispatch(
      fetchProducts({
        page: router.query.page ? startPage : 1,
        query: searchValue,
        limit: limit,
        countries: updatedCountries,
        trademarks: updatedTrademarks,
        minPrice: minPrice,
        maxPrice: maxPrice,
        categories: caterogyUrl,
        subcategories: subcategoryUrl,
      })
    );
    setCurrentPage(startPage);
  };

  const emptyCountriesArray = [];
  const emptyTrademarksArray = [];

  // call effect to receive all products
  useEffect(() => {
    if (
      router.query.countries === undefined &&
      router.query.trademarks === undefined &&
      minPrice === undefined &&
      maxPrice === undefined &&
      limit &&
      router.isReady
    ) {
      setCountry([]);
      setTrademarks([]);
      dispatchProducts(emptyCountriesArray, emptyTrademarksArray);
    }
    console.log('me');
  }, [
    dispatch,
    startPage,
    limit,
    searchValue,
    caterogyUrl[0],
    subcategoryUrl[0],
    router.isReady,
    emptyCountriesArray.length,
    emptyTrademarksArray.length,
    countries.length,
    trademark.length,
  ]);

  // console.log(emptyCountriesArray.length);
  // console.log(Object.keys(router.query).length);
  // console.log(router.query);

  // console.log(limit)
  console.log(countries.length);

  // call effect to receive  the selected products (by the filter`s options)
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
      dispatchProducts(countriesUrlArray, trademarkUrlArray);
      console.log('filter me');
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
    countriesUrlArray.length,
    trademarkUrlArray.length,
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
              countriesUrlArray={countriesUrlArray}
              trademarkUrlArray={trademarkUrlArray}
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
        <div>
          <Chips
            countriesUrlArray={countriesUrlArray}
            trademarkUrlArray={trademarkUrlArray}
            handleDeleteChip={handleDeleteChip}
          />
          <CardsList
            isLoading={isLoading}
            products={data.products}
            totalCount={data?.totalCount}
            searchValue={searchValue}
            size={size}
            limit={limit}
            categories={categories}
            idCategory={idCategory}
            idSubCategory={idSubCategory}
            caterogyUrl={caterogyUrl}
            subcategoryUrl={subcategoryUrl}
          />
          <PaginationProducts
            pagesCount={pagesCount}
            products={data.products}
            handleChange={handleChange}
            currentPage={currentPage}
            size={size}
          />
        </div>
      </div>
    </>
  );
};

export default StartPage;
