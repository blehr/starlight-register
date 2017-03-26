export const itemMock = {
  itemNumber: 0,
  name: null,
  type: null,
  size: null,
  extraMeat: false,
  extraMeatPrice: 0,
  extraCheese: false,
  extraCheesePrice: 0,
  pricePerTopping: 0,
  toppings: [],
  noTopping: [],
  firstSideToppings: [],
  secondSideToppings: [],
  dressing: null,
  custom: "",
  basePrice: 0,
  total: 0
};

export function captitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function displayIfExists(value) {
  if (value !== null && value !== "" && value !== undefined) {
    return value;
  }
}
