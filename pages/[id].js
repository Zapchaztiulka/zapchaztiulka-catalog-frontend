import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Link from "next/link";
import Image from "next/image";
 import { useRouter } from 'next/router';

import React from 'react'


const ProductDetails = () => {
const router = useRouter();
const { id } = router.query;
  
      const { data } = useGetProductByIdQuery(id);
  console.log(data)

  return (
    <div className="mt-[130px] mb-[50px] flex gap-5 border border-border-default rounded-lg py-8 px-5">
      <div className="md:h-[382px] md:w-[570px] ">
        {data && (
          <>
            <div className="md:h-[382px] md:w-[570px]">
              <Image
                src={data.photo[0].url}
                alt={data.photo[0].alt}
                className="product-details object-cover object-center"
                loading={"lazy"}
                width={570}
                height={382}
              />
            </div>
            <Link legacyBehavior href={{ pathname: "/cart" }}>
              Go to the cart
            </Link>
          </>
        )}
      </div>
      <div>
        <h1 className="mb-3">{data?.name}</h1>
        <p className="mb-8 md:text-sm text-[10px] text-tertiary">
          Артикул: {data?.vendorCode}
        </p>
        <p className="md:mb-8 mb-1 font-medium text-text-primary md:text-2xl text-lg">
          {data?.price.value} &#8372;
        </p>
        <button className="min-w-{237px] mb-3 hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3 ">
          <div className="flex justify-center items-center  ">
            <Image
              src="/icons/cart-icon-menu.svg"
              alt="cart"
              className="object-contain"
              width={24}
              height={24}
            />
            <span className="text-white text-sm tracking-[-0.21px]">
              Додати в кошик
            </span>
          </div>
        </button>
        <button className="min-w-{237px] mb-3 hidden md:flex md:justify-between button-secondary lg:px-6 px-3 py-3 ">
          <span className="text-hover-blue text-base font-medium tracking-[-0.24px]">
            Купити в 1 клик
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
