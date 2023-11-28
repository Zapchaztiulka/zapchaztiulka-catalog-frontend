"use client";
import React, {  useEffect, useRef, useState } from "react";
import { CatalogIcon } from "@/public/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import { useOnKeyDown, useOutsideClick} from "@/hooks/useOnClickOutside";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import Category from "./Category";
import SubCategory from "./SubCategory";

const Catalog = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState([]);
  const [lengthSubCategory, setLengthSubCategory] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(selectCategories);
  const [index, setIndex] = useState();
  const categories = data?.categories;
  const refBtn = useRef();
  const refCategory = useRef();

  const close = () => {
    if (showCategory) {
      setShowCategory(false);
    }
  };

  const closeCatalogBtn = () => {
    setShowCategory(!showCategory);
    setLengthSubCategory(0);
  };

  const clearSubMenuByClick = () => {
    close();
    setLengthSubCategory(0);
  };

  const clearSubMenuByEscape = () => {
    setShowCategory(false);
    setLengthSubCategory(0);
  };

  useOnKeyDown(clearSubMenuByEscape);
  useOutsideClick(refCategory, refBtn, clearSubMenuByClick);

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
  };

    const clickBySubCategory = (idSubCategory) => {
    router.push({
      pathname: '/',
      query: { subcategories: idSubCategory, page: 1 },
    });
    clearSubMenuByClick();
  };

  const clickByCategory = (idCategory, nameCategory) => {
    router.push({
      pathname: '/',
      query: {
        categories: idCategory,
        page: 1,
      },
    });
    close();  
  };

  return (
    <div className="desktop1200:mr-s">
      <button
        ref={refBtn}
        onClick={closeCatalogBtn}
        className=" justify-center items-center  mr-[15px] hidden tablet768:flex tablet768:justify-between state-button lg:px-6 px-3 py-3 border-none outline-none"
      >
        <CatalogIcon className="w-[24px] h-[24px] stroke-iconContrast stroke-2 fill-none" />
        <span className="text-textContrast font-medium text-base tracking-textBase">
          Каталог
        </span>
      </button>
      <>
        {showCategory && (
          <section
            ref={refCategory}
            className="absolute flex gap-xs top-[92px] bg-bgWhite p-s border-t border-x rounded-b-lg shadow-md shadow-gray-300"
          >
            <div className="min-w-[370px]">
              <Category
                categories={categories}
                subCategoriesOnclickHandler={subCategoriesOnclickHandler}
                clickByCategory={clickByCategory}
              />
            </div>
            {lengthSubCategory > 0 && (
              <div className="min-w-[200px]">
                <SubCategory
                  categories={categories}
                  index={index}
                  clickBySubCategory={clickBySubCategory}
                />
              </div>
            )}
          </section>
        )}
      </>
    </div>
  );
};

export default Catalog;
