import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Link from "next/link";
 import { useRouter } from 'next/router';

import React from 'react'


const ProductDetails = () => {
const router = useRouter();
const { id } = router.query;
  console.log(id)
  
      const { data } = useGetProductByIdQuery(id);
  console.log(data)

  return (
    <>
      <h1 className="text-red-600">This is Product ID</h1>
      <Link legacyBehavior href={{ pathname: "/cart" }}>
        Go to the cart
      </Link>
    </>
  );
};

export default ProductDetails;
