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

export const getTCountriesForTrademarks = (array, trademarksName) => {
  const countries = [];

  for (const trademark of trademarksName) {
    const trademarksData = array?.find(
      item =>
        item.name === trademark
    );

    if (trademarksData && trademarksData.countries) {
      countries.push(...trademarksData.countries);
    }
  }

  return countries;
};

export const findMinPrice = dataArray => {
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

    return minPrice
  }
};

export const findMaxPrice = dataArray => {
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

// Функція для відбору об'єктів з масиву за значеннями arr
export const filterData = (data, arr) => {
    if (!data || data.length === 0) {
    return []; 
  }    
    return arr.length > 0 ? data.filter(item => arr.includes(item.name)) : [];
  }

export const findMaxPrice1 = (data, arr) => {
    if (!data || data.length === 0 && arr) {
      return findMaxPrice(arr);
    }
    return findMaxPrice(data);
};

// Функція для знаходження мінімальної ціни
export const findMinPrice1 = (data, arr) => {
  if (!data || (data.length === 0 && arr)) {
    return findMinPrice(arr);
  }
    return findMinPrice(data);
};





