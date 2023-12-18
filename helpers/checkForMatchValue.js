// Function for selecting objects from one array based on the values of another array
export const getTrademarksForCountries = (array, countryNames) => {
  const trademarks = [];
  for (const countryName of countryNames) {
    const countryData = array?.find(item => item.name === countryName);
    if (countryData && countryData.trademarks) {
      trademarks.push(...countryData.trademarks);
    }
  }
  return trademarks;
};

// Function for selecting objects from one array based on the values of another array
export const getTCountriesForTrademarks = (array, trademarksName) => {
  const countries = [];
  for (const trademark of trademarksName) {
    const trademarksData = array?.find(item => item.name === trademark);
    if (trademarksData && trademarksData.countries) {
      countries.push(...trademarksData.countries);
    }
  }
  return countries;
};

// Function for selecting objects from one array based on the values of another array
export const filterData = (data, arr) => {
  if (!data || data.length === 0) {
    return [];
  }
  return arr.length > 0 ? data.filter(item => arr.includes(item.name)) : [];
};

//Finding the minimum price in the selected array or in the entire initial array
export const findMax = dataArray => {
  if (dataArray) {
    if (dataArray.length === 0) {
      return [];
    }
    let maxPrice = dataArray[0].maxPrice;
    dataArray.forEach(item => {
      if (item.maxPrice > maxPrice) {
        maxPrice = item.maxPrice;
      }
    });

    return maxPrice;
  }
};
export const findMaxPrice = (data, arr) => {
  if (!data || (data.length === 0 && arr)) {
    return findMax(arr);
  }
  return findMax(data);
};

// Finding the maximum price in the selected array or in the entire initial array
export const findMin = dataArray => {
  if (dataArray) {
    if (dataArray.length === 0) {
      return [];
    }
    let minPrice = dataArray[0].minPrice;
    dataArray.forEach(item => {
      if (item.minPrice < minPrice) {
        minPrice = item.minPrice;
      }
    });

    return minPrice;
  }
};
export const findMinPrice = (data, arr) => {
  if (!data || (data.length === 0 && arr)) {
    return findMin(arr);
  }
  return findMin(data);
};

// Receiving the count of products depending on the selected countries or trademarks
export const calculateSumsAndCompare = (data1, data2, arr1, arr2) => {
  let countProductsSum1 = 0;
  let countProductsSum2 = 0;
  data1.forEach(country => {
    if (arr1.includes(country.name)) {
      countProductsSum1 += country.countProducts;
    }
  });

  data2.forEach(item => {
    if (arr2.includes(item.name)) {
      countProductsSum2 += item.count;
    }
  });
  return countProductsSum2 === 0
    ? countProductsSum1
    : Math.min(countProductsSum1, countProductsSum2);
};

// Receiving the total count of products depending on the minValue or maxValue
export const calculateTotalCount = arr => {
  return arr.reduce((sum, item) => sum + item.countProducts, 0);
};



