import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardItem = ({ name, id, photo, price, vendorCode }) => {
  
  return (
    <Link href={{ pathname: `/product/${id}` }}>
      <li className="product-card">
        <div className="">
          <div>
            {photo.length === 0 ? (
              <Image
                src="/empty-img.jpeg"
                alt="no image"
                width="0"
                height="0"
                sizes="100vw"
                className="product-card-img "
              />
            ) : (
              <Image
                src={photo[0]?.url}
                alt={photo[0]?.alt}
                width="0"
                height="0"
                priority
                sizes="100vw"
                className="product-card-img "
              />
            )}
          </div>
          <div className="md:px-3 md:pt-2 md:pb-3 p-2">
            <p className="mb-1 md:text-sm text-[10px] text-textTertiary">
              Артикул: {vendorCode}
            </p>
            <h3 className="md:mb-6 mb-4 md:h-12 h-4 overflow-hidden md:text-xl/[24px] text-sm/[18.2px] md:font-medium text-textPrimary">
              {name}
            </h3>
            <p className="md:mb-2 mb-1 font-medium text-textPrimary md:text-2xl text-lg">
              {price.value} &#8372;
            </p>

            <Link legacyBehavior href={{ pathname: `/product/${id}` }}>
              <button className=" md:px-6 md:py-3 py-2 w-full text-textContrast md:text-base text-sm md:font-medium state-button ">
                Додати в кошик
              </button>
            </Link>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default CardItem;
