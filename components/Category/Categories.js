"use client";
import { ArrowRight } from "@/public/icons";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOnKeyDown, useOutsideClick } from "@/hooks/useOnClickOutside";
import { useRouter } from "next/router";

const Categories = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(selectCategories);
  const [index, setIndex] = useState();
  const categories = data?.categories;
  const {
    setShowCategory,
    showCategory,
    refBtn,
    close,
    setShowSubMenu,
    lengthSubCategory,
    setLengthSubCategory,
  } = props;

  const refCategory = useRef();

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
    findIndex(subCategoryId);
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subCategoryId] = true;
      return arr;
    });
    console.log('click by id')
  };

  const findIndex = (idCategory) => {
    const indexCategory = categories.findIndex((el) => el._id === idCategory);
    setIndex(indexCategory);
    const test = categories.find((el) => el._id === idCategory);
    setLengthSubCategory(test.subcategories.length);
  };

  const clickBySubCategory = (subCategory) => {
    router.push({
      pathname: "/",
      query: { query: subCategory.toLowerCase() },
    });
    clearSubMenuByClick();
  };

  const clickByCategory = (category) => {

      router.push({
        pathname: "/",
        query: { query: category.toLowerCase() },
      });
    
console.log('click by category')
    //  clearSubMenuByClick()
  };

console.log(lengthSubCategory)

  return (
    <>
      {showCategory && (
        <section
          ref={refCategory}
          className="absolute flex top-[92px] bg-bgWhite p-s border-t border-x rounded-b-lg shadow-md shadow-gray-300"
        >
          <div className="min-w-[370px]">
            <ul className="flex flex-col gap-xs text-textPrimary text-base font-medium tracking-textBase">
              {categories?.map((el) => {
                return (
                  <li
                    className="cursor-pointer hover:text-textBrand focus:text-textBrand catalog-menu"
                    key={el._id}
                  >
                    <button
                      type="button"
                      className="w-full border-none b-transparent flex justify-between items-center"
                      onClick={() => {
                        subCategoriesOnclickHandler(el._id);
                            if (lengthSubCategory === 0) {clickByCategory(el.categoryName);}
                        
                      }}
                    >
                      <p>{el.categoryName}</p>
                      {el.subcategories.length > 0 && (
                        <ArrowRight className="stroke-iconPrimary stroke-2 catalog-icon w-[24px] h-[24px]" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {lengthSubCategory > 0 && (
            <div className="min-w-[200px]">
              <ul className="flex flex-col gap-xs pl-m text-textPrimary text-base font-medium tracking-textBase">
                {categories[index]?.subcategories?.map((sub) => {
                  return (
                    <li
                      key={sub._id}
                      className="cursor-pointer hover:text-textBrand focus:text-textBrand"
                    >
                      <button
                        type="button"
                        onClick={() => clickBySubCategory(sub.subcategoryName)}
                      >
                        {sub.subcategoryName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Categories;
