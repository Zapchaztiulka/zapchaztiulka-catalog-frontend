import { getExtension } from "@/helpers/checkExtension";
import { cutArticle, cutText } from "@/helpers/cutTiext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardItem = ({ name, id, photo, price, vendorCode }) => {

  return (
    <Link href={{ pathname: `/product/${id}` }}>
      <li className="product-card">
        <div className="">
          <div className="w-full">
            {(photo.length === 0 || !getExtension(photo[0]?.url)) ? (
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

          <div className="flex flex-col grow tablet768:px-3 tablet768:pt-2 tablet768:pb-3 p-2">
            <p className="mb-1 tablet768:text-sm text-[10px] text-textTertiary">
              Артикул: {cutArticle(vendorCode)}
            </p>
            <h3 className="mobile320:mb-xs tablet600:mb-sPlus desktop1200:mb-m2 overflow-y-hidden mobile320:h-[58px] tablet600:h-[70px] tablet1024:h-[78px] desktop1200:h-[78px] mobile320:text-sm tablet600:text-base desktop1200:text-lg text-textPrimary">
              {cutText(name)}
            </h3>
            <p className="tablet768:mb-2 mb-1 font-medium text-textPrimary tablet768:text-2xl text-lg">
              {price.value} &#8372;
            </p>

            <Link legacyBehavior href={{ pathname: `/product/${id}` }}>
              <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
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