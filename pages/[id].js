"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, CartIcon } from "@/public/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "@/redux/products/productsSelectors";
import { fetchProductByID } from "@/redux/products/productsOperations";
import { availabilityText, aviabilityType } from "@/helpers/aviabilityProduct";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const product = useSelector(selectProduct);

      useEffect(() => {
        dispatch(fetchProductByID(id));
    }, [dispatch, id]);

  console.log(product);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="mt-[130px] mb-[50px] flex gap-5 border border-border-default rounded-lg py-8 px-5">
      <div className="md:h-[382px] md:w-[50%] ">
        {product && (
          <>
            <div className="md:h-[382px] md:w-[570px]">
             {product.photo.length===0? ( <Image
                  src="/empty-img.jpeg"
                  alt="no image"
                  className="product-details object-cover object-center"
                  loading={"lazy"}
                  width={570}
                  height={382}
                />):( <Image
                  src={product.photo[0].url}
                  alt={product.photo[0].alt}
                  className="product-details object-cover object-center"
                  loading={"lazy"}
                  width={570}
                  height={382}
                />)}
               
              
            </div>
            <Link legacyBehavior href={{ pathname: "/cart" }}>
              Go to the cart
            </Link>
          </>
        )}
      </div>
      <div className="md:w-[50%] ">
        <h1 className="mb-3">{product?.name}</h1>
        <p className="mb-8 md:text-sm text-[10px] text-tertiary">
          Артикул: {product?.vendorCode}
        </p>
        <p className="md:mb-xs2 mb-1 font-medium text-text-primary md:text-2xl text-lg">
          {product?.price.value} &#8372;
        </p>

        <p
          style={{
            backgroundColor: `${aviabilityType(product?.availability)}`,
            color: `${availabilityText(product?.availability)}`,
            padding: "6px",
            marginBottom: "16px",
          }}
          className='inline-block text-sm font-medium py-xs3 px-xs mb-s border rounded-borderRadius-medium3 text-center'
        >
          {product?.availability}
        </p>

        <div className="flex flex-col gap-3 w-[237px] mb-8">
          <button className="hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3 ">
            <div className="flex justify-center items-center">
              <CartIcon className="w-[24px] h-[24px] fill-iconColors-contrast" />
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
            <span className="characteristic-value">{product?.weight}</span>
          </div>
          <div className="characteristic">
            <span className=" characteristic-label">Код:</span>
            <span className="characteristic-value">{product?.weight}</span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Виробник:</span>
            <span className="characteristic-value">
              {product?.manufacturer.trademark}
            </span>
          </div>
          <div className="characteristic">
            <span className="characteristic-label">Країна:</span>
            <span className="characteristic-value">{product?.weight}</span>
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
          {!isOpen ? (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center py-[9px] cursor-pointer border-none active:bg-color-bg-pressed-grey"
            >
              <span className="text-base text-default-blue font-medium">
                Усі характеристик
              </span>
              <ArrowDown className="w-[24px] h-[24px] stroke-default-blue fill-none" />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggle}
              className="flex items-center py-[9px] cursor-pointer border-none active:bg-color-bg-pressed-grey"
            >
              <span className="text-base text-default-blue font-medium">
                Приховати
              </span>
              <ArrowUp className="w-[24px] h-[24px] stroke-default-blue fill-none" />
            </button>
          )}
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
