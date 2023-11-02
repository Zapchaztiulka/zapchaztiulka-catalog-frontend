"use client";
import { useRouter } from "next/router";
import { ArrowRight, CloseIcon } from "@/public/icons";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarSubCategory from "./SideBarSubCategory";

const SideBarCatalog = ({ showCategory, isOpen, closeMenu, togglShow }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = useSelector(selectCategories);
  const categories = data?.categories;
  const [index, setIndex] = useState();
  const [lengthSubCategory, setLengthSubCategory] = useState();
  const [showSubMenu, setShowSubMenu] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const subCategoriesOnclickHandler = (subCategoryId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subCategoryId] = true;
      return arr;
    });
    const indexCategory = categories.findIndex(
      (el) => el._id === subCategoryId
    );
    setIndex(indexCategory);
    const test = categories.find((el) => el._id === subCategoryId);
    setLengthSubCategory(test.subcategories.length);
    setShow(!show);
  };

  const closeCategory = () => {
    closeMenu();
    setShow(false);
  };

  const clickByCategory = (nameCategory) => {
    router.push({
      pathname: "/",
      query: { query: nameCategory },
    });
    closeCategory();
  };

    const clickBySubCategory = (subCategory) => {
    router.push({
      pathname: "/",
      query: { query: subCategory.toLowerCase() },
    });
     closeCategory();
  };

  const visibleStyle = {
    opacity: `${isOpen ? "1" : "0"}`,
    top: ` ${isOpen ? "0" : "-100%"}`,
    left: `${isOpen ? "0" : "0"}`,
  };

  return (
    <section
      className={`${
        showCategory
          ? "flex flex-col fixed w-full min-h-screen bg-bgWhite px-s py-m"
          : "hidden"
      }   `}
      style={visibleStyle}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="font-medium text-textPrimary text-lg">Каталог</p>
        <button onClick={closeCategory}>
          <CloseIcon width="34" height="34" className="stroke-iconPrimary" />
        </button>
      </div>
      <ul className="flex relative flex-col gap-s text-textPrimary text-base font-medium tracking-textBase">
        {categories?.map((el) => {
          return (
            <li
              className="cursor-pointer hover:text-textBrand focus:text-textBrand catalog-menu"
              key={el._id}
            >
              <div className="border-none b-transparent flex justify-between items-center">
                <p
                  onClick={() => {
                    clickByCategory(el.categoryName);
                  }}
                >
                  {el.categoryName}
                </p>
                {el.subcategories.length > 0 && (
                  <ArrowRight
                    onClick={() => {
                      subCategoriesOnclickHandler(el._id);
                    }}
                    className="stroke-iconPrimary fill-none w-[24px] h-[24px] hover:bg-borderDisabled catalog-icon"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <SideBarSubCategory
        categories={categories}
        closeCategory={closeCategory}
        show={show}
        setShow={setShow}
        index={index}
        lengthSubCategory={lengthSubCategory}
        clickBySubCategory={clickBySubCategory}
      />
    </section>
  );
};

export default SideBarCatalog;
