import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  selectIsLoading,
  selectCountryPriceTrademark,
  selectProducts,
} from '@/redux/products/productsSelectors';
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
import { scrollToTop } from '@/helpers/scrollToTop';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import EmptySearchPage from '@/components/EmptySearchPage/EmptySearchPage';
import SortFilter from '@/components/SortFilter/SortFilter';
import { selectSelected } from '@/redux/sortProduct/selectSelectedOption';
import {
  setSelected,
  setSelectedLocalStorage,
  setSortType,
} from '@/redux/sortProduct/selectedOptionActions';
import SearchQueryName from '@/components/SearchQueryName/SearchQueryName';
import {
  getCategoryName,
  getSubCategoryName,
} from '@/helpers/getNameOfCategory';
import SkeletonProducts from '@/components/Skeleton/SkeletonProducts';
import SkeletonFilter from '@/components/Skeleton/SkeletonFilter';
import SkeletonPagination from '@/components/Skeleton/SkeletonPagination';

const CardsList = lazy(() => import('../components/Products/CardsList'));
const Filter = lazy(() => import('../components/Filter/Filter'));
const PaginationProducts = lazy(() =>
  import('../components/Pagination/Pagination')
);

const StartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(selectIsLoading);
  const data = useSelector(selectProducts);
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
  const {
    setCountry,
    setTrademarks,
    setMinValue,
    setMaxValue,
    isModalOpen,
    setIsModalOpen,
  } = useContext(StatusContext);

  const { selected, sortType } = useSelector(selectSelected);
  const [isOpenSorting, setIsOpenSorting] = useState(false);
  const [options, setOptions] = useState();

  const toggling = () => setIsOpenSorting(!isOpenSorting);

  useEffect(() => {
    setOptions(['Від дешевих до дорогих', 'Від дорогих до дешевих']);
  }, []);

  // Selected options for sorting products by price
  const onOptionClicked = value => () => {
    if (value === selected) {
      return;
    }
    dispatch(setSelected(value));
    dispatch(setSelectedLocalStorage(value));
    setIsOpenSorting(false);
    let newSortType;
    if (value === 'Від дешевих до дорогих') {
      newSortType = 'smallLarge';
    }
    if (value === 'Від дорогих до дешевих') {
      newSortType = 'largeSmall';
    }
    dispatch(setSortType(newSortType));
    router.push({
      pathname: `/`,
      query: {
        page: value !== selected ? 1 : startPage,
        query: searchValue ? searchValue : [],
        countries: countries,
        trademarks: trademark,
        min: minPrice !== undefined ? minPrice : [],
        max: maxPrice !== undefined ? maxPrice : [],
        categories: idCategory,
        subcategories: subcategoryUrl,
        sortType: newSortType,
      },
    });
  };

  const close = () => {
    setIsOpenSorting(false);
  };

  let countriesUrlArray =
    countries.length > 0
      ? countries
          .split(',')
          .map(element => (element === 'Не зазначено' ? '' : element))
      : [];
  let trademarkUrlArray =
    trademark.length > 0
      ? trademark
          .split(',')
          .map(element => (element === 'Не зазначено' ? '' : element))
      : [];

  const caterogyUrl =
    idCategory.length === 0 ? idCategory : idCategory?.split(',');
  const subcategoryUrl =
    idSubCategory.length === 0 ? idSubCategory : idSubCategory?.split(',');

  const nameOfCategory = getCategoryName(categories, idCategory);
  const nameOfSubCategory = getSubCategoryName(categories, idSubCategory);

  const pagesCount = Math.ceil(data?.totalCount / limit);
  const updatedCountries = [...countriesUrlArray];
  const updatedTrademarks = [...trademarkUrlArray];

  // delete selected chips
  const handleDeleteChip = (chipType, index) => {
    switch (chipType) {
      case 'country':
        updatedCountries.splice(index, 1);
        router.push({
          pathname: `/`,
          query: {
            page: 1,
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
        updatedTrademarks.splice(index, 1);
        router.push({
          pathname: `/`,
          query: {
            page: 1,
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
        router.push({
          pathname: `/`,
          query: {
            page: 1,
            query: searchValue,
            countries:
              countriesUrlArray.length > 0
                ? countriesUrlArray.join(',')
                : countriesUrlArray,
            trademarks:
              trademarkUrlArray.length > 0
                ? trademarkUrlArray.join(',')
                : trademarkUrlArray,
            min: [],
            max: [],
          },
        });
        break;
      default:
        break;
    }
  };

  // call effect to receive all products
  useEffect(() => {
    if (
      countries.length === 0 &&
      trademark.length === 0 &&
      minPrice === undefined &&
      maxPrice === undefined &&
      limit &&
      router.isReady
    ) {
      const fetchData = async () => {
        dispatch(
          fetchProducts({
            page: router.query.page ? startPage : 1,
            query: searchValue ? searchValue : [],
            limit: limit,
            countries: countriesUrlArray,
            trademarks: trademarkUrlArray,
            minPrice: minPrice,
            maxPrice: maxPrice,
            categories: caterogyUrl,
            subcategories: subcategoryUrl,
            sortBy: router.query.sortType ? 'price' : [],
            sortType: router.query.sortType ? router.query.sortType : [],
          })
        );
      };
      fetchData();
      setCurrentPage(startPage);
    }
  }, [
    dispatch,
    startPage,
    countries.length,
    trademark.length,
    limit,
    caterogyUrl[0],
    subcategoryUrl[0],
    router,
  ]);

  // call effect to receive the selected products (by the filter`s options)
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
          query: searchValue ? searchValue : [],
          limit: limit,
          countries: updatedCountries,
          trademarks: updatedTrademarks,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sortBy: router.query.sortType ? 'price' : [],
          sortType: router.query.sortType ? router.query.sortType : [],
        })
      );
      setCurrentPage(startPage);
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
    router,
  ]);

  const handleChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
    router.push({
      pathname: `/`,
      query: {
        page: value,
        query: searchValue ? searchValue : [],
        countries: countries,
        trademarks: trademark,
        min: minPrice !== undefined ? minPrice : [],
        max: maxPrice !== undefined ? maxPrice : [],
        categories: idCategory,
        subcategories: subcategoryUrl,
        sortType: router.query.sortType ? router.query.sortType : [],
      },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    scrollToTop();
  };

  const storedUserId = localStorage.getItem('userId');
  if (!storedUserId) {
    localStorage.setItem('userId', customAlphabet('0123456789', 24)());
  }

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchCountryPriceTrademark(searchValue));
    }
  }, [router.isReady, searchValue]);

  return (
    <>
      <div className="container mt-[72px] tablet1024:mt-[116px] flex flex-col justify-center tablet1024:flex tablet1024:flex-row gap-s desktop1920:gap-sPlus relative">
        {data?.totalCount === 0 && searchValue !== '' && (
          <div className="">
            <EmptySearchPage searchValue={searchValue} />
          </div>
        )}
        <>
          <Suspense fallback={<SkeletonFilter />}>
            <div className="hidden tablet1024:block tablet1024:w-[265px] desktop1200:w-[285px] border border-borderDefault rounded-lg shrink-0 p-xs filter-container">
              <Filter
                isLoading={isLoading}
                searchValue={searchValue}
                products={data.products}
                countriesUrlArray={countriesUrlArray}
                trademarkUrlArray={trademarkUrlArray}
                sortType={sortType}
              />
            </div>
          </Suspense>

          <div className="w-full">
            {router.isReady && (
              <>
                {(idCategory.length !== 0 ||
                  idSubCategory.length !== 0 ||
                  searchValue) && (
                  <Breadcrumbs
                    idCategory={idCategory}
                    idSubCategory={idSubCategory}
                    categories={categories}
                    searchValue={searchValue}
                  />
                )}
                <SearchQueryName
                  searchValue={searchValue}
                  caterogyUrl={caterogyUrl}
                  subcategoryUrl={subcategoryUrl}
                  nameOfCategory={nameOfCategory}
                  nameOfSubCategory={nameOfSubCategory}
                  totalCount={data?.totalCount}
                />
                <Chips
                  countriesUrlArray={countriesUrlArray}
                  trademarkUrlArray={trademarkUrlArray}
                  handleDeleteChip={handleDeleteChip}
                  minPriceURL={minPrice}
                  maxPriceURL={maxPrice}
                />
              </>
            )}

            <div className="flex flex-col gap-3 tablet600:flex-row items-start tablet600:items-center tablet600:gap-2  mb-3">
              <div className="tablet1024:hidden w-full">
                <BtnPrimary width={'w-full'} onClick={openModal}>
                  <FilterIcon className="w-[24px] h-[24px]" />
                  <span>Фільтр</span>
                </BtnPrimary>
                {isModalOpen && (
                  <FilterMobile
                    onClose={closeModal}
                    countriesUrlArray={countriesUrlArray}
                    trademarkUrlArray={trademarkUrlArray}
                    handleDeleteChip={handleDeleteChip}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                  />
                )}
              </div>

              {router.isReady && (
                <div className="">
                  <SortFilter
                    toggling={toggling}
                    selected={selected}
                    options={options}
                    onOptionClicked={onOptionClicked}
                    isOpen={isOpenSorting}
                    close={close}
                  />
                </div>
              )}
            </div>
            <Suspense fallback={<SkeletonProducts />}>
              <div className="cards-container">
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
              </div>
            </Suspense>

            <Suspense fallback={<SkeletonPagination />}>
              <div className="min-h-[32px]">
                <PaginationProducts
                  pagesCount={pagesCount}
                  products={data.products}
                  handleChange={handleChange}
                  currentPage={currentPage}
                  size={size}
                />
              </div>
            </Suspense>
          </div>
        </>
      </div>
    </>
  );
};

export default StartPage;
