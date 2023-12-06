import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { selectTotalCountProduct } from '@/redux/products/productsSelectors';
import { fetchTotalCount } from '@/redux/products/productsOperations';
import { useRouter } from 'next/router';
import {
  findMaxPrice,
  findMinPrice,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';
import { formatNumber } from '@/helpers/actionsWithNumbers';

const Filter = ({ productInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const totalCountFromRedux = useSelector(selectTotalCountProduct);
  const minPriceFromData = findMinPrice(productInfo?.trademarks || 0);
  const maxPriceFromData = findMaxPrice(productInfo?.trademarks || 0);
  const minPrice = formatNumber(minPriceFromData || 0);
  const maxPrice = formatNumber(maxPriceFromData || 0);
  const [matchPriceForCountry, setMatchPriceForCountry] = useState([]);
  const [matchPriceForTrademark, setMatchPriceForTrademark] = useState([]);
  const [filtredResultForDisabledCountry, setFiltredResultForDisabledCountry] =
    useState([]);
  const [
    filtredResultForDisabledTradeMark,
    setFiltredResultForDisabledTrademark,
  ] = useState([]);

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
  } = useContext(StatusContext);

  const handleOnChangeByTradeMarks = e => {
    const { value, checked } = e.target;
    setTrademarks(prev => {
      let updatedArray;
      if (checked) {
        updatedArray = [...prev, value];
      } else {
        updatedArray = prev.filter(item => item !== value);
      }
      const isEmptyValueAlreadyExists = prev.some(item => item === '');
      if (checked && value === '' && !isEmptyValueAlreadyExists) {
        updatedArray = [...updatedArray, ''];
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
      const isEmptyValueAlreadyExists = prev.some(item => item === '');
      if (checked && value === '' && !isEmptyValueAlreadyExists) {
        updatedArray = [...updatedArray, ''];
      }
      return updatedArray;
    });
    setTriggedCountry(true);
  };

  useEffect(() => {
    if (productInfo) {
      const numericMinValue = parseFloat(minValue || minPriceFromData);
      const numericMaxValue = parseFloat(maxValue || maxPriceFromData);

      const resultArr1 = productInfo?.countries.map(country => {
        const minInRange = country.minPrice >= numericMinValue;
        const maxInRange = country.maxPrice <= numericMaxValue;
        return !(minInRange && maxInRange);
      });

      const resultArr2 = productInfo?.trademarks?.map(country => {
        const minInRange = country.minPrice >= numericMinValue;
        const maxInRange = country.maxPrice <= numericMaxValue;
        return !(minInRange && maxInRange);
      });

      setMatchPriceForCountry(resultArr1);
      setMatchPriceForTrademark(resultArr2);
    }
  }, [minValue, maxValue, productInfo]);

  useEffect(() => {
    const shouldReturnArr1 = matchPriceForCountry.some(
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

    const shouldReturnArr2 = matchPriceForTrademark.some(
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

  const fetchData = () => {  
      if (minPriceFromData && maxPriceFromData) {
        dispatch(
          fetchTotalCount({
            page: 1,
            query: '',
            limit: 10,
            countries: country,
            trademarks: trademarks,
            minPrice: minValue ? minValue : minPriceFromData,
            maxPrice: maxValue ? maxValue : maxPriceFromData,
          })
        );
      }  
  };

  useEffect(() => {
      if ((country.length > 0 || trademarks.length > 0 || maxValue || minValue) && !isResetLocalStorage) {
        console.log('total');
        fetchData();
      } else {
        setTotalCountProducts(0);
      }
  }, [country, trademarks, maxValue, minValue, isResetLocalStorage]);

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
    if (totalCountFromRedux) {
      setTotalCountProducts(totalCountFromRedux?.totalCount || 0);
    }
  }, [totalCountFromRedux]);

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

      const results = productInfo.trademarks.map(item => {
        const isMatch = trademarksForSelectedCountries?.some(
          selectedCountry =>
            selectedCountry === item.name ||
            (selectedCountry === '' && item.name === '')
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

      const results = productInfo.countries.map(item => {
        const isMatch = countryForSelectedTrademarks?.some(
          selectedCountry =>
            selectedCountry === item.name ||
            (selectedCountry === '' && item.name === '')
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
    resetLocalStorage();
    if (
      router.query.countries !== undefined ||
      router.query.trademarks !== undefined ||
      minValue ||
      maxValue
    ) {
      router.push({
        pathname: '/',
        query: {
          page: 1,
          query: '',
          countries: [],
          trademarks: [],
        },
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  const filteredCountries = country.filter(
    (value, index, array) => value !== '' || array.indexOf('') === index
  );
  const filteredTrademarks = trademarks.filter(
       (value, index, array) => value !== '' || array.indexOf('') === index
     );
    router.push(
      `/?page=1&query=&countries=${filteredCountries}&trademarks=${filteredTrademarks}&min=${
        minValue !== '' ? minValue : minPriceFromData
      }&max=${maxValue ? maxValue : maxPriceFromData}`
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
            filtredResultForDisabledTradeMark={
              comparisonResultsCountry.length === 0
                ? matchPriceForTrademark
                : filtredResultForDisabledTradeMark
            }
          />
          <CountryFilter
            countries={productInfo?.countries}
            countryArray={country}
            handleOnChange={handleOnChangeByCountry}
            filtredResultForDisabledCountry={
              comparisonResultsTrademarks.length === 0
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
