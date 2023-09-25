"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import Link from "next/link";
import { SearchIcon } from "@/public/icons";
import {  useGetProductsBySearchQuery } from "@/redux/services/productApi";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [empty, setEmpty]=useState(false)
   const { data } = useGetProductsBySearchQuery(searchTerm);

  const updateSearchParams = (searchTerm) => {
    const searchParams = new URLSearchParams("./");
    if (!errorMessage && filteredData.length !== 0) {
      searchParams.set("query", searchTerm);
      // } else if (errorMessage &&  searchParams.has("query", searchTerm)) {
      //   searchParams.set("query")
    } else {
      searchParams.delete("query");
    }
    const newPathName = `./?${searchParams.toString()}`;
    router.push(newPathName);
  };

  const handleFilter = (event) => {
     setErrorMessage(true);
    event.preventDefault();
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    const newFilter = data.products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchTerm === "") { 
      setFilteredData([])
       setErrorMessage(true);
    } else {
      setFilteredData(newFilter);
     setErrorMessage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearchParams(searchTerm.toLowerCase());
    if (searchTerm === "" || filteredData.length === 0) {
       setEmpty(true);
    }
    setEmpty(false);
    clearFields();
  };

  const clearFields = () => {
    setFilteredData([]);
    setSearchTerm("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden md:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4"
    >
      <div className="search">
        <input
          onChange={handleFilter}
          placeholder="Я шукаю.."
          className="search-input"
          value={searchTerm}
        />
        <button className="search-icon" type="submit">
          <SearchIcon className="icon w-6 h-6 stroke-secondary fill-white" />
        </button>
      </div>
      {filteredData.length !== 0 && searchTerm.length !== 0 && (
        <ul className="absolute top-[54px] mt-1 max-h-60 w-272 border border-border-default overflow-auto text-text-input-default rounded-lg bg-white py-3 text-base focus:outline-none sm:text-sm">
          {filteredData.slice(0, 15).map((item) => (
            <li
              key={item._id}
              onClick={clearFields}
              className="relative cursor-pointer hover:bg-default-blue hover:text-white select-none "
            >
              <Link
                legacyBehavior
                href={{ pathname: `/${item._id}` }}
                passHref
              >
                <a  className="py-2 pl-10 pr-4 w-full block">{item.name}</a>              
              </Link>
            </li>
          ))}
        </ul>
      )}
      {empty && (
        <div className="absolute top-[54px] mt-1 max-h-60 w-272 border border-border-default overflow-auto text-text-input-default rounded-lg bg-white py-3 text-base focus:outline-none sm:text-sm">
          No results
        </div>
      )}
    </form>
  );
};

export default SearchBar;

