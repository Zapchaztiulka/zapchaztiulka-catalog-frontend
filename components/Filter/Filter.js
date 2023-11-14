import PriceFilter from "./PriceFilter";
import TradeMarkFilter from "./TradeMarkFilter";
import CountryFilter from "./CountryFilter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectCountryPriceTrademark,
  selectFiltred,
} from "@/redux/products/productsSelectors";
import { fetchCountryPriceTrademark } from "@/redux/products/productsOperations";
import { filterProductsByCountry } from "@/redux/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const productInfo = useSelector(selectCountryPriceTrademark);
  const [isChecked, setIsChecked] = useState(false);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    dispatch(fetchCountryPriceTrademark());
  }, [dispatch]);

  const handleOnChange = (e) => {
    const { value, checked } = e.target  
    if (checked) {
      setCountry(prev => [...prev, value])
      setIsChecked(true)     
    }
    else {
      setCountry(prev => {
        return [...prev.filter(item => item !== value)]
      })
      setIsChecked(false) 
    }
  };

    const resetResults = () => {
      setCountry([]);
      dispatch(filterProductsByCountry());
    setIsChecked(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();      
    if (isChecked) {
      dispatch(filterProductsByCountry(country));
    }
  };

  return (
    <form className="flex flex-col gap-m" onSubmit={handleSubmit}>
      <PriceFilter />
      <TradeMarkFilter trademarks={productInfo?.trademarks} />
      <CountryFilter
        countries={productInfo?.countries}
        countryArray={country}
        isChecked={isChecked}
        handleOnChange={handleOnChange}
      />
      <div className="flex flex-col gap-2">
        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
          Застосувати
        </button>
        <button
          type="button"
          onClick={() => resetResults()}
          className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-full tablet768:text-base text-sm tablet768:font-medium cursor-pointer"
        >
          Скинути
        </button>
      </div>
    </form>
  );
};

export default Filter;
