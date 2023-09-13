"use client";

import React from 'react'
import { useGetProductsQuery } from '@/redux/services/productApi';
import CardsList from '@/components/CardsList';


const Catalog = () => {

  const { isLoading, isFetching, data, error } = useGetProductsQuery(null);
  

  return (
    <div className="mt-[50px]">
      {(isFetching || isLoading) && <p>Тут буде лоадер</p>}
      {error && <p>Тут буде повідомлення про помилку</p>}
      {data && <CardsList/>}
    </div>
  );
};




export default Catalog;
