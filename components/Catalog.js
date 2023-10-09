import React, { useEffect, useRef, useState } from "react";
import Categories from "./Categories";
import { CatalogIcon } from "@/public/icons";

const Catalog = () => {
  let [showCategory, setShowCategory] = useState(false);

  const togglShow = () => {
    setShowCategory(!showCategory);
  };

  return (
    <>
      <button className=" " onClick={togglShow} type="button">
        <div className=" justify-center items-center  mr-[15px] hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3">
          <CatalogIcon className="w-[24px] h-[24px] stroke-iconColors-contrast stroke-2 fill-none" />
          <span className="text-white font-medium text-base tracking-[-0.24px]">
            Каталог
          </span>
        </div>
      </button>

      <Categories
        show={showCategory}
        onClickOutside={() => {
          setShowCategory(false);
        }}
      />
    </>
  );
};

export default Catalog;
