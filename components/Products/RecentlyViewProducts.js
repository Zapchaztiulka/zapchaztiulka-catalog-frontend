"use client"
import { getExtension } from '@/helpers/checkExtension';
import { cutArticle, cutText } from '@/helpers/cutTiext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RecentlyViewProducts = ({ productFromLocalStorage }) => {

  return (
    <>
      <section className='mb-6 popular-products overflow-x-auto tablet1024:overflow-visible'>

        <ul className="flex gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1440:gap-sPlus mb-5">
          {productFromLocalStorage &&
            productFromLocalStorage?.map(
              ({ name, _id, photo, price, vendorCode }) => {
                return (
                  <li className=" cursor-pointer" key={_id}>
                    <Link href={{ pathname: `/product/${_id}` }}>
                      <div className="product-card-popular border border-borderDefault rounded-lg hover:shadow-md">
                        <div className="w-full">
                          {photo.length === 0 ||
                          !getExtension(photo[0]?.url) ? (
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
              }
            )}
        </ul>
      </section>
    </>
  );
}

export default RecentlyViewProducts
