import { itemMock } from '../utils/utils';

export const initialState = {
  order: [],
  currentItemNumber: 0,
  total: 0,
  editItemNumber: 0,
  firstSideToppings: false,
  secondSideToppings: false,
  noTopping: false,
  isDisabled: false,
  delivery: "0",
  amountOffTotal: "",
  tip: "",
  name: "",
  phone: "",
  address: "",
  payOrder: false,
  key: null,
  createdAt: null
};

export const item1 = {
  "name": "Pizza",
  "size": "10\"",
  "basePrice": 7.95,
  "pricePerTopping": 0.80,
  "extraCheesePrice": 1.00
};

export const item1_full = Object.assign({}, itemMock, item1, { itemNumber: 1, total: 7.95 });

export const editedItem1 = {
  "name": "Sub",
  "size": "6\"",
  "basePrice": 4.50,
  "pricePerTopping": 0,
  "extraMeatPrice": 1.00,
  "extraCheesePrice": 1.00
};

export const editedItem1_full = Object.assign({}, itemMock, editedItem1, { itemNumber: 1, total: 4.50 });

export const item2 = {
  "name": "Salad",
  "size": "Small",
  "basePrice": 3.50
};

export const item2_full = Object.assign({}, itemMock, item2, { itemNumber: 2, total: 3.50 });
export const item2_full_type = Object.assign({}, itemMock, item2, { itemNumber: 2, total: 3.50, type: "Garden" });

export const item1_full_state = {
  order: [item1_full],
  currentItemNumber: 1,
  total: 7.95,
  editItemNumber: 0,
  firstSideToppings: false,
  secondSideToppings: false,
  noTopping: false,
  isDisabled: false,
  delivery: "0",
  amountOffTotal: "",
  tip: "",
  name: "",
  phone: "",
  address: "",
  payOrder: false,
  key: null,
  createdAt: null
};

export const editedItem1_full_state = {
  order: [editedItem1_full],
  currentItemNumber: 1,
  total: 4.50,
  editItemNumber: 0,
  firstSideToppings: false,
  secondSideToppings: false,
  noTopping: false,
  isDisabled: false,
  delivery: "0",
  amountOffTotal: "",
  tip: "",
  name: "",
  phone: "",
  address: "",
  payOrder: false,
  key: null,
  createdAt: null
};


export const twoItemState = {
  order: [item1_full, item2_full],
  currentItemNumber: 2,
  total: 11.45,
  editItemNumber: 0,
  firstSideToppings: false,
  secondSideToppings: false,
  noTopping: false,
  isDisabled: false,
  delivery: "0",
  amountOffTotal: "",
  tip: "",
  name: "",
  phone: "",
  address: "",
  payOrder: false,
  key: null,
  createdAt: null
};

export const twoItemState_type = {
  order: [item1_full, item2_full_type],
  currentItemNumber: 2,
  total: 11.45,
  editItemNumber: 0,
  firstSideToppings: false,
  secondSideToppings: false,
  noTopping: false,
  isDisabled: false,
  delivery: "0",
  amountOffTotal: "",
  tip: "",
  name: "",
  phone: "",
  address: "",
  payOrder: false,
  key: null,
  createdAt: null
};