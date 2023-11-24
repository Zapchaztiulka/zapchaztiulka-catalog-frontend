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
  getNamesByBooleanArray,
  getTCountriesForTrademarks,
  getTrademarksForCountries,
} from '@/helpers/checkForMatchValue';
import { StatusContext } from '@/context/statusContext';

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const totalCountFromRedux = useSelector(selectTotalCountProduct);
  const [totalCountProducts, setTotalCountProducts] = useState(0);
    const minPrice = findMinPrice(productInfo?.trademarks || null);
    const maxPrice = findMaxPrice(productInfo?.trademarks || null);


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
      })
    );
  };

    const handleOnChangeMinPrice = e => {
      const { value } = e.target;
      setMinValue(value);
    };

    const handleOnChangeMaxPrice = e => {
      const { value } = e.target;
      setMaxValue(value);
    };

  useEffect(() => {
    if (country.length > 0 || trademarks.length > 0) {
      fetchData();
    } else {
      setTotalCountProducts(0);
    }
  }, [country, trademarks]);

  useEffect(() => {
    if (totalCountFromRedux) 
      {setTotalCountProducts(totalCountFromRedux?.totalCount || 0);
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

  const isVisibleTrademarks = getNamesByBooleanArray(
    comparisonResultsCountry,
    productInfo?.trademarks
  );
  //  localStorage.setItem(
  //    'Visible Trademark',
  //    JSON.stringify(isVisibleTrademarks)
  //  );

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
    if (
      router.query.countries !== undefined ||
      router.query.trademarks !== undefined
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
      `/?page=1&query=&countries=${country}&trademarks=${trademarks}&min=${minValue}&max=${maxValue}`
    );
    localStorage.setItem('Country', JSON.stringify(country));
    localStorage.setItem('Trademark', JSON.stringify(trademarks));
    localStorage.setItem('Trade1', JSON.stringify(isVisibleTrademarks));
    localStorage.setItem('Country1', JSON.stringify(isVisibleCountries));
    localStorage.setItem('MinPrice', JSON.stringify(minValue));
    localStorage.setItem('MaxPrice', JSON.stringify(maxValue));

    setTrademarksIsDisabled(isVisibleTrademarks);
    setCountriesIsDisabled(isVisibleCountries);
  };

  return (
    <form
      className="flex flex-col gap-m filter-section"
      onSubmit={handleSubmit}
    >
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        minValue={minValue}
        maxValue={maxValue}
        handleOnChangeMinPrice={handleOnChangeMinPrice}
        handleOnChangeMaxPrice={handleOnChangeMaxPrice}
      />
      <TradeMarkFilter
        trademarks={productInfo?.trademarks}
        data={productInfo}
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
