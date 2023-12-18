'use client';
import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { selectCountryPriceTrademark } from '@/redux/products/productsSelectors';
import { useRouter } from 'next/router';
import {
  calculateSumsAndCompare,
  calculateTotalCount,
  findMax,
  findMin,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';

const Filter = ({ searchValue, trademarkUrlArray, countriesUrlArray }) => {
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const [matchPriceForCountry, setMatchPriceForCountry] = useState([]);
  const [matchPriceForTrademark, setMatchPriceForTrademark] = useState([]);
  const [matchPriceForCountryArray, setMatchPriceForCountryArray] = useState(
    []
  );
  const [matchPriceForTrademarkArray, setMatchPriceForTrademarkArray] =
    useState([]);

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
    matchTrademarks,
    setMatchTrademarks,
    matchCountries,
    setMatchCountries,
    filtredResultForDisabledTradeMark,
    setFiltredResultForDisabledTrademark,
    filtredResultForDisabledCountry,
    setFiltredResultForDisabledCountry,
    minPrice,
    maxPrice,
    setIsModalOpen,
  } = useContext(StatusContext);
  const minBasePrice = findMin(productInfo?.trademarks);
  const maxBasePrice = findMax(productInfo?.trademarks);

  // getting a state - array of countries and trademarks from query of url
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
  }, [countriesUrlArray?.length, trademarkUrlArray?.length]);

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
      setMatchPriceForCountryArray(resultArrCountry);

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
      setMatchPriceForTrademarkArray(resultArrTrademark);

      setMatchPriceForCountry(resultArr1);
      setMatchPriceForTrademark(resultArr2);
    }
  }, [minValue, maxValue, productInfo]);

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

  // getting the count of products depending on the selected countries or trademarks
  useEffect(() => {
    if (productInfo) {
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
        setTotalCountProducts(result);
      }
    }
  }, [country, trademarks, matchTrademarks, matchCountries]);

  // getting the count of products depending on the selected minValue || maxValue
  useEffect(() => {
    if (minValue || maxValue) {
      const result = calculateTotalCount([
        ...matchPriceForCountryArray,
        ...matchPriceForTrademarkArray,
      ]);

      // Receiving the count of products that matching in two arrays
      const matchingResults = matchPriceForCountryArray.map(country => {
        const matchingCountry = country.trademarks.find(trademark => {
          const matchingTrademark = matchPriceForTrademarkArray.find(
            t => t.name === trademark.name
          );
          return matchingTrademark !== undefined;
        });
        return matchingCountry;
      });
      const sumCount = matchingResults.reduce((sum, obj) => sum + obj.count, 0);
      setTotalCountProducts(result - sumCount);
    }
  }, [matchPriceForTrademarkArray, matchPriceForCountryArray]);

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

  // pass an array of countries when selected(checked) value
  useEffect(() => {
    if (triggeredCountry && !triggeredTrademark) {
      isMatchesTrademarks(country);
    } else if (triggeredCountry) {
      setTriggedCountry(false);
    }
  }, [country, triggeredCountry]);

  // pass an array of trademarks when selected(checked) value
  useEffect(() => {
    if (triggeredTrademark && !triggeredCountry) {
      isMatchesCountries(trademarks);
    } else setTriggedTrademark(false);
  }, [trademarks, triggeredTrademark]);

  // getting an array of trademarks that matches to the selected countries and state of boolean values
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

  // getting an array of countries that matches to the selected trademarks and state of boolean values
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
    setIsModalOpen(false);
    const filteredCountries = country.map(value =>
      value !== '' ? value : 'Інше'
    );
    const filteredTrademarks = trademarks.map(value =>
      value !== '' ? value : 'Інше'
    );
    router.push({
      pathname: `/`,
      query: {
        page: 1,
        query: searchValue,
        countries:
          filteredCountries.length > 0
            ? filteredCountries.join(',')
            : filteredCountries,
        trademarks:
          filteredTrademarks.length > 0
            ? filteredTrademarks.join(',')
            : filteredTrademarks,
        min: minValue ? minValue : [],
        max: maxValue ? maxValue : [],
      },
    });
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
          <div className="hidden tablet1024:flex tablet1024:flex-col gap-2">
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
          <div className=" tablet1024:hidden flex gap-2 fixed w-full h-[64px] bottom-0 right-0 mt-[20px] px-s">
            <button
              type="button"
              onClick={() => resetResults()}
              disabled={!isDisabledBtn}
              className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-[167.5px] tablet768:text-base text-sm tablet768:font-medium bg-bgDisable cursor-pointer disabled:cursor-not-allowed"
            >
              Скинути
            </button>
            <button className=" tablet768:px-6 tablet768:py-3 py-2 w-[167.5px] text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
              {totalCountProducts !== 0
                ? `Застосувати (${totalCountProducts})`
                : 'Застосувати'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Filter;
