import { ArrowRight } from "@/public/icons";
import { fetchCategories } from "@/redux/categories/categoriesOperation";
import { selectCategories } from "@/redux/categories/categoriesSelector";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectCategories);

  const [showSubMenu, setShowSubMenu] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0},
  };

  const subMenuOnMouseEnterHandler = (subMenuId) => {
    setShowSubMenu((prev) => {
      setDropdown(true)
      let arr = [...prev];
      arr[subMenuId] = true;
      return arr;
    });
  };
  const subMenuOnMouseLeaveHandler = (subMenuId) => {
    setShowSubMenu((prev) => {
      setDropdown(false)
      let arr = [...prev];
      arr[subMenuId] = false;
      return arr;
    });
  };

   useEffect(() => {
     const handler = (event) => {
       if (dropdown) {
         setDropdown(false);
       }
     };
     document.addEventListener("mousedown", handler);
     document.addEventListener("touchstart", handler);
     return () => {
       // Cleanup the event listener
       document.removeEventListener("mousedown", handler);
       document.removeEventListener("touchstart", handler);
     };
   }, [dropdown]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (
  //       isOpen &&
  //       ref.current &&
  //       ref.current.contains(event.target)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handler);
  //   document.addEventListener('touchstart', handler);
  //   return () => {
  //     document.removeEventListener('mousedown', handler);
  //     document.removeEventListener('touchstart', handler);
  //   };
  // }, [isOpen]);

  const categories = data?.categories;

  return (
    <section className="absolute top-[92px] bg-bgColors-white p-s border-t border-x rounded-b-lg min-w-[377px]">
      <ul className="flex relative flex-col gap-xs text-textColors-primary text-base font-medium tracking-textBase">
        {categories?.map((el) => {
          return (
            <li
              className=""
              key={el._id}
              onMouseEnter={() => subMenuOnMouseEnterHandler(el._id)}
              onMouseLeave={() => subMenuOnMouseLeaveHandler(el._id)}
            >
              <Link
                href="./"
                className="border-none cursor-pointer b-transparent flex justify-between items-center"
              >
                <div>{el.categoryName}</div>
                <ArrowRight className="stroke-iconColors-secondary w-[44] h-[44]" />
              </Link>
              <motion.div
                variants={variants}
                animate={showSubMenu[el._id] ? "open" : "closed"}
                className="absolute w-[100%] top-0 left-[105%] bg-bgColors-white "
              >
                <ul className="text-textColors-primary text-base font-medium tracking-textBase">
                  {el.subcategories.map((sub) => {
                    return (
                      <li key={sub._id}>
                        <Link
                          href="./"
                          className="border-none cursor-pointer b-transparent flex justify-between items-center"
                        >
                          <div>{sub.subcategoryName}</div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;

//     <section className="absolute top-[92px] bg-bgColors-white p-s border-t border-x rounded-b-lg min-w-[377px]">
//       <ul className="flex flex-col gap-xs text-textColors-primary text-base font-medium tracking-textBase">
//         {
//           categories?.map(({ _id, categoryName, subcategoryName }) => {
//             const toggle = () => {
//   setIsOpen(!isOpen);
// }
//             return (
//               <li
//                 key={_id}
//                 className=""
//                 onClick={toggle}
//                 // onMouseEnter={onMouseEnter}
//                 // onMouseLeave={onMouseLeave}
//                 ref={ref}
//               >
//                 <Link href="./" className="border-none cursor-pointer b-transparent flex justify-between items-center">
//                   <div>{categoryName}</div>
//                   <ArrowRight className="stroke-iconColors-secondary w-[44] h-[44]" />
//                 </Link>

//                 {isOpen && <ul>smt</ul>}
//               </li>
//             );
//           })}
//       </ul>
//     </section>
