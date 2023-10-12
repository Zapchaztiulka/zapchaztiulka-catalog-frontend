
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { scrollToTop } from "@/helpers/scrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { selectProducts } from "@/redux/products/productsSelectors";
import { fetchProducts } from "@/redux/products/productsOperations";
import { theme } from "@/helpers/themeMaterial";
import CardItem from "./CardItem";


const CardsList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector(selectProducts);

  const searchValue = router.query.query;
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const products = data?.products;

  useEffect(() => {
    if (router.isReady) {
       const start = Number(router.query.page)
      setCurrentPage(start)
        dispatch(fetchProducts({ search: searchValue, page: start || 1 }));
    }
  }, [router.isReady, searchValue]);

  useEffect(() => {
    
  dispatch(fetchProducts({ search: searchValue }));
  }, [dispatch, searchValue]);

  let pagesCount = Math.ceil(data?.totalCount / pageSize);

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(fetchProducts({ search: searchValue, page: value }));
    setCurrentPage(value);  
    updateSearchParams(value);
  };

  const updateSearchParams = (page) => {
    const searchParams = new URLSearchParams();
    if (searchValue === undefined || searchValue !== "") {
      searchParams.set("page", page);
    } else {
      searchParams.delete("page");
    }
    const newPathName = `?${searchParams}`;
    router.push(newPathName);
  };


  return (
    <div className="z-10">
      <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus justify-center mb-5">
        {data &&
          products?.map(({ name, _id, photo, price, vendorCode }) => {
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
          })}
      </ul>

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
    </div>
  );
};

export default CardsList;
