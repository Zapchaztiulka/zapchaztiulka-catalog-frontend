"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { scrollToTop } from "@/helpers/scrollToTop";
import {
  selectProducts,
  selectProductsByQuery,
} from "@/redux/products/productsSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByQuery,
} from "@/redux/products/productsOperations";

const CardsList = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectProducts);

  const router = useRouter();
  const searchValue = router.query.query || "";
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const products = data?.products;

  useEffect(() => {
    dispatch(fetchProducts({ search: searchValue }));
  }, [dispatch, searchValue]);

  let pagesCount = Math.ceil(data?.totalCount / pageSize);

  const handleChange = (event, value) => {
    event.preventDefault();

    dispatch(fetchProducts({ search: searchValue, page: value }));
    setCurrentPage(value);
  };

  return (
    <div>
      <ul className="flex flex-wrap md:gap-5 gap-2 justify-center mb-5">
        {data &&
          products?.map(({ name, _id, photo, price, vendorCode }) => {
            return (
              <li
                key={_id}
                className="md:w-[285px] w-[168px] border border-border-default rounded-lg"
              >
                <div className="">
                  <div className="md:h-[190px] h-[112px] w-[168px] md:w-[285px]">
                    {photo.length === 0 ? (
                      <Image
                        src="/empty-img.jpeg"
                        alt="no image"
                        className="product-img object-cover object-center"
                        loading={"lazy"}
                        width={285}
                        height={190}
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      <Image
                        src={photo[0]?.url}
                        alt={photo[0]?.alt}
                        className="product-img object-cover object-center"
                        loading={"lazy"}
                        width={285}
                        height={190}
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                  </div>
                  <div className="md:px-3 md:pt-2 md:pb-3 p-2">
                    <p className="mb-1 md:text-sm text-[10px] text-tertiary">
                      Артикул: {vendorCode}
                    </p>
                    <h3 className="md:mb-6 mb-4 md:h-12 h-4 overflow-hidden md:text-xl/[24px] text-sm/[18.2px] md:font-medium text-text-primary">
                      {name}
                    </h3>
                    <p className="md:mb-2 mb-1 font-medium text-text-primary md:text-2xl text-lg">
                      {price.value} &#8372;
                    </p>

                    <Link legacyBehavior href={{ pathname: `/${_id}` }}>
                      <button className=" md:px-6 md:py-3 py-2 w-full text-white md:text-base text-sm md:font-medium state-button ">
                        Додати в кошик
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      {data && pagesCount > 1 && (
        <div className="flex justify-center">
          <Pagination
            shape="rounded"
            count={pagesCount}
            page={currentPage}
            onChange={handleChange}
            onClick={scrollToTop}
            sx={{
              button: { color: "#6B7075" },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "transparent",
                color: "#1C1F23",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardsList;
