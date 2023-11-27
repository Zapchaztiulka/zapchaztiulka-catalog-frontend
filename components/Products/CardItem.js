"use client";
import { getExtension } from "@/helpers/checkExtension";
import { cutArticle, cutText } from "@/helpers/cutTiext";
import Image from "next/image";
import Link from "next/link";

const CardItem = ({ name, id, photo, price, vendorCode }) => {

  return (
    <li className="cursor-pointer">
      <Link
        href={{ pathname: `/product/${id}` }}
        className="inline-block cards"
      >
        <div className="cards border border-borderDefault rounded-lg hover:shadow-md">
          <div className="">
            {photo.length === 0 || !getExtension(photo[0]?.url) ? (
              <Image
                src="/empty-img.jpeg"
                alt="no image"
                width="0"
                height="0"
                sizes="100vw"
                className="product-card-img object-contain"
              />
            ) : (
              <Image
                src={photo[0]?.url}
                alt={photo[0]?.alt}
                width="0"
                height="0"
                priority
                sizes="100vw"
                className="product-card-img object-contain"
              />
            )}
          </div>

          <div className="flex flex-col grow tablet768:px-3 tablet768:pt-2 tablet768:pb-3 p-2 cards">
            <p className="mb-1 tablet768:text-sm text-[10px] text-textTertiary">
              Артикул: {cutArticle(vendorCode)}
            </p>
            <h3 className="mobile320:mb-xs tablet600:mb-sPlus desktop1200:mb-m2 overflow-y-hidden mobile320:h-[58px] tablet600:h-[70px] tablet1024:h-[78px] desktop1200:h-[78px] mobile320:text-sm tablet600:text-base desktop1200:text-lg text-textPrimary">
              {cutText(name)}
            </h3>
            <p className="tablet768:mb-2 mb-1 font-medium text-textPrimary tablet768:text-2xl/[28.8px] -tracking-[0.36px] text-lg">
              {price.value} &#8372;
            </p>

            <div>
              <button className=" tablet768:px-6 tablet768:py-3 py-2 w-full text-textContrast tablet768:text-base text-sm tablet768:font-medium state-button ">
                Додати в кошик
              </button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CardItem;