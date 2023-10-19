"use client";

import {  useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CloseIcon, SearchIconNavbar } from "@/public/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByQuery } from "@/redux/products/productsSelectors";
import { fetchProductsByQuery } from "@/redux/products/productsOperations";
import { useDebounce } from "@/hooks/useDebounce";

const SearchBar = ({ showSearchBar, toggleSearchBar}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const data = useSelector(selectProductsByQuery);
  const products = data?.products;

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(fetchProductsByQuery(debouncedSearch));
  }, [dispatch, debouncedSearch]);

  const handleFilter = (event) => {
    event.preventDefault();
    const searchWord = event.target.value;
    
    setSearchTerm(searchWord);

    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== "" && filteredData.length !== 0) {
      router.push({
        pathname: "/",
        query: { query: searchTerm.toLowerCase() },
      });
    }
    clearFields(); 
  };

  const clearSearchTerm = () => {
      setSearchTerm(""); 
  }

  const clearFields = () => {
    setFilteredData([]);
   
    if (searchTerm !== "" && filteredData.length !== 0) {
      toggleSearchBar() 
    }     
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        showSearchBar
          ? "hidden tablet768:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4 "
          : "flex items-center relative"
      }`}
    >
      <div className="search w-full">
        <input
          onChange={handleFilter}
          placeholder="Я шукаю.."
          className="search-input w-full"
          value={searchTerm}
        />
        {searchTerm !== "" && (
          <button className="close-btn" type="button" onClick={clearSearchTerm}>
            <CloseIcon
              className="close-icon stroke-iconPrimary"
              width="34"
              height="34"
            />
          </button>
        )}
        <button className="search-icon" type="submit">
          <SearchIconNavbar className="icon w-[24px] h-[24px] stroke-iconWhite stroke-2" />
        </button>
      </div>
      {filteredData.length !== 0 && searchTerm.length !== 0 && (
        <ul className="absolute top-[80px] w-full tablet1024:top-[54px] tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10">
          {filteredData.slice(0, 15).map((item) => (
            <li
              key={item._id}
              onClick={clearFields}
              className="relative cursor-pointer select-none "
            >
              <Link
                legacyBehavior
                href={{ pathname: `/product/${item._id}` }}
                passHref
              >
                <a className="w-full pb-m block">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredData.length === 0 && searchTerm.length !== 0 && (
        <div className="absolute top-[80px] w-full tablet600:top-[250px] tablet600:text-center tablet1024:top-[54px] mt-1 tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10">
          <p className="text-textPrimary text-lg font-medium mb-2">
            На жаль, за вашим {`${searchTerm}`} запитом нічого не знайдено
          </p>
          <p className="text-text-textSecondary text-[15px] mb-4 -tracking-[0.225px] leading-5">
            Перевірте та змініть запит або пошукайте товар в каталозі.
          </p>
          <button
            className={`${
              !showSearchBar ? "w-full tablet600:w-[343px]" : "w-fit"
            } state-button lg:px-6 px-3 py-3 text-textContrast text-base text-center`}
          >
            Перейти до каталогу
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
