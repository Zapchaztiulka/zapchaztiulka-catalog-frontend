"use client";
import React, { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useOnKeyDown, useOutsideClick} from "@/hooks/useOnClickOutside";
import Category from "./Category";
import SubCategory from "./SubCategory";
import { Button } from "universal-components-frontend/src/components/buttons";
import { MenuIcon } from "universal-components-frontend/src/components/icons";
import { StatusContext } from "@/context/statusContext";

const Catalog = ({ categories }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState([]);
  const [lengthSubCategory, setLengthSubCategory] = useState();
   const {setCountry, setTrademarks} = useContext(StatusContext);

  const router = useRouter();
  const [index, setIndex] = useState();

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

  const subCategoriesOnclickHandler = subCategoryId => {
    setShowSubMenu(prev => {
      let arr = [...prev];
      arr[subCategoryId] = true;
      return arr;
    });
    const indexCategory = categories.findIndex(el => el._id === subCategoryId);
    setIndex(indexCategory);
    const test = categories.find(el => el._id === subCategoryId);
    setLengthSubCategory(test.subcategories.length);
  };

  const clickBySubCategory = idSubCategory => {
    router.push({
      pathname: '/',
      query: {
        page: 1,
        subcategories: idSubCategory
      },
    });
    clearSubMenuByClick();
     setCountry([])
      setTrademarks([])
  };

  const clickByCategory = idCategory=> {
    router.push({
      pathname: '/',
      query: {
        page: 1,
        categories: idCategory,
      },
    });
     setCountry([]);
     setTrademarks([]);
    close();
  };

  return (
    <div className="desktop1200:mr-s">
      <div ref={refBtn} className="mr-4 hidden tablet768:flex">
        <Button
          buttonType="primary"
          type="button"
          text="Каталог"
          icon={MenuIcon}
          onClick={closeCatalogBtn}
        />
      </div>
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
