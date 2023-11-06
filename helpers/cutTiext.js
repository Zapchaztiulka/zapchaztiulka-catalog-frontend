export function cutText(string) {
  const quantityChar = 45;
  return string.length <= quantityChar
    ? string
    : string.slice(0, quantityChar) + '...';
}

export function cutArticle(string) {
  const quantityChar = 15;
  return string.length <= quantityChar
    ? string
    : string.slice(0, quantityChar) + '...';
}

export const cutProductsArray = (products, width) => {
      if (width > 0 && width < 1023) {
        return products.slice(0, 4); 
     }
        else    if (width >= 1024 && width < 1918) {
        return products.slice(0, 3); 
      }  
      else if (width >= 1920) {
          return products.slice(0, 4); 
      }     
}
   
export const cutProductsViewedArray = (products, width) => {
      if (width > 0 && width < 1023) {
        return products
     }
        else    if (width >= 1024 && width < 1918) {
        return products.slice(0, 4); 
      }  
      else if (width >= 1920) {
          return products.slice(0, 5); 
      }     
   }