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