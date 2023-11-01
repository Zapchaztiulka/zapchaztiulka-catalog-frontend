"use client";
import React, { useRef, useState } from "react";
import Categories from "./Categories";
import { CatalogIcon } from "@/public/icons";

const Catalog = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState([]);
  const [lengthSubCategory, setLengthSubCategory] = useState(0);
  const refBtn = useRef();

  const close = () => {
    if (showCategory) {
      setShowCategory(false);
    }
  };

  const closeCatalogBtn = () => {
    setShowCategory(!showCategory);
    setLengthSubCategory(0);
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
      <Categories
        refBtn={refBtn}
        close={close}
        showCategory={showCategory}
        setShowCategory={setShowCategory}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
        lengthSubCategory={lengthSubCategory}
        setLengthSubCategory={setLengthSubCategory}
      />
    </div>
  );
};

export default Catalog;
