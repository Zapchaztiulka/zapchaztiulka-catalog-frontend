import React from "react";
import PriceFilter from "./PriceFilter";
import TradeMarkFilter from "./TradeMarkFilter";
import CountryFilter from "./CountryFilter";

const Filter = () => {


  return (
    <div className="flex flex-col gap-m">
      <PriceFilter />
      <TradeMarkFilter />
    <CountryFilter />
    </div>
  );
};

export default Filter;
