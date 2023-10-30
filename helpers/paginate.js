export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber) * pageSize;
  return items?.slice(startIndex, startIndex + pageSize); // 0, 9
};
