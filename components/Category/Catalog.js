import React, { useRef, useState } from "react";
import Categories from "./Categories";
import { CatalogIcon } from "@/public/icons";

const Catalog = () => {
  let [showCategory, setShowCategory] = useState(false);

  const ref = useRef(0);

  const togglShow = () => {
    setShowCategory(!showCategory);
  };

  return (
    <div className="desktop1200:mr-s">
      <button className=" " onClick={togglShow} type="button" ref={ref}>
        <div className=" justify-center items-center  mr-[15px] hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3">
          <CatalogIcon className="w-[24px] h-[24px] stroke-iconContrast stroke-2 fill-none" />
          <span className="text-textContrast font-medium text-base tracking-textBase">
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
    </div>
  );
};

export default Catalog;
