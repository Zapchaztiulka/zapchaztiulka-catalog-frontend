"use client";
import Image from "next/image";
import React from "react";

import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from "@/public/icons";
import { useGetProductsQuery } from "@/redux/services/productApi";

const SearchBar = () => {


  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { data } = useGetProductsQuery();


  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/',
      query: `query=${searchTerm}`
    })
  };

      const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    const newFilter = data.products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setSearchTerm("");
  };

  return (
    <form
      onClick={handleSubmit}
      className="hidden md:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4"
    >
      <div className="flex max-sm:w-full justify-start items-center relative z-40">
        <Combobox value={selectedProduct} onChange={setSelectedProduct}>
          <div className=" w-full">
            <div className="search">
              <Combobox.Input
                onChange={handleFilter}
                displayValue={(item) => item.name}
                placeholder="Я шукаю.."
                className="search-input"
              />
              <button className="search-icon" onClick={handleSubmit}>
                <SearchIcon className="icon w-6 h-6 stroke-secondary fill-white" />
              </button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setSearchTerm("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-272 border border-border-default overflow-auto text-text-input-default rounded-lg bg-white py-3 text-base focus:outline-none sm:text-sm">
                {filteredData.slice(0, 15).map((item) => (
                  <Combobox.Option
                    key={item._id}
                    value={item}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-default-blue text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </form>
  );
};

export default SearchBar;