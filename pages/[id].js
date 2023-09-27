"use client";

import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "@/public/icons";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useGetProductByIdQuery(id);
  console.log(data);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-[130px] mb-[50px] flex gap-5 border border-border-default rounded-lg py-8 px-5">
      <div className="md:h-[382px] md:w-[50%] ">
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
      <div className="md:w-[50%] ">
        <h1 className="mb-3">{data?.name}</h1>
        <p className="mb-8 md:text-sm text-[10px] text-tertiary">
          Артикул: {data?.vendorCode}
        </p>
        <p className="md:mb-8 mb-1 font-medium text-text-primary md:text-2xl text-lg">
          {data?.price.value} &#8372;
        </p>
        <div className="flex flex-col gap-3 w-[237px] mb-8">
          <button className="hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3 ">
            <div className="flex justify-center items-center">
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
          <button className="hidden md:flex md:justify-between button-secondary lg:px-6 px-3 py-3 ">
            <span className="text-hover-blue text-base font-medium tracking-[-0.24px]">
              Купити в 1 клик
            </span>
          </button>
        </div>

        <section className="mb-8">
          <h3 className="mb-3">Основні характеристики:</h3>
          <div className="characteristic">
            <span className="characteristic-label">Вага (кг):</span>
            <span className="characteristic-value">{data?.weight}</span>
          </div>
          <div className="characteristic">
            <span className=" characteristic-label">Код:</span>
            <span className="characteristic-value">{data?.weight}</span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Виробник:</span>
            <span className="characteristic-value">
              {data?.manufacturer.trademark}
            </span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Країна:</span>
            <span className="characteristic-value">{data?.weight}</span>
          </div>

          {isOpen && (
            <>
              <div className="characteristic">
                <span className="characteristic-label">Вага (кг):</span>
                <span className="characteristic-value">nnn</span>
              </div>
              <div className="characteristic">
                <span className=" characteristic-label">Код:</span>
                <span className="characteristic-value">bbb</span>
              </div>
              <div className="characteristic">
                <span className="characteristic-label">Виробник:</span>
                <span className="characteristic-value">ddd</span>
              </div>
              <div className="characteristic">
                <span className="characteristic-label">Країна:</span>
                <span className="characteristic-value">ddd</span>
              </div>
            </>
          )}
          {!isOpen ?
            (<button
            type="button"
            onClick={toggle}
            className="flex items-center py-[9px] cursor-pointer border-none active:bg-color-bg-pressed-grey"
          >
          
            <span className="text-base text-default-blue font-medium">
              Усі характеристик
            </span>
            <ArrowDown className="w-[24px] h-[24px] stroke-default-blue fill-none" />
          </button>) :
            (<button
            type="button"
            onClick={toggle}
            className="flex items-center py-[9px] cursor-pointer border-none active:bg-color-bg-pressed-grey"
          >
          
            <span className="text-base text-default-blue font-medium">
              Приховати
            </span>
            <ArrowUp className="w-[24px] h-[24px] stroke-default-blue fill-none" />
          </button>)}
          
        </section>

        <h4 className="mb-3">Опис</h4>
        <p className="text-base text-text-primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
