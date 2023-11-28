export const getCategoryName = (categories, idCategory) => {
   if (categories) {
      if (categories.length === 0) {
         return null
      }
      const nameCategory = categories?.find(item =>
        item._id === idCategory ? item.categoryName : null
      );

      if (nameCategory) {
        return nameCategory.categoryName;
      } else { return null}
   }
}

export const getSubCategoryName = (categories, subcategoryId) => {
  if (categories) {
    if (categories.length === 0) {
      return null;
    }
     const foundSubcategory = categories
       .map(category =>
         category.subcategories.find(subcat => subcat._id === subcategoryId)
       )
       .find(subcategory => subcategory !== undefined);

    ;

      return foundSubcategory ? foundSubcategory.subcategoryName : null;
  }
};