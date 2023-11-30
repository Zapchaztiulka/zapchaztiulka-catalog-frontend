export const formatNumber = (number) => {
  if (number % 1 !== 0) {
    number = Math.round(number);
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

}

export const formatNumberWithSpace = number => {
  if (number) {
    const parts = number
      .toLocaleString('en-US', { useGrouping: false })
      .split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
};