import { createContext, useState } from 'react';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [triggeredCountry, setTriggedCountry] = useState(false);
  const [triggeredTrademark, setTriggedTrademark] = useState(false);

  // Save Checked status
  let countryChecked = JSON.parse(localStorage.getItem('Country') || '[]');
  let trademarksChecked = JSON.parse(localStorage.getItem('Trademark') || '[]');
  const [country, setCountry] = useState(countryChecked);
  const [trademarks, setTrademarks] = useState(trademarksChecked);
  const [comparisonResultsCountry, setComparisonResultsCountry] = useState([]);
  const [comparisonResultsTrademarks, setComparisonResultsTrademarks] =
    useState([]);

  // Save Disabled status
  let trademarksTemp = JSON.parse(localStorage.getItem('Trade1') || '[]');
  let countryTemp = JSON.parse(localStorage.getItem('Country1') || '[]');
  const [countriesIsDisabled, setCountriesIsDisabled] = useState(countryTemp);
  const [trademarksIsDisabled, setTrademarksIsDisabled] =
    useState(trademarksTemp);
  
  // Save price
  // let minPriceStorage = JSON.parse(localStorage.getItem('MinPrice') || 0);
  // let maxPriceStorage = JSON.parse(localStorage.getItem('MaxPrice') || 0);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  
  // let visibleTrademark = JSON.parse(localStorage.getItem('Visible Trademark') || '[]');
  // const [visio, setVisio] = useState(visibleTrademark);
  // console.log(visio);
  
  const resetLocalStorage = () => {
    localStorage.removeItem('Country');
    localStorage.removeItem('Trademark');
    localStorage.removeItem('Trade1');
    localStorage.removeItem('Country1');
    // localStorage.removeItem('MinPrice');
    // localStorage.removeItem('MaxPrice');   
    setTriggedTrademark(false);
    setTriggedCountry(false);
    setCountry([]);
    setTrademarks([]);
    // setMinValue(0);
    // setMaxValue(0);
    setTrademarksIsDisabled([]);
    setCountriesIsDisabled([]);
    setComparisonResultsCountry([]);
    setComparisonResultsTrademarks([]);
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
        countriesIsDisabled,
        setCountriesIsDisabled,
        trademarksIsDisabled,
        setTrademarksIsDisabled,
        minValue,
        setMinValue,
        maxValue,
        setMaxValue,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
