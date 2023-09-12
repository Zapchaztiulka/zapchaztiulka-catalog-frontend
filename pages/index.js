"use client";

import React from 'react'
import { useGetProductsQuery } from '@/redux/services/productApi';


const Catalog = () => {

  const { isLoading, isFetching, data, error } = useGetProductsQuery(null);
  console.log(data)

  return (
    <div className="h-[50vh] mt-[100px]">
mm 
    </div>
  );
};




export default Catalog;
