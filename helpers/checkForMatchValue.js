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

    let resultNames = objectArray?.filter((obj, index) => falseIndexes.includes(index))
        .map(obj => obj.name);
    return resultNames;
}
