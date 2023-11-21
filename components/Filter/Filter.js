import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { selectCountryPriceTrademark } from '@/redux/products/productsSelectors';
import { fetchCountryPriceTrademark } from '@/redux/products/productsOperations';
import {
  filterProductsByCountry,
  filterProductsByTradeMarks,
} from '@/redux/filterSlice';
import { useRouter } from 'next/router';
import { getNamesByBooleanArray, getTCountriesForTrademarks, getTrademarksForCountries } from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const [isChecked, setIsChecked] = useState(false);
  const [sen, setSen] = useState([])
// console.log(productInfo.trademarks);

  // const [comparisonResultsCountry, setComparisonResultsCountry] = useState([]);
  // const [comparisonResultsTrademarks, setComparisonResultsTrademarks] =
  //   useState([]);
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
  } = useContext(StatusContext);

  useEffect(() => {
    dispatch(fetchCountryPriceTrademark());
    if (country.length !== 0 || trademarks.length !== 0) {
      setIsChecked(true);
    }
  }, [dispatch]);

  const handleOnChangeByCountry = e => {
    const { value, checked } = e.target;
    if (checked) {
      setCountry(prev => [...prev, value]);
      setIsChecked(true);
      setTriggedCountry(true);
    } else {
      setCountry(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setIsChecked(false);
      setTriggedCountry(false);
    }
  };

  const isMatchesTrademarks = country => {
    const trademarksForSelectedCountries = getTrademarksForCountries(
      productInfo.countries,
      country
    );
    const results = productInfo.trademarks.map(item => {
      const isMatch = trademarksForSelectedCountries.includes(item.name);   
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
      const isMatch = countryForSelectedTrademarks.includes(item.name);
      return !isMatch;
    });

    setComparisonResultsTrademarks(results);
    return results;
  };

  const isVisibleTrademarks = getNamesByBooleanArray(
    comparisonResultsCountry,
    productInfo.trademarks
  );
 
  const isVisibleCountries = getNamesByBooleanArray(
    comparisonResultsTrademarks,
    productInfo.countries
  );

  const trademarksArray = productInfo?.trademarks.map((item) => item.name)
  const countriesArray = productInfo?.countries.map((item)=>item.name)

  const visibleTrademarks = country.length === 0 ? trademarksArray : isVisibleTrademarks;
  const visibleCountries =
    trademarks.length === 0 ? countriesArray : isVisibleCountries;
  // console.log(visibleTrademarks);


  useEffect(() => {
    if (triggeredCountry) {
      isMatchesTrademarks(country);
    } else setTriggedCountry(false);
  }, [country, triggeredCountry]);

  useEffect(() => {
    if (triggeredTrademark) {
      isMatchesCountries(trademarks);
    } else setTriggedTrademark(false);
  }, [trademarks, triggeredTrademark]);

  // console.log(sen);

  useEffect(() => {
    setSen(visibleTrademarks);
  }, [country.length]);

  const handleOnChangeByTradeMarks = e => {
    const { value, checked } = e.target;
    if (checked) {
      setTrademarks(prev => [...prev, value]);
      setIsChecked(true);
      setTriggedTrademark(true);
    } else {
      setTrademarks(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setIsChecked(false);
      setTriggedTrademark(false);
    }
  };

  const resetResults = () => {
    resetLocalStorage();
    setComparisonResultsCountry([]);
    setComparisonResultsTrademarks([]);
    setIsChecked(false);
    router.push({
      pathname: '/',
      query: {
        page: 1,
        query: '',
        countries: [],
        trademarks: [],
      },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.push(
      `/?page=1&query=&countries=${country}&trademarks=${trademarks}`
    );
    if (isChecked) {
      dispatch(filterProductsByCountry(country));
      dispatch(filterProductsByTradeMarks(trademarks));
    }
    localStorage.setItem('Country', JSON.stringify(country));
    localStorage.setItem('Trademark', JSON.stringify(trademarks));
  };

  return (
    <form
      className="flex flex-col gap-m filter-section"
      onSubmit={handleSubmit}
    >
      <PriceFilter />
      <TradeMarkFilter
        trademarks={productInfo?.trademarks}
        handleOnChange={handleOnChangeByTradeMarks}
        trademarksArray={trademarks}
        comparisonResults={comparisonResultsCountry}
        onChangeTriggered={triggeredCountry}
      />
      <CountryFilter
        countries={productInfo?.countries}
        countryArray={country}
        handleOnChange={handleOnChangeByCountry}
        comparisonResults={comparisonResultsTrademarks}
        onChangeTriggered={triggeredTrademark}
      />
      <div className="flex flex-col gap-2">
        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
          Застосувати
        </button>
        <button
          type="button"
          onClick={() => resetResults()}
          disabled={!isChecked}
          className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-full tablet768:text-base text-sm tablet768:font-medium cursor-pointer"
        >
          Скинути
        </button>
      </div>
    </form>
  );
};

export default Filter;

