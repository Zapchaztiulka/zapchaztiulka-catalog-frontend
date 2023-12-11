'use client';
import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import {
  selectCountryPriceTrademark,
  selectTotalCountProduct,
} from '@/redux/products/productsSelectors';
import { fetchTotalCount } from '@/redux/products/productsOperations';
import { useRouter } from 'next/router';
import {
  filterData,
  findMax,
  findMaxPrice,
  findMin,
  findMinPrice,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';
import { formatNumber } from '@/helpers/actionsWithNumbers';

const Filter = ({ searchValue, products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let countries = router.query.countries || [];
  let trademark = router.query.trademarks || [];

  const productInfo = useSelector(selectCountryPriceTrademark);
  const totalCountFromRedux = useSelector(selectTotalCountProduct);
  const [matchPriceForCountry, setMatchPriceForCountry] = useState([]);
  const [matchPriceForTrademark, setMatchPriceForTrademark] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  console.log(products)

  const {
    triggeredCountry,
    setTriggedCountry,
    triggeredTrademark,
    setTriggedTrademark,
    country,
    setCountry,
    trademarks,
    setTrademarks,
    resetLocalStorage,
    comparisonResultsCountry,
    setComparisonResultsCountry,
    comparisonResultsTrademarks,
    setComparisonResultsTrademarks,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    totalCountProducts,
    setTotalCountProducts,
    isResetLocalStorage,
    setIsResetLocalStorage,
    matchTrademarks,
    setMatchTrademarks,
    matchCountries,
    setMatchCountries,
    filtredResultForDisabledTradeMark,
    setFiltredResultForDisabledTrademark,
    filtredResultForDisabledCountry,
    setFiltredResultForDisabledCountry,
  } = useContext(StatusContext);

  const filteredCountries = filterData(productInfo?.countries, country);
  const filteredTrademarks = filterData(productInfo?.trademarks, trademarks);
  const filtredArray = [...filteredCountries, ...filteredTrademarks];
  const minPriceProduct = findMinPrice(filtredArray, productInfo?.trademarks);
  const maxPriceProduct = findMaxPrice(filtredArray, productInfo?.trademarks);
  const minBasePrice = findMin(productInfo?.trademarks);
  const maxBasePrice = findMax(productInfo?.trademarks);
  const minPrice = formatNumber(minPriceProduct || 0);
  const maxPrice = formatNumber(maxPriceProduct || 0);
  const [priceCountry, setPriceCountry] = useState([])
   const [priceTrademark, setPriceTrademark] = useState([]);

  const countriesUrlArray =
    countries.length > 0
      ? countries.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];

  const trademarkUrlArray =
    trademark.length > 0
      ? trademark.split(',').map(element => (element === 'Інше' ? '' : element))
      : [];

  useEffect(() => {
    if (country && countriesUrlArray && router.isReady && router.query) {
      if (countriesUrlArray.length > 0 && country.length === 0) {
        setCountry(countriesUrlArray);
        setTriggedCountry(true);
      }
      if (trademarkUrlArray.length > 0 && trademarks.length === 0) {
        setTrademarks(trademarkUrlArray);
        setTriggedTrademark(true);
      }
    }
  }, [countriesUrlArray.length, trademarkUrlArray.length]);


  // const trademarksArr = [];

  // products?.forEach(product => {
  //   if (product.manufacturer && product.manufacturer.trademark) {
  //     trademarks.push(product.manufacturer.trademark);
  //   }
  // });

  // console.log(trademarksArr);

  // console.log(country);
  // console.log(countriesUrlArray);

  const handleOnChangeByTradeMarks = e => {
    const { value, checked } = e.target;
    setTrademarks(prev => {
      let updatedArray;
      if (checked) {
        updatedArray = [...prev, value];
      } else {
        updatedArray = prev.filter(item => item !== value);
      }
      return updatedArray;
    });
    setTriggedTrademark(true);
  };

  const handleOnChangeByCountry = e => {
    const { value, checked } = e.target;
    setCountry(prev => {
      let updatedArray;
      if (checked) {
        updatedArray = [...prev, value];
      } else {
        updatedArray = prev.filter(item => item !== value);
      }
      return updatedArray;
    });
    setTriggedCountry(true);
  };

  // getting an array of values to enter the price range
  useEffect(() => {
    if (productInfo) {
      const numericMinValue = parseFloat(minValue || minBasePrice);
      const numericMaxValue = parseFloat(maxValue || maxBasePrice);

      const resultArr1 = productInfo?.countries?.map(country => {
        const minInRange = country.minPrice >= numericMinValue;
        const maxInRange = country.maxPrice <= numericMaxValue;
        return !(minInRange && maxInRange);
      });
        const resultArrCountry = productInfo?.countries?.filter(country => {
          const minInRange = country.minPrice >= numericMinValue;
          const maxInRange = country.maxPrice <= numericMaxValue;
          return minInRange && maxInRange;
        });
      console.log(resultArrCountry);

      const resultArr2 = productInfo?.trademarks?.map(trademark => {
        const minInRange = trademark.minPrice >= numericMinValue;
        const maxInRange = trademark.maxPrice <= numericMaxValue;
        return !(minInRange && maxInRange);
      });
          const resultArrTrademark = productInfo?.trademarks?.filter(trademark => {
            const minInRange = trademark.minPrice >= numericMinValue;
            const maxInRange = trademark.maxPrice <= numericMaxValue;
            return minInRange && maxInRange;
          });
      console.log(resultArrTrademark);

      setMatchPriceForCountry(resultArr1);
      setMatchPriceForTrademark(resultArr2);
    }
  }, [minValue, maxValue, productInfo]);
  console.log("matchPriceForTrademark",matchPriceForTrademark);
  console.log('matchPriceForCountry', matchPriceForCountry);
  console.log("comparisonResultsTrademarks",comparisonResultsTrademarks);
  console.log("comparisonResultsCountry",comparisonResultsCountry);

  // getting an array of boolean values to set when the filter values are displayed depending on the price in the filter
  useEffect(() => {
    const shouldReturnArr1 = matchPriceForCountry?.some(
      (value, index) =>
        value === true && comparisonResultsTrademarks[index] !== false
    );

    if (shouldReturnArr1) {
      const reverseResultArr1 = comparisonResultsTrademarks.map(
        (value, index) =>
          matchPriceForCountry[index] === true && value === false ? true : value
      );
      setFiltredResultForDisabledCountry(reverseResultArr1);
    } else setFiltredResultForDisabledCountry(comparisonResultsTrademarks);

    const shouldReturnArr2 = matchPriceForTrademark?.some(
      (value, index) =>
        value === true && comparisonResultsCountry[index] !== false
    );
    if (shouldReturnArr2) {
      const reverseResultArr2 = comparisonResultsCountry.map((value, index) =>
        matchPriceForTrademark[index] === true && value === false ? true : value
      );
      setFiltredResultForDisabledTrademark(reverseResultArr2);
    } else setFiltredResultForDisabledTrademark(comparisonResultsCountry);
  }, [
    comparisonResultsTrademarks,
    matchPriceForTrademark,
    comparisonResultsCountry,
    matchPriceForCountry,
  ]);

  // const fetchData = () => {
  //   dispatch(
  //     fetchTotalCount({
  //       page: 1,
  //       query: searchValue,
  //       limit: 10,
  //       countries: country,
  //       trademarks: trademarks,
  //       minPrice: minValue ? minValue : minBasePrice,
  //       maxPrice: maxValue ? maxValue : maxBasePrice,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (
  //     country.length > 0 ||
  //     trademarks.length > 0 ||
  //     maxValue ||
  //     minValue ||
  //     searchValue
  //   ) {
  //     fetchData();
  //   } else {
  //     setTotalCountProducts(0);
  //   }
  // }, [country, trademarks, maxValue, minValue, searchValue]);

  // useEffect(() => {
  //   if (
  //     totalCountFromRedux &&
  //     (country.length > 0 ||
  //       trademarks.length > 0 ||
  //       maxValue ||
  //       minValue ||
  //       searchValue)
  //   ) {
  //     setTotalCountProducts(totalCountFromRedux?.totalCount || 0);
  //   }
  // }, [
  //   country,
  //   trademarks,
  //   maxValue,
  //   minValue,
  //   searchValue,
  //   totalCountFromRedux?.totalCount,
  // ]);


  const calculateSumsAndCompare = (data1, data2, arr1, arr2) => {
    let countProductsSum1 = 0;
    let countProductsSum2 = 0;
    data1.forEach(country => {
      if (arr1.includes(country.name)) {
        countProductsSum1 += country.countProducts;
      }
    });

    data2.forEach(item => {
      if (arr2.includes(item.name)) {
        countProductsSum2 += item.count;
      }
    });
    return countProductsSum2 === 0
      ? countProductsSum1
      : Math.min(countProductsSum1, countProductsSum2);
  };

  useEffect(() => {
    if (matchCountries.length === 0) {
      const result = calculateSumsAndCompare(
        productInfo.countries,
        matchTrademarks,
        country,
        trademarks
      );
      setTotalCountProducts(result);
    }
    if (matchTrademarks.length === 0) {
      const result = calculateSumsAndCompare(
        productInfo.trademarks,
        matchCountries,
        trademarks,
        country
      );
      console.log(result);
      setTotalCountProducts(result);
    }
  }, [country, trademarks, matchTrademarks, matchCountries]);

  console.log(resultCount);
  // console.log('country', country);
  // console.log('matchTrademarks', matchTrademarks);
  // console.log('trademarks', trademarks);
  // console.log('matchCountries', matchCountries);
  // console.log('matchPriceForTrademark', matchPriceForTrademark);

  useEffect(() => {
    const savedValueMin = localStorage.getItem('MinPrice');
    const savedValueMax = localStorage.getItem('MaxPrice');
    if (savedValueMin) {
      setMinValue(savedValueMin);
    }
    if (savedValueMax) {
      setMaxValue(savedValueMax);
    }
  }, []);

  const handleOnChangeMinPrice = event => {
    let enteredValue = event.target.value.replace(/\s/g, '');
    if (enteredValue === '0') {
      enteredValue = '1';
    }
    if (/^\d*\.?\d*$/.test(enteredValue)) {
      setMinValue(enteredValue);
      localStorage.setItem('MinPrice', enteredValue);
    }
  };

  const handleOnChangeMaxPrice = event => {
    let enteredValue = event.target.value.replace(/\s/g, '');
    if (enteredValue === '0') {
      enteredValue = '1';
    }
    if (/^\d*\.?\d*$/.test(enteredValue)) {
      setMaxValue(enteredValue);
      localStorage.setItem('MaxPrice', enteredValue);
    }
  };

  useEffect(() => {
    if (triggeredCountry && !triggeredTrademark) {
      isMatchesTrademarks(country);
    } else if (triggeredCountry) {
      setTriggedCountry(false);
    }
  }, [country, triggeredCountry]);

  useEffect(() => {
    if (triggeredTrademark && !triggeredCountry) {
      isMatchesCountries(trademarks);
    } else setTriggedTrademark(false);
  }, [trademarks, triggeredTrademark]);

  const isMatchesTrademarks = country => {
    if (productInfo) {
      const trademarksForSelectedCountries = getTrademarksForCountries(
        productInfo.countries,
        country
      );
      setMatchTrademarks(trademarksForSelectedCountries);
      const results = productInfo.trademarks.map(item => {
        const isMatch = trademarksForSelectedCountries?.some(
          selectedCountry => selectedCountry.name === item.name
        );
        return !isMatch;
      });
      setComparisonResultsCountry(results);
      return results;
    }
  };

  const isMatchesCountries = trademark => {
    if (productInfo) {
      const countryForSelectedTrademarks = getTCountriesForTrademarks(
        productInfo.trademarks,
        trademark
      );
      setMatchCountries(countryForSelectedTrademarks);

      const results = productInfo.countries.map(item => {
        const isMatch = countryForSelectedTrademarks?.some(
          selectedCountry => selectedCountry.name === item.name
        );
        return !isMatch;
      });
      setComparisonResultsTrademarks(results);
      return results;
    }
  };

  const isDisabledBtn =
    country.length > 0 || trademarks.length > 0 || minValue || maxValue
      ? true
      : false;

  const resetResults = () => {
    setTotalCountProducts(0);
    resetLocalStorage();
    if (Object.keys(router.query).length !== 0) {
      router.push({
        pathname: '/',
        query: {
          page: 1,
          query: '',
        },
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const filteredCountries = country.map(value =>
      value !== '' ? value : 'Інше'
    );
    const filteredTrademarks = trademarks.map(value =>
      value !== '' ? value : 'Інше'
    );
    router.push(
      `/?page=1&query=${searchValue}&countries=${filteredCountries}&trademarks=${filteredTrademarks}&min=${
        minValue !== '' ? minValue : minPriceProduct
      }&max=${maxValue ? maxValue : maxPriceProduct}`
    );
    localStorage.setItem('Country', JSON.stringify(country));
    localStorage.setItem('Trademark', JSON.stringify(trademarks));

    localStorage.setItem(
      'ForTrademarksDisable',
      JSON.stringify(comparisonResultsCountry)
    );
    localStorage.setItem(
      'ForCountriesDisable',
      JSON.stringify(comparisonResultsTrademarks)
    );
  };

  return (
    <>
      {productInfo && (
        <form
          className="flex flex-col gap-m filter-section tablet1024:w-[241px] desktop1200:w-[261px]"
          onSubmit={handleSubmit}
        >
          <PriceFilter
            maxPrice={maxPrice}
            minPrice={minPrice}
            minValue={minValue}
            maxValue={maxValue}
            handleOnChangeMinPrice={handleOnChangeMinPrice}
            handleOnChangeMaxPrice={handleOnChangeMaxPrice}
          />
          <TradeMarkFilter
            trademarks={productInfo?.trademarks}
            handleOnChange={handleOnChangeByTradeMarks}
            trademarksArray={trademarks}
            matchTrademarks={matchTrademarks}
            filtredResultForDisabledTradeMark={
              comparisonResultsCountry.length === 0 ||
              comparisonResultsCountry.every(value => value === true)
                ? matchPriceForTrademark
                : filtredResultForDisabledTradeMark
            }
          />
          <CountryFilter
            countries={productInfo?.countries}
            countryArray={country}
            handleOnChange={handleOnChangeByCountry}
            matchCountries={matchCountries}
            filtredResultForDisabledCountry={
              comparisonResultsTrademarks.length === 0 ||
              comparisonResultsTrademarks.every(value => value === true)
                ? matchPriceForCountry
                : filtredResultForDisabledCountry
            }
          />
          <div className="flex flex-col gap-2">
            <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
              {totalCountProducts !== 0
                ? `Застосувати (${totalCountProducts})`
                : 'Застосувати'}
            </button>
            <button
              type="button"
              onClick={() => resetResults()}
              disabled={!isDisabledBtn}
              className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-full tablet768:text-base text-sm tablet768:font-medium bg-bgDisable cursor-pointer disabled:cursor-not-allowed"
            >
              Скинути
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Filter;
