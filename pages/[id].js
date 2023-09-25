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
    <div className="mt-[130px] mb-[50px] flex">
      <div className="md:w-[285px] w-[168px] border border-border-default rounded-lg">
        {data && (
          <>
            {" "}
            <p className="md:mb-6 mb-4 md:h-12 h-4 overflow-hidden md:text-xl/[24px] text-sm/[18.2px] md:font-medium text-text-primary">
              {data.name}
            </p>
            <div className="md:h-[190px] h-[112px] w-[168px] md:w-[285px]">
              <Image
                src={data.photo[0].url}
                alt={data.photo[0].alt}
                className="product-img object-cover object-center"
                loading={"lazy"}
                width={285}
                height={190}
              />
            </div>
            <Link legacyBehavior href={{ pathname: "/cart" }}>
              Go to the cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
