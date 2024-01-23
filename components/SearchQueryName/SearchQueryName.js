import React from 'react'

const SearchQueryName = ({
  searchValue,
   caterogyUrl,
  subcategoryUrl,
  nameOfCategory,
  nameOfSubCategory,
  totalCount,
}) => {
  return (
    <div>
      {((searchValue !== undefined && searchValue !== '') ||
        caterogyUrl.length === 1 ||
        subcategoryUrl.length === 1) && (
        <div className="mb-m block desktop1200:inline text-2xl/[28.8px] -tracking-[0.36px] tablet600:text-4xl/[46.8px] tablet600:-tracking-[0.54px] font-normal text-textPrimary">
          {searchValue && (
            <p className="inline-block mb-2 desktop1200:mr-4">
              Результати пошуку “{`${searchValue}`}”{' '}
            </p>
          )}
          {caterogyUrl.length === 1 && (
            <p className="inline-block mb-2 desktop1200:mr-4">
              {`${nameOfCategory}`}
            </p>
          )}
          {subcategoryUrl.length === 1 && (
            <p className="inline-block mb-2 desktop1200:mr-4">
              {`${nameOfSubCategory}`}
            </p>
          )}

          <span className="block desktop1200:inline text-textTertiary text-sm">
            {`${totalCount}`} товарів
          </span>
        </div>
      )}

      {totalCount === 0 && (
        <div>На жаль, за вашим запитом нічого не знайдено</div>
      )}
    </div>
  );
};

export default SearchQueryName
