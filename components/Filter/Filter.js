import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import {
  selectCountryPriceTrademark,
  selectTotalCountProduct,
} from '@/redux/products/productsSelectors';
import {
  fetchCountryPriceTrademark,
  fetchTotalCount,
} from '@/redux/products/productsOperations';
import { useRouter } from 'next/router';
import {
  findMaxPrice,
  findMinPrice,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';
import { formatNumberWithSpace } from '@/helpers/actionsWithNumbers';

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const totalCountFromRedux = useSelector(selectTotalCountProduct);
  const [totalCountProducts, setTotalCountProducts] = useState(0);
  const minPriceFromData = findMinPrice(productInfo?.trademarks || 0);
  const maxPriceFromData = findMaxPrice(productInfo?.trademarks || 0);
  const minPrice = formatNumberWithSpace(minPriceFromData || 0);
  const maxPrice = formatNumberWithSpace(maxPriceFromData || 0);

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
  } = useContext(StatusContext);

  useEffect(() => {
    dispatch(fetchCountryPriceTrademark());
  }, [dispatch]);

  const handleOnChangeByTradeMarks = e => {
    const { value, checked } = e.target;
    if (checked) {
      setTrademarks(prev => [...prev, value]);
      setTriggedTrademark(true);
    } else {
      setTrademarks(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setTriggedTrademark(true);
    }
  };

  const handleOnChangeByCountry = e => {
    const { value, checked } = e.target;
    if (checked) {
      setCountry(prev => [...prev, value]);
      setTriggedCountry(true);
    } else {
      setCountry(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setTriggedCountry(true);
    }
  };

  const fetchData = async () => {
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
  };

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
    if (country.length > 0 || trademarks.length > 0 || maxValue || minValue) {
      fetchData();
    } else {
      setTotalCountProducts(0);
    }
  }, [country, trademarks, maxValue, minValue]);

  useEffect(() => {
    if (totalCountFromRedux) {
      setTotalCountProducts(totalCountFromRedux?.totalCount || 0);
    }
  }, [totalCountFromRedux]);

  const isMatchesTrademarks = country => {
    const trademarksForSelectedCountries = getTrademarksForCountries(
      productInfo.countries,
      country
    );
    const results = productInfo.trademarks.map(item => {
      const isMatch = trademarksForSelectedCountries?.includes(item.name);
      return !isMatch;
    });
    setComparisonResultsCountry(results);
    return results;
  };

  const isMatchesCountries = trademark => {
    const countryForSelectedTrademarks = getTCountriesForTrademarks(
      productInfo.trademarks,
      trademark
    );
    const results = productInfo.countries.map(item => {
      const isMatch = countryForSelectedTrademarks?.includes(item.name);
      return !isMatch;
    });
    setComparisonResultsTrademarks(results);
    return results;
  };

  const isDisabledBtn =
    country.length > 0 || trademarks.length > 0 || minValue || maxValue ? true : false;

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

  const resetResults = () => {
    resetLocalStorage();
    if (
      router.query.countries !== undefined ||
      router.query.trademarks !== undefined || minValue || maxValue
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
    router.push(
      `/?page=1&query=&countries=${country}&trademarks=${trademarks}&min=${
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
        comparisonResultsCountry={comparisonResultsCountry}
      />
      <CountryFilter
        countries={productInfo?.countries}
        countryArray={country}
        handleOnChange={handleOnChangeByCountry}
        comparisonResultsTrademarks={comparisonResultsTrademarks}
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
  );
};

export default Filter;
