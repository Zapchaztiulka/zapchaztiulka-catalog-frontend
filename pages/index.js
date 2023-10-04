"use client";

import React, { useState } from "react";
import CardsList from "@/components/CardsList";
import { useSelector } from "react-redux";
import { selectProducts } from "@/redux/products/productsSelectors";

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('http://localhoshttps://spares-backend-i2mq.onrender.com/api/products');
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const products = await response.json();
//     return {
//       props: {
//         products,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return {
//       props: {
//         products: [],
//       },
//     };
//   }
// }




const Catalog = ({products}) => {
  // const { isLoading, isFetching, error } = useGetProductsBySearchQuery("");

  // const products = useSelector(selectProducts)
  // console.log(products)

  return (
    <div className="mt-[130px] flex gap-5">
      <div className="hidden md:block w-[285px] border border-border-default rounded-lg shrink-0">
        Тут буде блок з фільтрами
      </div>
      {/* {(isFetching || isLoading) && <p>Тут буде лоадер</p>}
      {error && <p>Тут буде повідомлення про помилку</p>} */}
      <CardsList products={products} />
    </div>
  );
};

export default Catalog;
