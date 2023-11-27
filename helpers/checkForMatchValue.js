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
  if (dataArray) {
    if (dataArray.length === 0) {
      return null;
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
      return null;
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

function processNumber(input) {
  // Видаляємо всі пробіли з рядка
  const cleanedInput = input.replace(/\s/g, '');

  // Перевіряємо, чи введено число
  if (!isNaN(cleanedInput)) {
    // Отримуємо цілу частину числа
    const integerPart = Math.floor(parseFloat(cleanedInput));

    // Перевіряємо, чи число чотиризначне і більше
    if (integerPart >= 1000) {
      // Розділяємо число
      const formattedNumber = integerPart
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      // Повертаємо отримане значення
      return formattedNumber;
    } else {
      // Закруглюємо до найближчого цілого
      const roundedNumber = Math.round(parseFloat(cleanedInput));

      // Перевіряємо, чи закруглене число менше 100.5
      if (roundedNumber < 100.5) {
        return 100;
      } else {
        return 101;
      }
    }
  } else {
    // Якщо введено не число, повертаємо помилку або робимо необхідне дійство
    return 'Введіть будь ласка правильне число.';
  }
}

// Приклад використання:
const userInput = '2 000';
const result = processNumber(userInput);
console.log(result); 