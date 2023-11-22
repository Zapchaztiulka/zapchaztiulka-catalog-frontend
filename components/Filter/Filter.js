import PriceFilter from './PriceFilter';
import TradeMarkFilter from './TradeMarkFilter';
import CountryFilter from './CountryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { selectCountryPriceTrademark } from '@/redux/products/productsSelectors';
import { fetchCountryPriceTrademark } from '@/redux/products/productsOperations';
import { useRouter } from 'next/router';
import {
  getNamesByBooleanArray,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
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
    countriesIsDisabled,
    setCountriesIsDisabled,
    trademarksIsDisabled,
    setTrademarksIsDisabled,
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
    productInfo?.trademarks
  );

  const isVisibleCountries = getNamesByBooleanArray(
    comparisonResultsTrademarks,
    productInfo?.countries
  );

  const isDisabledBtn =
    country.length > 0 || trademarks.length > 0 ? true : false;

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
    localStorage.setItem('Country', JSON.stringify(country));
    localStorage.setItem('Trademark', JSON.stringify(trademarks));
    localStorage.setItem('Trade1', JSON.stringify(isVisibleTrademarks));
    localStorage.setItem('Country1', JSON.stringify(isVisibleCountries));
    setTrademarksIsDisabled(isVisibleTrademarks);
    setCountriesIsDisabled(isVisibleCountries);
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
        isVisibleTrademarks={isVisibleTrademarks}
        trademarksIsDisabled={trademarksIsDisabled}
        countryArray={country}
      />
      <CountryFilter
        countries={productInfo?.countries}
        countryArray={country}
        handleOnChange={handleOnChangeByCountry}
        isVisibleCountries={isVisibleCountries}
        countriesIsDisabled={countriesIsDisabled}
        trademarksArray={trademarks}
      />
      <div className="flex flex-col gap-2">
        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
          Застосувати
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
