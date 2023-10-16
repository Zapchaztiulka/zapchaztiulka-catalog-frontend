"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIconNavbar } from "@/public/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsByQuery } from "@/redux/products/productsSelectors";
import { fetchProductsByQuery } from "@/redux/products/productsOperations";

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const data = useSelector(selectProductsByQuery);
  const products = data?.products;

  useEffect(() => {
    dispatch(fetchProductsByQuery(searchTerm));
  }, [dispatch, searchTerm]);

  const updateSearchParams = (searchTerm) => {
    const searchParams = new URLSearchParams();
    if (filteredData.length !== 0 && searchTerm.length !== 0) {
      searchParams.set("query", searchTerm);
    } else {
      searchParams.delete("query");
    }
    const newPathName = `?${searchParams.toString()}`;
    router.push(newPathName);
  };

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
      updateSearchParams(searchTerm.toLowerCase());
    }

    clearFields();
  };

  const clearFields = () => {
    setFilteredData([]);
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden tablet768:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4"
    >
      <div className="search">
        <input
          onChange={handleFilter}
          placeholder="Я шукаю.."
          className="search-input"
          value={searchTerm}
        />
        <button className="search-icon" type="submit">
          <SearchIconNavbar className="icon w-[24px] h-[24px] stroke-iconWhite stroke-2" />
        </button>
      </div>
      {filteredData.length !== 0 && searchTerm.length !== 0 && (
        <ul className="absolute top-[54px] mt-1 max-h-60 w-[272px] border border-borderDefault overflow-auto text-textInputDefault rounded-lg bg-bgWhite py-3 text-base focus:outline-none sm:text-sm">
          {filteredData.slice(0, 15).map((item) => (
            <li
              key={item._id}
              onClick={clearFields}
              className="relative cursor-pointer hover:bg-bgDefaultBlue hover:text-textContrast select-none "
            >
              <Link legacyBehavior href={{ pathname: `/${item._id}` }} passHref>
                <a className="py-2 pl-10 pr-4 w-full block">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredData.length === 0 && searchTerm.length !== 0 && (
        <div className="absolute top-[54px] mt-1 max-h-60 w-[272px] border border-borderDefault overflow-auto text-textInputDefault rounded-lg bg-bgWhite py-3 text-base focus:outline-none sm:text-sm p-4 z-10">
          <p className="text-textInputActive text-lg font-medium mb-2">
            На жаль, за вашим {`${searchTerm}`} запитом нічого не знайдено
          </p>
          <p className="text-text-textSecondary text-[15px] mb-4 ">
            Перевірте та змініть запит або пошукайте товар в каталозі.
          </p>
          <button className="state-button hidden tablet768:flex tablet768:justify-between lg:px-6 px-3 py-3 text-textContrast text-base">
            Перейти до каталогу
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
