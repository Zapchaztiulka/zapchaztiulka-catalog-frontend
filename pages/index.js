"use client";

import React from 'react'
import { useGetProductsQuery } from '@/redux/services/productApi';
import CardsList from '@/components/CardsList';


const Catalog = () => {

  const { isLoading, isFetching, data, error } = useGetProductsQuery(null);
  

  return (
    <div className="mt-[50px] flex gap-5 min-h-[100vh]">
      <div className="w-[285px] border border-border-default rounded-lg shrink-0">
        Тут буде блок з фільтрами
      </div>
      {(isFetching || isLoading) && <p>Тут буде лоадер</p>}
      {error && <p>Тут буде повідомлення про помилку</p>}
      {data && <CardsList />}
    </div>
  );
};




export default Catalog;
