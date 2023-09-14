"use client";
import { useGetProductsQuery } from '@/redux/services/productApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CardsList = () => {

   const { data } = useGetProductsQuery(null);
   console.log(data.products)

  return (
    <ul  className="flex flex-wrap gap-5">
        {data && data.products.map(({ name, _id, photo, price }) => {
         
           
           return (
             <li
               className="w-[285px] border border-border-default rounded-lg"
               key={_id}
             >
               <div className="">
                 <div>
                   <Image
                     src="/placeholder-img.webp"
                     alt={photo[0].alt}
                     className="object-cover object-center product-img"
                     width="285"
                     height="190"
                   />
                 </div>
                 <div className="px-3 pt-2 pb-3">
                   <p className="mb-1 text-sm text-tertiary">Артикул:</p>
                   <h3 className="mb-6 h-12 overflow-hidden text-xl/[24px] font-medium text-text-primary">
                     {name}
                   </h3>
                   <p className="mb-2 font-medium text-text-primary text-2xl">
                     {price.value} &#8372;
                   </p>
                   <button className="px-6 py-3 w-full text-white text-base text-center font-medium state-button ">
                     Додати в кошик
                   </button>
                 </div>
               </div>
             </li>
           );
        })}
    </ul>
  )
}

export default CardsList
