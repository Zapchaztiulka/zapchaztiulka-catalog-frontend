"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/products/productsOperations";
import { LogoIconWithText } from "../Icons/Logo/LogoIconWithText";
import { LogoIcon } from "../Icons/Logo/LogoIcon";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import FooterTablet from "./FooterTablet";

const Footer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const current_year = new Date().getFullYear();
  const data = useSelector(selectCategories);
  const categories = data?.categories;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToHome = () => {
    dispatch(fetchProducts());
  };

    const clickByCategory = (category) => {
    router.push({
      pathname: "/",
      query: { query: category.toLowerCase() },
    });
  };

  return (
    <footer className="container border-t border-borderDefault lg:pt-[42px] py-6 ">
      <div className="flex flex-col justify-between tablet768:gap-3 gap-8">
        <div className=" tablet600:inline-flex  hidden items-center">
          <Link href="/" onClick={handleToHome}>
            <LogoIconWithText />
          </Link>
        </div>

        <Link href="/" className="flex tablet600:hidden items-center">
          <LogoIcon width="56" height="56" />
        </Link>

        <FooterTablet />
        <div className="footer-lists">
          <div className="flex flex-col gap-3">
            <h4 className="text-textTertiary text-lg">Каталог</h4>
            <ul className="text-textPrimary text-base">
              {categories?.map((el) => {
                return (
                  <li
                    key={el._id}
                    className=" footer-items"
                    onClick={() => clickByCategory(el.categoryName)}
                  >
                    {el.categoryName}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 ">
            <h4 className="text-textTertiary text-lg">Покупцеві</h4>
            <ul className="text-textPrimary text-base">
              <li className=" footer-items">
                <p>Онлайн допомога</p>
              </li>
              <li className=" footer-items">
                <p>Доставка та оплата</p>
              </li>
              <li className=" footer-items">
                <p>Про нас</p>
              </li>
              <li className=" footer-items">
                <p>Політика конфіденційності</p>
              </li>
              <li className=" footer-items">
                <p>Договір публічної оферти</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-textTertiary text-lg">Контакти</h4>
            <ul className="text-textPrimary text-base">
              <li className="footer-items ">
                <p>+38 (050) 810 48 82</p>
              </li>
              <li className="footer-items ">
                <p>+38 (050) 810 48 82</p>
              </li>
              <li className="footer-items ">
                <p>+38 (050) 810 48 82</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-textTertiary text-lg">Графік роботи</h4>
            <ul className="text-textPrimary text-base">
              <li className="py-[10px] px-[4px] ">Пн - Пт 8:00-18:00</li>
              <li className="py-[10px] px-[4px] ">Сб - 10:00-18:00</li>
              <li className="py-[10px] px-[4px] ">Нд - вихідний</li>
              <li className="footer-items ">
                <p>Адреса магазину</p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {" "}
          <p className="text-sm text-textSecondary">
            <br />
            &copy;{current_year} Всі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
