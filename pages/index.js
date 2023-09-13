"use client";

import React from 'react'
import { useGetProductsQuery } from '@/redux/services/productApi';


const Catalog = () => {

  const { isLoading, isFetching, data, error } = useGetProductsQuery(null);
  console.log(data)

  return (
    <div className="h-[50vh] mt-[100px]">
      {(isFetching || isLoading) && <p>Тут буде лоадер</p>}
      {error && <p>Тут буде повідомлення про помилку</p>}
      {data && data.products.map(({ name, _id }) => {
        return (<ul key={_id}>
          <li>{name}</li>
        </ul>)
      })}
    </div>
  );
};




export default Catalog;
