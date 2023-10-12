import { ArrowLeft, CloseIcon } from '@/public/icons';
import React from 'react'

const SideBarSubCategory = ({ categories, showSubMenu, toggle }) => {

  return (
    <div>
      {categories.subcategories.length > 0 && (
        <div
          className={`absolute w-[100%] ${
            showSubMenu[categories._id] ? "block" : "hidden"
          } -top-[50px] left-0 w-full min-h-screen bg-bgWhite p-s`}
        >
          <div className="flex justify-between items-center mb-9">
            <h3 className="text=lg text-textPrimary font-medium">
              {categories.categoryName}
            </h3>
            <button onClick={toggle}>
              <CloseIcon width="34" height="34" />
            </button>
          </div>
          <button className="flex items-center mb-8 text-base text-textBrand font-medium tracking-textBase">
            <ArrowLeft width="24" height="24" className="stroke-iconBrand" />
            <p>Усі категорії</p>
          </button>
          <ul className="flex-col gap-xs3 text-textPrimary text-base font-medium tracking-textBase">
            {categories.subcategories.map((sub) => {
              return (
                <li key={sub._id} className="">
                  <div>
                    <p className="text-base text-textPrimary cursor-pointer hover:text-textBrand focus:text-textBrand py-[10px] px-xs3">
                      {sub.subcategoryName}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBarSubCategory
