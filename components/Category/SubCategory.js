import React from "react";

const SubCategory = (props) => {
   const { categories, index, clickBySubCategory} = props;
  return (
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
  );
};

export default SubCategory;
