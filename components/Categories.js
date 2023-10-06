import { ArrowRight } from "@/public/icons";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const Categories = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCategories);
  const categories = data?.categories;
  const ref = useRef(null);
  const { onClickOutside } = props;

  const [showSubMenu, setShowSubMenu] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useOnClickOutside(ref, onClickOutside, setShowSubMenu);

  const subCategoriesOnclickHandler = (subCategoryId) => {
    setShowSubMenu((prev) => {
      let arr = [...prev];
      arr[subCategoryId] = true;
      return arr;
    });
  };

  return (
    <section
      ref={ref}
      className={`${
        props.show ? "block" : "hidden"
      } absolute top-[92px] bg-bgColors-white p-s border-t border-x rounded-b-lg min-w-[377px] h-[518px]`}
    >
      <ul className="flex relative flex-col gap-xs text-textColors-primary text-base font-medium tracking-textBase">
        {categories?.map((el) => {
          return (
            <li
              className=""
              key={el._id}
              onClick={() => subCategoriesOnclickHandler(el._id)}
            >
              <Link
                href="./"
                className="border-none cursor-pointer b-transparent flex justify-between items-center"
              >
                <div>{el.categoryName}</div>
                <ArrowRight className="stroke-iconColors-secondary w-[44] h-[44]" />
              </Link>
              <div
                className={`absolute w-[100%] ${
                  showSubMenu[el._id] ? "block" : "hidden"
                } top-[-17px] left-[105%] bg-bgColors-white p-s border-t border-x rounded-b-lg`}
              >
                <ul className="flex-col gap-xs3 text-textColors-primary text-base font-medium tracking-textBase">
                  {el.subcategories.length > 0 ? (
                    el.subcategories.map((sub) => {
                      return (
                        <li key={sub._id}>
                          <Link
                            href="./"
                            className="border-none cursor-pointer b-transparent flex justify-between items-center"
                          >
                            <p className="text-base text-textColors-primary py-[10px] px-xs3">
                              {sub.subcategoryName}
                            </p>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <p className="text-text-secondary text-[15px] mb-4 ">
                      Підкатегоріїї не існує
                    </p>
                  )}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
