"use client";
import { useGetProductsBySearchQuery } from "@/redux/services/productApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CardsList = () => {
    
  const router = useRouter()

  const searchValue = router.query.query

  const { data } = useGetProductsBySearchQuery(searchValue || "")

  return (
    <ul className="flex flex-wrap md:gap-5 gap-2 justify-center">

      {data &&
        data.products.map(({ name, _id, photo, price, vendorCode }) => {
          return (
            <li
              className="md:w-[285px] w-[168px] border border-border-default rounded-lg"
              key={_id}
            >
              <div className="">
                <div className="md:h-[190px] h-[112px] w-[168px] md:w-[285px]">
                  <Image
                    src={photo[0].url}
                    alt={photo[0].alt}
                    className="product-img object-cover object-center"
                    loading={"lazy"}
                    width={285}
                    height={190}
                  />
                </div>
                <div className="md:px-3 md:pt-2 md:pb-3 p-2">
                  <p className="mb-1 md:text-sm text-[10px] text-tertiary">
                    Артикул: {vendorCode}
                  </p>
                  <h3 className="md:mb-6 mb-4 md:h-12 h-4 overflow-hidden md:text-xl/[24px] text-sm/[18.2px] md:font-medium text-text-primary">
                    {name}
                  </h3>
                  <p className="md:mb-2 mb-1 font-medium text-text-primary md:text-2xl text-lg">
                    {price.value} &#8372;
                  </p>

                    <Link legacyBehavior href={{ pathname: `/${_id}` }} >
                      <button className=" md:px-6 md:py-3 py-2 w-full text-white md:text-base text-sm md:font-medium state-button ">
                      Додати в кошик
                    </button>                  
                    </Link>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CardsList;
