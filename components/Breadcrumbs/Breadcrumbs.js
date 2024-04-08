import {
  getCategoryName,
  getSubCategoryName,
} from '@/helpers/getNameOfCategory';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';

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
    const { resetLocalStorage } = useContext(StatusContext);

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

  const handleBreadCrumbsCategory = event => {
    event.preventDefault();
    router.push({
      pathname: `/`,
      query: {
        page: 1,
        categories: idCategory.length !== 0 ? idCategory : findCategoryId,
      },
    });
    resetLocalStorage();
  };

  const handleBreadCrumbsSubCategory = event => {
    event.preventDefault();
    router.push({
      pathname: `/`,
      query: {
        page: 1,
        subcategories: idSubCategory,
      },
    });
    resetLocalStorage();
  };

  return (
    <div className=" mb-3 text-textTertiary">
      {searchValue && (
        <>
          {' '}
          <Link
            href="/"
            passHref
            className="breadcrumbs"
            onClick={resetLocalStorage}
          >
            Каталог
          </Link>
          <span className="p-xs3">{' / '}</span>
          <span className="breadcrumbs" onClick={e => e.preventDefault()}>
            Результати пошуку
          </span>
        </>
      )}
      {(nameOfCategory || nameOfCategoryForIDPage) && (
        <>
          <Link
            href="/"
            passHref
            className="breadcrumbs"
            onClick={resetLocalStorage}
          >
            Каталог
          </Link>
          <span className="p-xs3">{' / '}</span>
          <Link
            href="/"
            passHref
            className="breadcrumbs"
            onClick={handleBreadCrumbsCategory}
          >
            {categories && nameOfCategory}
            {product && nameOfCategoryForIDPage}
          </Link>
        </>
      )}
      {(nameOfSubCategory || nameOfSubCategoryForIDPage) && (
        <>
          {categories && (
            <>
              <Link
                href="/"
                passHref
                className="breadcrumbs"
                onClick={resetLocalStorage}
              >
                Каталог
              </Link>
              <span className="p-xs3">{' / '}</span>
              <Link
                href="/"
                passHref
                className="breadcrumbs"
                onClick={handleBreadCrumbsCategory}
              >
                {nameOfCategoryWithId}
              </Link>
            </>
          )}
          <>
            <span className="p-xs3">{' / '}</span>
            <Link
              href="/"
              passHref
              className="breadcrumbs"
              onClick={handleBreadCrumbsSubCategory}
            >
              {categories && nameOfSubCategory}
              {product && nameOfSubCategoryForIDPage}
            </Link>
          </>
        </>
      )}
      {product && (
        <>
          <span className="p-xs3">{' / '}</span>
          <span className="breadcrumbs">{product?.name}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
