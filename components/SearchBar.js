"use client";
import Image from "next/image";
import React from "react";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Combobox, Transition } from "@headlessui/react";

const SearchBar=() =>{
  const product = [
    { id: 1, name: "Кришка радіатора" },
    { id: 2, name: "Корпус термостата" },
    { id: 3, name: "Випарник" },
    { id: 4, name: "Патрубок радіатора" },
    { id: 5, name: "Шків помпи" },
  ];

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const filteredProduct =
    query === ""
      ? product
      : product.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredProduct === "") {
      return console.log("Please fill in the searchbar!");
    }
    updateSearchParams(filteredProduct.toLowerCase());
    setSelectedProduct("");
  };

  console.log(query)

  const updateSearchParams = (filteredProduct) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (filteredProduct) {
      searchParams.set("filteredProduct", filteredProduct);
    } else {
      searchParams.delete("filteredProduct");
    }

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4"
    >
      <div className="flex max-sm:w-full justify-start items-center relative z-40">
        <Combobox value={selectedProduct} onChange={setSelectedProduct}>
          <div className=" w-full">
            <div className="search">
                <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(item) => item.name}
              placeholder="Я шукаю.."
              className="search-input"
            />
            <div className="search-icon">
              <Image
                src="/icons/search-icon.svg"
                alt="search-icon"
                className="object-contain"
                width={24}
                height={24}
              />
            </div>
</div>          
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-272 border border-border-default overflow-auto text-text-input-default rounded-lg bg-white py-3 text-base focus:outline-none sm:text-sm">
                {filteredProduct?.map((item) => (
                  <Combobox.Option
                    key={item.id}
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
}

export default SearchBar;
