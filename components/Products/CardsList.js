'use client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { scrollToTop } from '@/helpers/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import {
  selectCountryPriceTrademark,
  selectFilterByCountry,
  selectFilterByTrademarks,
  selectFiltredByPrice,
  selectIsLoading,
  selectProducts,
} from '@/redux/products/productsSelectors';
import { fetchProducts } from '@/redux/products/productsOperations';
import { theme } from '@/helpers/themeMaterial';
import CardItem from './CardItem';
import { StatusContext } from '@/context/statusContext';
import { filterProductsByCountry, filterProductsByTradeMarks } from '@/redux/filterSlice';

const CardsList = () => {
  const router = useRouter();
  let startPage = router.isReady ? Number(router.query.page) : 1;
  const dispatch = useDispatch();
  const data = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const [currentPage, setCurrentPage] = useState(startPage || 1);
  const pageSize = 10;
  const searchValue = router.query.query || '';
  let countries = router.query.countries || [];
  let trademark = router.query.trademarks || [];
  const products = data?.products;
  const countriesArray = useSelector(selectFilterByCountry);
  const trademarksArray = useSelector(selectFilterByTrademarks);
  let countryChecked = JSON.parse(localStorage.getItem('Country') || '[]');
  let trademarksChecked = JSON.parse(localStorage.getItem('Trademark') || '[]');
  const {
    resetLocalStorage,
    country,
    trademarks,
    setCountry,
    setTrademarks,
    countryURL,
    comparisonResultsCountry,
    setComparisonResultsCountry,
    comparisonResultsTrademarks,
    setComparisonResultsTrademarks,
    setTriggedCountry,
    setTriggedTrademark,
  } = useContext(StatusContext);

  const dataRequest = {
    page: startPage,
    query: searchValue,
    limit: 10,
    countries: countriesArray,
    trademarks: trademarksArray,
  };

  const countriesUrlArray =
    countries.length === 0 ? countries : countries?.split(',');
  const trademarkUrlArray =
    trademark.length === 0 ? trademark : trademark?.split(',');

  // console.log(countriesUrlArray);
  // console.log(trademarkUrlArray);

  useEffect(() => {
    if (
      (router.asPath =
        '/' && !startPage && (searchValue === undefined || searchValue === ''))
    ) {
      router.push(`/?page=1&query=`, undefined);
      setCurrentPage(1);
      dispatch(fetchProducts({ page: 1, query: '', limit: 10 }));
      console.log('me ');
    }
  }, [dispatch, router.asPath, searchValue]);

  useEffect(() => {
    if (countriesUrlArray.length === 0 && trademarkUrlArray.length === 0) {
      setCountry([]);
      setTrademarks([]);
      resetLocalStorage();
      dispatch(
        fetchProducts({
          page: startPage,
          query: searchValue,
          limit: 10,
          countries: [],
          trademarks: [],
        })
      );
      setCurrentPage(startPage);
      console.log('me 1');
    }
  }, [dispatch, startPage, router.query, searchValue]);

  useEffect(() => {
    if (countriesUrlArray.length !== 0 || trademarkUrlArray.length !== 0) {
      setCountry(countriesUrlArray);
      setTrademarks(trademarkUrlArray);
      dispatch(
        fetchProducts({
          page: startPage,
          query: searchValue,
          limit: 10,
          countries: countriesUrlArray,
          trademarks: trademarkUrlArray,
        })
      );
      setCurrentPage(startPage);
      console.log('me 2');
    }
  }, [dispatch, startPage, router.query, searchValue]);

  let pagesCount = Math.ceil(data?.totalCount / pageSize);

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
      },
    });
  };

  return (
    <>
      <div className="z-10">
        {searchValue !== undefined && searchValue !== '' && !isLoading && (
          <div className="mb-m">
            <h1 className="block desktop1200:inline text-2xl/[28.8px] -tracking-[0.36px] tablet600:text-4xl/[46.8px] tablet600:-tracking-[0.54px] font-normal text-textPrimary">
              Результати пошуку “{`${searchValue}`}”{' '}
            </h1>
            <span className="block desktop1200:inline text-textTertiary text-sm">
              {`${data.totalCount}`} товарів
            </span>
          </div>
        )}
        <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
          {data &&
            products?.map(({ name, _id, photo, price, vendorCode }) => {
              return (
                <CardItem
                  key={_id}
                  name={name}
                  id={_id}
                  photo={photo}
                  price={price}
                  vendorCode={vendorCode}
                />
              );
            })}
        </ul>
        <section>
          {data && pagesCount > 1 && (
            <ThemeProvider theme={theme}>
              <div className="flex justify-center relative">
                <Pagination
                  shape="rounded"
                  count={pagesCount}
                  page={currentPage}
                  onChange={handleChange}
                  onClick={scrollToTop}
                />
              </div>
            </ThemeProvider>
          )}
        </section>
      </div>
    </>
  );
};

export default CardsList;


