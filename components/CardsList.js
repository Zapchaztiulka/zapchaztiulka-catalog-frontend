"use client";
import { useGetProductsQuery } from '@/redux/services/productApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const CardsList = () => {

   const { data } = useGetProductsQuery(null);
   console.log(data.products)

  return (
    <div>
        {data && data.products.map(({ name, _id, photo, price }) => {
         
           
           return (
             <ul key={_id}>
               <li>
                 <div>
                   <div>
                     <div>
                       <Image
                         src="/placeholder-img.webp"
                         alt="ddd"
                                className="object-cover object-center"
                                width="295"
                                height="190"
                       />
                     </div>
                   </div>
                 </div>
                 {name}
               </li>
             </ul>
           );
        })}
    </div>
  )
}

export default CardsList
