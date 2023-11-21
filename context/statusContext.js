import { createContext, useState } from 'react';
import {
  filterProductsByCountry,
  filterProductsByTradeMarks,
} from '@/redux/filterSlice';
import { useDispatch } from 'react-redux';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [triggeredCountry, setTriggedCountry] = useState(false);
  const [triggeredTrademark, setTriggedTrademark] = useState(false);
  const dispatch = useDispatch();

  let countryChecked = JSON.parse(localStorage.getItem('Country') || '[]');
  let trademarksChecked = JSON.parse(localStorage.getItem('Trademark') || '[]');
  const [country, setCountry] = useState(countryChecked);
   const [trademarks, setTrademarks] = useState(trademarksChecked);
  const [test, setTest] = useState();
    const [comparisonResultsCountry, setComparisonResultsCountry] = useState(
      []
    );
    const [comparisonResultsTrademarks, setComparisonResultsTrademarks] =
      useState([]);


  const resetLocalStorage = () => {
    localStorage.removeItem('Country');
    localStorage.removeItem('Trademark');
    dispatch(filterProductsByCountry());
    dispatch(filterProductsByTradeMarks());
    setTriggedTrademark(false);
    setTriggedCountry(false);
    setCountry([]);
    setTrademarks([]);
    
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
        setTest,
        test,
        comparisonResultsCountry,
        setComparisonResultsCountry,
        comparisonResultsTrademarks,
        setComparisonResultsTrademarks,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
