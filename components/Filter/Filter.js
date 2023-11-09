import PriceFilter from "./PriceFilter";
import TradeMarkFilter from "./TradeMarkFilter";
import CountryFilter from "./CountryFilter";

const Filter = () => {

  return (
    <form className="flex flex-col gap-m">
      <PriceFilter />
      <TradeMarkFilter />
      <CountryFilter />
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
