"use client";

import React from "react";
import CardsList from "@/components/Products/CardsList";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectError,
  selectProductsByQuery,
} from "@/redux/products/productsSelectors";
import Loader from "@/components/Loader";


const Catalog = () => {
  const isLoading = useSelector(selectIsLoading);
  const data = useSelector(selectProductsByQuery)
 
  const error = useSelector(selectError)
  return (
    <div className="mt-[130px] flex gap-5">
      <div className="hidden md:block w-[285px] border border-borderDefault rounded-lg shrink-0">
        Тут буде блок з фільтрами
      </div>
      {isLoading && data.length ===0 && <Loader/>}
      {error && <p>Тут буде повідомлення про помилку</p>}
      <CardsList/>
    </div>
  );
};

export default Catalog;
