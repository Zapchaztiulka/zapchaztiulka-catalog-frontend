import { createSelector } from "@reduxjs/toolkit";
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.productById;
export const selectProductsByQuery = (state) => state.products.productsByQuery;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectFilter = (state) => state.filter
export const selectFilterMinPrice = (state) => state.filter.minPrice;
export const selectFilterMaxPrice = (state) => state.filter.maxPrice;

export const selectFiltredByPrice = createSelector(
  [selectFilter, selectProducts],
  ({ minPrice, maxPrice }, products) => {
    if (minPrice > 0 || maxPrice > 0) {
      const arr = products?.products?.filter(
        (item) => item.price.value >= minPrice && item.price.value <= maxPrice
      );

      const obj = {
        arrtest: arr,
        count: arr.length
      }

      console.log(obj)
      return arr;
    }
    return products.products;

    //     if ((minPrice === 0 || minPrice === null) && (maxPrice === 0 || maxPrice === null)) {
    // const arr2 = products.products
    //       console.log(arr2);
    // return arr2;
    //     }
    //     console.log(products)

    //     return products
  }
);

   // const foo = (fill1, fill2) => {     
   //    const arr2 = arr.filter(item=>  (item.a > fill1 && item.a < fill2) 
   //    )
   //    return arr2
   // }
   // console.log(foo(11,24))


// const arr = [{a:10, b:1},{a:23, b:1},{a:17, b:1},{a:22, b:1},{a:50, b:1}]