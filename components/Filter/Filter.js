import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCountryPriceTrademark } from '@/redux/products/productsSelectors';
import { fetchCountryPriceTrademark } from '@/redux/products/productsOperations';
import {
  filterProductsByCountry,
  filterProductsByTradeMarks,
} from '@/redux/filterSlice';
import { useRouter } from 'next/router';
import { getTCountriesForTrademarks, getTrademarksForCountries } from '@/helpers/checkForMatchValue';

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const [isChecked, setIsChecked] = useState(false);
  let countryChecked = JSON.parse(localStorage.getItem('Country') || '[]');
  let trademarksChecked = JSON.parse(localStorage.getItem('Trademark') || '[]');
  const [country, setCountry] = useState(countryChecked);
  const [trademarks, setTrademarks] = useState(trademarksChecked);
  const [comparisonResultsCountry, setComparisonResultsCountry] = useState([]);
  const [comparisonResultsTrademarks, setComparisonResultsTrademarks] =
    useState([]);
  const [onChangeTriggered, setOnChangeTriggered] = useState(false);
  const [onChangeTriggeredByTrademarks, setOnChangeTriggeredByTrademarks] =
    useState(false);

  useEffect(() => {
    dispatch(fetchCountryPriceTrademark());
  }, [dispatch]);

  const handleOnChangeByCountry = e => {
    const { value, checked } = e.target;
    if (checked) {
      setCountry(prev => [...prev, value]);
      setIsChecked(true);
      setOnChangeTriggered(true);
    } else {
      setCountry(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setIsChecked(false);
      setOnChangeTriggered(false);
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

  useEffect(() => {
    if (onChangeTriggered) {   
      isMatchesTrademarks(country);
    } else setOnChangeTriggered(false)
  }, [country, onChangeTriggered]);

  useEffect(() => {
    if (onChangeTriggeredByTrademarks) {
      isMatchesCountries(trademarks);
    } else setOnChangeTriggeredByTrademarks(false);
  }, [trademarks, onChangeTriggeredByTrademarks]);


  const handleOnChangeByTradeMarks = e => {
    const { value, checked } = e.target;
    if (checked) {
      setTrademarks(prev => [...prev, value]);
      setIsChecked(true);
      setOnChangeTriggeredByTrademarks(true);
    } else {
      setTrademarks(prev => {
        return [...prev.filter(item => item !== value)];
      });
      setIsChecked(false);
      setOnChangeTriggeredByTrademarks(false);
    }
  };

  const resetResults = () => {
    setCountry([]);
    setOnChangeTriggered(false);
    setOnChangeTriggeredByTrademarks(false);
    setTrademarks([]);
    setComparisonResultsCountry([]);
    setComparisonResultsTrademarks([]);
    dispatch(filterProductsByCountry());
    dispatch(filterProductsByTradeMarks());
    setIsChecked(false);
    router.push(`/?page=1&query=`, undefined);
    localStorage.removeItem('Country');
    localStorage.removeItem('Trademark');
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.push(`/?page=1&query=`, undefined);
    if (isChecked) {
      dispatch(filterProductsByCountry(country));
      dispatch(filterProductsByTradeMarks(trademarks));
    }
    localStorage.setItem('Country', JSON.stringify(country));
    localStorage.setItem('Trademark', JSON.stringify(trademarks));
  };

  return (
    <form className="flex flex-col gap-m" onSubmit={handleSubmit}>
      <PriceFilter />
      <TradeMarkFilter
        trademarks={productInfo?.trademarks}
        handleOnChange={handleOnChangeByTradeMarks}
        trademarksArray={trademarks}
        comparisonResults={comparisonResultsCountry}
        onChangeTriggered={onChangeTriggered}
      />
      <CountryFilter
        countries={productInfo?.countries}
        countryArray={country}
        handleOnChange={handleOnChangeByCountry}
        comparisonResults={comparisonResultsTrademarks}
        onChangeTriggered={onChangeTriggeredByTrademarks}
      />
      <div className="flex flex-col gap-2">
        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
          Застосувати
        </button>
        <button
          type="button"
          onClick={() => resetResults()}
          // disabled={!isChecked}
          className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-full tablet768:text-base text-sm tablet768:font-medium cursor-pointer"
        >
          Скинути
        </button>
      </div>
    </form>
  );
};

export default Filter;
