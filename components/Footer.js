import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/products/productsOperations";

const Footer = () => {
  const dispatch = useDispatch();
  const current_year = new Date().getFullYear();

    const handleToHome = () => {
    dispatch(fetchProducts());
  };

  return (
    <div className="flex flex-col justify-between md:gap-3 gap-8">
      <div className=" md:inline-flex  hidden items-center">
        <Link href="/" onClick={handleToHome}>
          <Image
            src="/logo-main.svg"
            alt="logo"
            className="object-contain"
            width={248}
            height={60}
          />
        </Link>
      </div>

      <Link href="/" className="flex md:hidden items-center">
        <Image
          src="/logo-blue.svg"
          alt="logo"
          className="object-contain"
          width={50}
          height={48}
        />
      </Link>
      <div className="footer-lists">
        <div className="flex flex-col gap-3">
          <h4 className="text-tertiary text-lg">Каталог</h4>
          <ul className="text-text-primary text-base">
            <li className=" footer-items">
              <a>Запчастини до сільгосптехніки</a>
            </li>
            <li className=" footer-items">
              <a>Запчастини до вантажних автомобілів</a>
            </li>
            <li className=" footer-items">
              <a>Масла і автохімія</a>
            </li>
            <li className=" footer-items">
              <a>Шини та камери</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 ">
          <h4 className="text-tertiary text-lg">Покупцеві</h4>
          <ul className="text-text-primary text-base">
            <li className=" footer-items">
              <a>Онлайн допомога</a>
            </li>
            <li className=" footer-items">
              <a>Доставка та оплата</a>
            </li>
            <li className=" footer-items">
              <a>Про нас</a>
            </li>
            <li className=" footer-items">
              <a>Політика конфіденційності</a>
            </li>
            <li className=" footer-items">
              <a>Договір публічної оферти</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-tertiary text-lg">Контакти</h4>
          <ul className="text-text-primary text-base">
            <li className="footer-items ">
              <a>+38 (050) 810 48 82</a>
            </li>
            <li className="footer-items ">
              <a>+38 (050) 810 48 82</a>
            </li>
            <li className="footer-items ">
              <a>+38 (050) 810 48 82</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-tertiary text-lg">Графік роботи</h4>
          <ul className="text-text-primary text-base">
            <li className="py-[10px] px-[4px] ">Пн - Пт 8:00-18:00</li>
            <li className="py-[10px] px-[4px] ">Сб - 10:00-18:00</li>
            <li className="py-[10px] px-[4px] ">Нд - вихідний</li>
            <li className="footer-items ">
              <a>Адреса магазину</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {" "}
        <p className="text-sm text-text-secondary">
          <br />
          &copy;{current_year} Всі права захищені
        </p>
      </div>
    </div>
  );
};

export default Footer;
