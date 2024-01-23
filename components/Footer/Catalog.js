import React from 'react'

const Catalog = ({clickByCategory, categories}) => {
  return (
          <div className="flex flex-col gap-3">
            <h4 className="text-textTertiary text-lg">Каталог</h4>
            <ul className="text-textPrimary text-base">
              {categories?.map(el => {
                return (
                  <li
                    key={el._id}
                    className=" footer-items"
                    onClick={() => clickByCategory(el.categoryName)}
                  >
                    {el.categoryName}
                  </li>
                );
              })}
            </ul>
          </div>
  )
}

export default Catalog
