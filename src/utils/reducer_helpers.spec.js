/* globals expect  */
const helpers = require("./reducer_helpers");
import { itemMock } from "./utils";


test('calcItemTotal works', () => {
  const item = {
    firstSideToppings: ["onions"],
    secondSideToppings: ["jalopenos"],
    toppings: ["peperoni", "sausage"],
    extraCheese: true,
    extraMeat: false,
    extraCheesePrice: 1.00,
    extraMeatPrice: 2.00,
    pricePerTopping: 0.25,
    basePrice: 5.25,
    total: 0
  };
  
  const itemTotal = helpers.calcItemTotal(item);
  
  item.total = 6.75;
  
  expect(item).toEqual(itemTotal);
  
});

test('calcOrderTotal', () => {
  const initialState = {
    order: [],
    currentItemNumber: 0,
    total: 0,
    editItemNumber: 0,
    firstSideToppings: false,
    secondSideToppings: false,
    noTopping: false,
    isDisabled: false,
    delivery: "3",
    amountOffTotal: "2.00",
    tip: "2.00",
    name: "",
    phone: "",
    address: "",
    payOrder: false,
    key: null,
    createdAt: null
  };
  const item = {
    firstSideToppings: ["onions"],
    secondSideToppings: ["jalopenos"],
    toppings: ["peperoni", "sausage"],
    extraCheese: true,
    extraMeat: false,
    extraCheesePrice: 1.00,
    extraMeatPrice: 2.00,
    pricePerTopping: 0.25,
    basePrice: 5.25,
    total: 6.75
  };
  
  for (let i = 0; i < 3; i++) {
    initialState.order.push(item);
  }
  
  const orderTotal = helpers.calcOrderTotal(initialState);
  
  initialState.total = 23.25;
  
  expect(23.25).toEqual(orderTotal);
  
});

test('dealWithTopping add Topping', () => {
  const item = {
    firstSideToppings: ["onions"],
    secondSideToppings: ["jalopenos"],
    toppings: ["peperoni", "sausage"],
    extraCheese: true,
    extraMeat: false,
    extraCheesePrice: 1.00,
    extraMeatPrice: 2.00,
    pricePerTopping: 0.25,
    basePrice: 5.25,
    total: 6.75
  };
  const initialState = {
    order: [item],
    currentItemNumber: 0,
    total: 0,
    editItemNumber: 0,
    firstSideToppings: false,
    secondSideToppings: false,
    noTopping: false,
    isDisabled: false,
    delivery: "3",
    amountOffTotal: "2.00",
    tip: "2.00",
    name: "",
    phone: "",
    address: "",
    payOrder: false,
    key: null,
    createdAt: null
  };
  
  const newItem = helpers.dealWithTopping(item, "pineapple", initialState);
  
  expect(newItem.toppings).toEqual(["peperoni", "sausage", "pineapple"]);
  
});

test('dealWithTopping remove Topping', () => {
  const item = {
    firstSideToppings: ["onions"],
    secondSideToppings: ["jalopenos"],
    toppings: ["peperoni", "sausage", "pineapple"],
    extraCheese: true,
    extraMeat: false,
    extraCheesePrice: 1.00,
    extraMeatPrice: 2.00,
    pricePerTopping: 0.25,
    basePrice: 5.25,
    total: 6.75
  };
  const initialState = {
    order: [item],
    currentItemNumber: 0,
    total: 0,
    editItemNumber: 0,
    firstSideToppings: false,
    secondSideToppings: false,
    noTopping: false,
    isDisabled: false,
    delivery: "3",
    amountOffTotal: "2.00",
    tip: "2.00",
    name: "",
    phone: "",
    address: "",
    payOrder: false,
    key: null,
    createdAt: null
  };
  
  const newItem = helpers.dealWithTopping(item, "pineapple", initialState);
  
  expect(newItem.toppings).toEqual(["peperoni", "sausage"]);
  
});


test("getItem return the item", () => {
  const item1 = Object.assign({}, itemMock, { itemNumber: 1 });
  const item2 = Object.assign({}, itemMock, { itemNumber: 2 });
  const arr = [item1, item2];
  
  const returnItem = helpers.getItem(arr, 2);
  
  expect(returnItem).toEqual(item2);
  
});

test("getItemNumberToUpdate return the item", () => {
  const item1 = Object.assign({}, itemMock, { itemNumber: 1 });
  const item2 = Object.assign({}, itemMock, { itemNumber: 2 });
  const arr = [item1, item2];
  
  const prevState = {
    order: arr,
    currentItemNumber: 2,
    editItemNumber: 1
  };
  
  const returnItem = helpers.getItemNumberToUpdate(prevState);
  
  expect(returnItem).toEqual(item1);
  
});

test("createOrMergeItem returns new order and currentItemNumber", () => {
  const item1 = Object.assign({}, itemMock, { itemNumber: 1 });
  const item2 = Object.assign({}, itemMock, { itemNumber: 2 });
  const item3 = Object.assign({}, itemMock);
  const arr = [item1, item2];
  
  const prevState = {
    order: arr,
    currentItemNumber: 2,
    editItemNumber: 0
  };
  
  const result = helpers.createOrMergeItem(prevState, item3);
  
  item3.itemNumber = 3;
  
  expect(result).toEqual({ order: [item1, item2, item3] , currentItemNumber: 3});
  
});
