"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIcon } from "@/public/icons";
import { useGetProductsBySearchQuery } from "@/redux/services/productApi";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data } = useGetProductsBySearchQuery(searchTerm);

  const updateSearchParams = (searchTerm) => {
    const searchParams = new URLSearchParams("./");
    if (filteredData.length !== 0 && searchTerm.length!==0) {
      searchParams.set("query", searchTerm);
    } else {
      searchParams.delete("query");
    }
    const newPathName = `./?${searchParams.toString()}`;
    router.push(newPathName);   
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    const newFilter = data.products.filter((value) => {
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
    if (searchTerm !== "") {  
      updateSearchParams(searchTerm.toLowerCase());}
  
    clearFields();
  };

  const clearFields = () => {
    setFilteredData([]);
    setSearchTerm("");
  };

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
              <Link legacyBehavior href={{ pathname: `/${item._id}` }} passHref>
                <a className="py-2 pl-10 pr-4 w-full block">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredData.length === 0 && searchTerm.length !== 0 && (
        <div className="absolute top-[54px] mt-1 max-h-60 w-272 border border-border-default overflow-auto text-text-input-default rounded-lg bg-white py-3 text-base focus:outline-none sm:text-sm p-4">
          <p className="text-input-active text-lg font-medium mb-2">
            На жаль, за вашим {`${searchTerm}`} запитом нічого не знайдено
          </p>
          <p className="text-text-secondary text-[15px] mb-4 ">
            Перевірте та змініть запит або пошукайте товар в каталозі.
          </p>
          <button className="state-button hidden md:flex md:justify-between lg:px-6 px-3 py-3 text-white text-base">
            Перейти до каталогу
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
