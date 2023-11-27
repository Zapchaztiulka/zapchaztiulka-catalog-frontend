export const  processNumber = (input) => {
   const integerPart = Math.round(parseFloat(input));
  if (integerPart >= 1000) {
    const formattedNumber = integerPart
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedNumber;
  } else {
    const roundedNumber = Math.round(parseFloat(input));
    if (roundedNumber < 1) {
      return 1;
    } else {
      return roundedNumber;
    }
  }
}



