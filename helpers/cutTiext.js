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