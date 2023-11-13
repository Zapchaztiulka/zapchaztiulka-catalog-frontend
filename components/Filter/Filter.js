import PriceFilter from "./PriceFilter";
import TradeMarkFilter from "./TradeMarkFilter";
import CountryFilter from "./CountryFilter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCountryPriceTrademark, selectFilterByCountry } from "@/redux/products/productsSelectors";
import { fetchCountryPriceTrademark } from "@/redux/products/productsOperations";
import { filterProductsByCountry } from "@/redux/filterSlice";

const Filter = () => {

  const dispatch = useDispatch(); 
  const productInfo = useSelector(selectCountryPriceTrademark)
    const filtredProducts = useSelector(selectFilterByCountry);

    useEffect(() => {
    dispatch(fetchCountryPriceTrademark())
  }, [dispatch])


 const filtredByCountry =  (countryName) => {
     dispatch(filterProductsByCountry(countryName));  
  }

  console.log(filtredProducts)


  return (
    <form className="flex flex-col gap-m">
      <PriceFilter />
      <TradeMarkFilter trademarks={productInfo?.trademarks} />
      <CountryFilter
        filtredByCountry={filtredByCountry}
        countries={productInfo?.countries}
      />
      <div className="flex flex-col gap-2">
        <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
          Застосувати
        </button>
        <button
          type="button"
          disabled
          className="disabled:text-textTertiary text-textBrand tablet768:px-6 tablet768:py-3 py-2 w-full tablet768:text-base text-sm tablet768:font-medium corsor-pointer"
        >
          Скинути
        </button>
      </div>
    </form>
  );
};

export default Filter;
