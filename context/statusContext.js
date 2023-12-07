import { useRouter } from 'next/router';
import { createContext, useState } from 'react';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const router = useRouter();
  const [triggeredCountry, setTriggedCountry] = useState(false);
  const [triggeredTrademark, setTriggedTrademark] = useState(false);

  let countryChecked = JSON.parse(localStorage.getItem('Country') || '[]');
  let trademarksChecked = JSON.parse(localStorage.getItem('Trademark') || '[]');
  const [country, setCountry] = useState(countryChecked);
  const [trademarks, setTrademarks] = useState(trademarksChecked);

  let disabledForTrademarks = JSON.parse(
    localStorage.getItem('ForTrademarksDisable') || '[]'
  );
  let disabledForCountries = JSON.parse(
    localStorage.getItem('ForCountriesDisable') || '[]'
  );
  const [comparisonResultsCountry, setComparisonResultsCountry] = useState(
    disabledForTrademarks
  );
  const [comparisonResultsTrademarks, setComparisonResultsTrademarks] =
    useState(disabledForCountries);
  const [totalCountProducts, setTotalCountProducts] = useState(0);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [matchTrademarks, setMatchTrademarks] = useState([]);
  const [matchCountries, setMatchCountries] = useState([]);
  const [isResetLocalStorage, setIsResetLocalStorage] = useState(true);

  const resetLocalStorage = () => {
    localStorage.removeItem('Country');
    localStorage.removeItem('Trademark');
    localStorage.removeItem('MinPrice');
    localStorage.removeItem('MaxPrice');
    localStorage.removeItem('ForTrademarksDisable');
    localStorage.removeItem('ForCountriesDisable');
    setTriggedTrademark(false);
    setTriggedCountry(false);
    setCountry([]);
    setTrademarks([]);
    setMinValue('');
    setMaxValue('');
    setComparisonResultsCountry([]);
    setComparisonResultsTrademarks([]);
    setTotalCountProducts(0);
    setMatchTrademarks([]);
    setMatchCountries([]);
  };

  const backToHomeUrl = () => {
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

  return (
    <StatusContext.Provider
      value={{
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
        backToHomeUrl,
        totalCountProducts,
        setTotalCountProducts,
        matchTrademarks,
        setMatchTrademarks,
        matchCountries,
        setMatchCountries,
        isResetLocalStorage,
        setIsResetLocalStorage,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
