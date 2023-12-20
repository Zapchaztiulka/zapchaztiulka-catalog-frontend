import { StatusContext } from '@/context/statusContext';
import React, { useContext } from 'react'

const BreadcrumbsIDPage = (props) => {
   const { backToHomeUrl } = useContext(StatusContext);
   const { product } = props;
   console.log(product);
   const nameOfCategoryForIDPage = product.categories[0]?.categoryName;
   const nameOfSubCategoryForIDPage = product.subcategories[0]?.subcategoryName;
   console.log(nameOfSubCategoryForIDPage);
   console.log(nameOfCategoryForIDPage);
  return (
    <div>
      <button onClick={backToHomeUrl}> Каталог</button>
      <span className="p-xs3">{' / '}</span>
        {product && <button className="p-xs3">{product?.name}</button>}
    </div>
  );
}

export default BreadcrumbsIDPage
