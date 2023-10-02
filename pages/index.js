"use client";

import React, { useState } from "react";
import { useGetProductsBySearchQuery } from "@/redux/services/productApi";
import CardsList from "@/components/CardsList";
import { useSelector } from "react-redux";
import { selectProducts } from "@/redux/products/productsSelectors";

const Catalog = () => {
  const { isLoading, isFetching, error } = useGetProductsBySearchQuery("");

  const products = useSelector(selectProducts)
  console.log(products)

  return (
    <div className="mt-[130px] flex gap-5">
      <div className="hidden md:block w-[285px] border border-border-default rounded-lg shrink-0">
        Тут буде блок з фільтрами
      </div>
      {(isFetching || isLoading) && <p>Тут буде лоадер</p>}
      {error && <p>Тут буде повідомлення про помилку</p>}
      <CardsList  />
    </div>
  );
};

export default Catalog;
