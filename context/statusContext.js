import { formatNumber } from '@/helpers/actionsWithNumbers';
import {
  filterData,
  findMaxPrice,
  findMinPrice,
} from '@/helpers/checkForMatchValue';
import { selectCountryPriceTrademark } from '@/redux/products/productsSelectors';
import { setSelected, setSortType } from '@/redux/sortProduct/selectedOptionActions';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const router = useRouter();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [filtredResultForDisabledCountry, setFiltredResultForDisabledCountry] =
    useState([]);
  const [
    filtredResultForDisabledTradeMark,
    setFiltredResultForDisabledTrademark,
  ] = useState([]);
 const dispatch = useDispatch();

  const removeSelectedFromLocalStorage = () => {
    localStorage.removeItem('selected');
    dispatch(setSelected(null));
    dispatch(setSortType(null))
  };

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
    setFiltredResultForDisabledCountry([]);
    setFiltredResultForDisabledTrademark([]);
    removeSelectedFromLocalStorage();
  };

  const backToHomeUrl = () => {
    router.push({
      pathname: '/',
      query: {
        page: 1,
      },
    });
    removeSelectedFromLocalStorage()
  };

  const filteredCountries = filterData(productInfo?.countries, country);
  const filteredTrademarks = filterData(productInfo?.trademarks, trademarks);
  const filtredArray = [...filteredCountries, ...filteredTrademarks];
  const minPriceProduct = findMinPrice(filtredArray, productInfo?.trademarks);
  const maxPriceProduct = findMaxPrice(filtredArray, productInfo?.trademarks);
  const minPrice = formatNumber(minPriceProduct || 0);
  const maxPrice = formatNumber(maxPriceProduct || 0);

  const [showModalOrderSuccessful, setShowModalOrderSuccessful] =
    useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalPreOrder, setShowModalPreOrder] = useState(false);
  const [showModalOneClickOrder, setShowModalOneClickOrder] = useState(false);
  const [showModalAbsentOrder, setShowModalAbsentOrder] = useState(false);
  const [showModalSpecialOrder, setShowModalSpecialOrder] = useState(false);
  const [preOrderId, setPreOrderId] = useState(0);
  const [aviabilityProduct, setAviabilityProduct]=useState('')

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
        filtredResultForDisabledCountry,
        setFiltredResultForDisabledCountry,
        filtredResultForDisabledTradeMark,
        setFiltredResultForDisabledTrademark,
        minPriceProduct,
        maxPriceProduct,
        minPrice,
        maxPrice,
        isModalOpen,
        setIsModalOpen,
        showModalPreOrder,
        setShowModalPreOrder,
        preOrderId,
        setPreOrderId,
        showModalOrderSuccessful,
        setShowModalOrderSuccessful,
        showCartNotification,
        setShowCartNotification,
        showModalCart,
        setShowModalCart,
        showModalOneClickOrder, setShowModalOneClickOrder,showModalAbsentOrder, setShowModalAbsentOrder, showModalSpecialOrder, setShowModalSpecialOrder, aviabilityProduct, setAviabilityProduct
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};
