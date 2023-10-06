export const aviabilityType = (description) => {
switch (description) {
  case "є в наявності":
    return "#D1FADF";
  case "відсутній":
    return "#FEE4E2";
  case "під замовлення":
    return "#FEF0C7";
  default:
}};

export const availabilityText = (description) => {
    switch (description) {
      case "є в наявності":
        return "#039855";
      case "відсутній":
        return "#D92D20";
      case "під замовлення":
        return "#F79009";
      default:
    }
  };