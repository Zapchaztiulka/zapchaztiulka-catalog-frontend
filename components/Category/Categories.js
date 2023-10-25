"use client";
import { ArrowRight } from "@/public/icons";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOnKeyDown, useOutsideClick } from "@/hooks/useOnClickOutside";

const Categories = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCategories);
  const categories = data?.categories;
  const { setShowCategory, showCategory, refBtn, close, showSubMenu, setShowSubMenu} = props;

  const refCategory = useRef();

  const clearSubMenuByClick = () => {
    close()
    setShowSubMenu([]);
  }

  useOutsideClick(refCategory, refBtn, clearSubMenuByClick);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const clearSubMenu = () => {
    close()
    setShowSubMenu([]);
  };

  useOnKeyDown(clearSubMenu)

  const subCategoriesOnclickHandler = (subCategoryId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subCategoryId] = true;
      return arr;
    });
  };


  return (
    <>
      {showCategory && (
        <section
          ref={refCategory}
          className="absolute top-[92px] bg-bgWhite p-s border-t border-x rounded-b-lg min-w-[377px] shadow-md shadow-gray-300"
        >
          <ul className="flex relative flex-col gap-xs  text-textPrimary text-base font-medium tracking-textBase">
            {categories?.map((el) => {
              return (
                <li
                  className="cursor-pointer hover:text-textBrand focus:text-textBrand catalog-menu"
                  key={el._id}
                  onClick={() => {
                    subCategoriesOnclickHandler(el._id);
                  }}
                >
                  <div className="border-none b-transparent flex justify-between items-center">
                    <p>{el.categoryName}</p>
                    {el.subcategories.length > 0 && (
                      <ArrowRight className="stroke-iconPrimary catalog-icon w-[24px] h-[24px]" />
                    )}
                  </div>
                  {el.subcategories.length > 0 && (
                    <div
                      className={`absolute w-[100%] ${
                        showSubMenu[el._id] ? "block" : "hidden"
                      } top-[-17px] left-[105%] bg-bgWhite p-s border-t border-x rounded-b-lg shadow-md shadow-gray-300`}
                    >
                      <ul className="flex-col gap-xs3 text-textPrimary text-base font-medium tracking-textBase">
                        {el.subcategories.map((sub) => {
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
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default Categories;