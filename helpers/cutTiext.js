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

export function cutProductsArray(products) {
  switch (window.innerWidth) {
    case window.innerWidth >= 320:
      return products.slice(0, 4);
    case window.innerWidth >= 1024:
      return products.slice(0, 3);
    case window.innerWidth >= 1920:
      return products.slice(0, 4);
 }
}