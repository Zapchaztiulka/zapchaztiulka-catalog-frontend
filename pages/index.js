"use client";
import React from "react";
import { customAlphabet } from "nanoid";

import CardsList from "@/components/Products/CardsList";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectError,
  selectProductsByQuery,
} from "@/redux/products/productsSelectors";
import Loader from "@/components/Loader";
import Filter from "@/components/Filter/Filter";

const Catalog = () => {
  const isLoading = useSelector(selectIsLoading);
  const data = useSelector(selectProductsByQuery);
  const error = useSelector(selectError);

  const storedUserId = localStorage.getItem("userId");
  if (!storedUserId) {
    localStorage.setItem("userId", customAlphabet("0123456789", 24)());
  }

  return (
    <>
      <div className="container mt-[130px] flex gap-s">
        <div className="hidden tablet1024:block tablet1024:w-[265px] desktop1200:w-[285px] border border-borderDefault rounded-lg shrink-0 p-xs">
          <Filter />
        </div>
        {isLoading && data.length === 0 && <Loader />}
        {error && <p>Тут буде повідомлення про помилку</p>}
        <CardsList />
      </div>
    </>
  );
};

export default Catalog;
