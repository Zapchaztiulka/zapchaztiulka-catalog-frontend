export const getTrademarksForCountries = (array, countryNames) => {
  const trademarks = [];

  for (const countryName of countryNames) {
    const countryData = array.find(item => item.name === countryName);

    if (countryData && countryData.trademarks) {
      trademarks.push(...countryData.trademarks);
    }
  }

  return trademarks;
};

export const getTCountriesForTrademarks = (array, trademarksName) => {
  const countries = [];

  for (const trademark of trademarksName) {
    const trademarksData = array.find(item => item.name === trademark);

    if (trademarksData && trademarksData.countries) {
      countries.push(...trademarksData.countries);
    }
  }

  return countries;
};

export const getNamesByBooleanArray = (booleanArray, objectArray) => {
  let falseIndexes = booleanArray?.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);

  let resultNames = objectArray
    ?.filter((obj, index) => falseIndexes.includes(index))
    .map(obj => obj.name);
  return resultNames;
};

export const formatNumberWithSpace = number => {
  const parts = number
    .toLocaleString('en-US', { useGrouping: false })
    .split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export const findMinPrice = dataArray => {
  if (dataArray?.length === 0) {
    return null;
  }

  let minPrice = dataArray[0]?.minPrice;

  dataArray?.forEach(item => {
    if (item.minPrice < minPrice) {
      minPrice = item.minPrice;
    }
  });

  return formatNumberWithSpace(minPrice);
};

export const findMaxPrice = dataArray => {
  if (dataArray?.length === 0) {
    return null;
  }

  let maxPrice = dataArray[0]?.maxPrice;

  dataArray?.forEach(item => {
    if (item.maxPrice > maxPrice) {
      maxPrice = item.maxPrice;
    }
  });

  return formatNumberWithSpace(maxPrice);
};
