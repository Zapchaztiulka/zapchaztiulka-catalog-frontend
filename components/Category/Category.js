import { ArrowRight } from "@/public/icons";
import React from "react";

const Category = (props) => {
  const { categories, subCategoriesOnclickHandler, clickByCategory } = props;
  return (
    <ul className="flex flex-col gap-xs text-textPrimary text-base font-medium tracking-textBase">
      {categories?.map((el) => {
        return (
          <li
            className="cursor-pointer hover:text-textBrand focus:text-textBrand catalog-menu"
            key={el._id}
            onMouseEnter={() => {
              subCategoriesOnclickHandler(el._id);
            }}
          >
            <button
              type="button"
              className="w-full border-none b-transparent flex justify-between items-center"
              onClick={() => {
                clickByCategory(el.categoryName);
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
  );
};

export default Category;
