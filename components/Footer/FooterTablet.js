"use client";
import React, { useEffect } from "react";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { useRouter } from "next/router";

const FooterTablet = ({ categories }) => {
  const router = useRouter();

  const clickByCategory = category => {
    router.push({
      pathname: '/',
      query: { query: category.toLowerCase() },
    });
  };

  return (
    <div className="mobile320:hidden tablet1024:hidden tablet768:flex tablet768:justify-between">
      <div className="flex flex-col gap-m">
        <div className="flex flex-col gap-3">
          <h4 className="text-textTertiary text-lg">Каталог</h4>
          <ul className="text-textPrimary text-base">
            {categories?.map(el => {
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
      </div>

      <div className="flex flex-col gap-m">
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
    </div>
  );
};

export default FooterTablet;
