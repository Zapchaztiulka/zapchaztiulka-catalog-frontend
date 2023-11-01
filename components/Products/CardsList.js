"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { scrollToTop } from "@/helpers/scrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import {
  selectFiltredByPrice,
  selectIsLoading,
  selectProducts,
} from "@/redux/products/productsSelectors";
import { fetchProducts } from "@/redux/products/productsOperations";
import { theme } from "@/helpers/themeMaterial";
import CardItem from "./CardItem";

const CardsList = () => {
  const router = useRouter();
  const start = Number(router.query.page);
  const dispatch = useDispatch();
  const data = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const [currentPage, setCurrentPage] = useState(start || 1);
  const pageSize = 10;
  const searchValue = router.query.query;
  const products = data?.products;
 
  useEffect(() => {
    if (!start) {
      setCurrentPage(1);
      dispatch(fetchProducts({ search: searchValue, page: 1 }));
    }
    if (start) {
      setCurrentPage(start);
      dispatch(fetchProducts({ search: searchValue, page: start }));
    }

    if (searchValue !== undefined && !start) {
      dispatch(fetchProducts({ search: searchValue }));
    }
  }, [dispatch, start, searchValue]);

  let pagesCount = Math.floor(data?.totalCount / pageSize);

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(fetchProducts({ search: searchValue, page: value }));
    setCurrentPage(value);
    router.push({ query: { page: value, query: searchValue } });
  };

  return (
    <>
      <div className="z-10">
        {searchValue !== undefined && searchValue !== "" && !isLoading && (
          <div className="mb-m">
            <h1 className="block desktop1200:inline text-2xl/[28.8px] -tracking-[0.36px] tablet600:text-4xl/[46.8px] tablet600:-tracking-[0.54px] font-normal text-textPrimary">
              Результати пошуку “{`${searchValue}`}”{" "}
            </h1>
            <span className="block desktop1200:inline text-textTertiary text-sm">
              {`${data.totalCount}`} товарів
            </span>
          </div>
        )}
        <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
          {data &&
            products?.map(
              ({ name, _id, photo, price, vendorCode }) => {
                return (
                  <CardItem
                    key={_id}
                    name={name}
                    id={_id}
                    photo={photo}
                    price={price}
                    vendorCode={vendorCode}
                  />
                );
              }
            )}
        </ul>
        <section>
          {data && pagesCount > 1 && (
            <ThemeProvider theme={theme}>
              <div className="flex justify-center relative">
                <Pagination
                  shape="rounded"
                  count={pagesCount}
                  page={currentPage}
                  onChange={handleChange}
                  onClick={scrollToTop}
                />
              </div>
            </ThemeProvider>
          )}
        </section>
      </div>
    </>
  );
};

export default CardsList;
