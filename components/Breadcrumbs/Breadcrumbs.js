import { StatusContext } from '@/context/statusContext';
import {
  getCategoryName,
  getSubCategoryName,
} from '@/helpers/getNameOfCategory';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Breadcrumbs = props => {
   const {
     categories,
     idCategory,
     idSubCategory,
     product,
     nameOfCategoryForIDPage,
     nameOfSubCategoryForIDPage,
     searchValue,
   } = props;
  const router = useRouter();
  const { backToHomeUrl,resetLocalStorage } = useContext(StatusContext);
  const nameOfCategory = getCategoryName(categories, idCategory);
   const nameOfSubCategory = getSubCategoryName(categories, idSubCategory);

   const findCategoryIdBySubcategoryId = (categories, subcategoryId) => {
      if (categories) {
         let categoryId = null;
         categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
               if (subcategory._id === subcategoryId) {
                  categoryId = category._id;
               }
            });
         });
         return categoryId;
      }
   };

  const findCategoryId = findCategoryIdBySubcategoryId(
    categories,
    idSubCategory
  );
   const nameOfCategoryWithId = getCategoryName(categories, findCategoryId);
   
   const backToHome = () => {
      backToHomeUrl(); 
      resetLocalStorage();
   }

  const handleBreadCrumbsCategory = () => {
    router.push({
      pathname: `/`,
      query: {
        page: 1,
        categories: idCategory.length !== 0 ? idCategory : findCategoryId,
      },
    });
  };

  const handleBreadCrumbsSubCategory = () => {
    router.push({
      pathname: `/`,
      query: {
        page: 1,
        subcategories: idSubCategory,
      },
    });
  };

  return (
    <div className=" mb-3 text-textTertiary">
      {searchValue && (
        <>
          {' '}
          <button onClick={backToHome} className="breadcrumbs">
            {' '}
            Каталог
          </button>
          <span className="p-xs3">{' / '}</span>
          <button className="breadcrumbs">Результати пошуку</button>
        </>
      )}
      {(nameOfCategory || nameOfCategoryForIDPage) && (
        <>
          <button onClick={backToHome} className="breadcrumbs">
            {' '}
            Каталог
          </button>
          <span className="p-xs3">{' / '}</span>
          <button className="breadcrumbs" onClick={handleBreadCrumbsCategory}>
            {categories && nameOfCategory}
            {product && nameOfCategoryForIDPage}
          </button>
        </>
      )}
      {(nameOfSubCategory || nameOfSubCategoryForIDPage) && (
        <>
          {categories && (
            <>
              <button onClick={backToHome} className="breadcrumbs">
                {' '}
                Каталог
              </button>
              <span className="p-xs3">{' / '}</span>
              <button
                onClick={handleBreadCrumbsCategory}
                className="breadcrumbs"
              >
                {nameOfCategoryWithId}
              </button>
            </>
          )}
          <>
            <span className="p-xs3">{' / '}</span>
            <button
              onClick={handleBreadCrumbsSubCategory}
              className="breadcrumbs"
            >
              {categories && nameOfSubCategory}
              {product && nameOfSubCategoryForIDPage}
            </button>
          </>
        </>
      )}
      {product && (
        <>
          <span className="p-xs3">{' / '}</span>
          <button className="breadcrumbs">{product?.name}</button>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
