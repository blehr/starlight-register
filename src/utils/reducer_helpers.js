import { itemMock } from "./utils";

export function calcItemTotal(item) {
  const totalNumberOfToppings = item.firstSideToppings.length / 2 +
    item.secondSideToppings.length / 2 +
    item.toppings.length;
  const extraCheesePrice = item.extraCheese ? item.extraCheesePrice : 0;
  const extraMeatPrice = item.extraMeat ? item.extraMeatPrice : 0;
  const totalToppingPrice = (totalNumberOfToppings === 0
    ? 0
    : totalNumberOfToppings - 1) * item.pricePerTopping;
  return Object.assign({}, item, {
    total: +(totalToppingPrice +
      item.basePrice +
      extraCheesePrice +
      extraMeatPrice)
  });
}

export function calcOrderTotal(currentState) {
  const amountOff = currentState.amountOffTotal ? +currentState.amountOffTotal : 0;
  const tip = currentState.tip ? +currentState.tip : 0;
  const initialVal = (+currentState.delivery - amountOff) + tip;
  return +currentState.order
    .reduce(
      (acc, curr) => {
        return acc + curr.total;
      },
      initialVal 
    )
    .toFixed(2);
}

export function dealWithTopping(theOrder, topping, currentState) {
  if (currentState.noTopping) {
    const noToppingIndex = theOrder.noTopping.indexOf(topping);
    if (noToppingIndex === -1) {
      return {
        ...theOrder,
        noTopping: [...theOrder.noTopping, topping]
      };
    }
    return {
      ...theOrder,
      noTopping: [
        ...theOrder.noTopping.slice(0, noToppingIndex),
        ...theOrder.noTopping.slice(noToppingIndex + 1)
      ]
    };
  }
  if (currentState.firstSideToppings) {
    const firstSideIndex = theOrder.firstSideToppings.indexOf(topping);
    if (firstSideIndex === -1) {
      return {
        ...theOrder,
        firstSideToppings: [...theOrder.firstSideToppings, topping]
      };
    }
    return {
      ...theOrder,
      firstSideToppings: [
        ...theOrder.firstSideToppings.slice(0, firstSideIndex),
        ...theOrder.firstSideToppings.slice(firstSideIndex + 1)
      ]
    };
  }
  if (currentState.secondSideToppings) {
    const secondSideIndex = theOrder.secondSideToppings.indexOf(topping);
    if (secondSideIndex === -1) {
      return {
        ...theOrder,
        secondSideToppings: [...theOrder.secondSideToppings, topping]
      };
    }
    return {
      ...theOrder,
      secondSideToppings: [
        ...theOrder.secondSideToppings.slice(0, secondSideIndex),
        ...theOrder.secondSideToppings.slice(secondSideIndex + 1)
      ]
    };
  }

  const index = theOrder.toppings.indexOf(topping);
  if (index === -1) {
    return {
      ...theOrder,
      toppings: [...theOrder.toppings, topping]
    };
  }
  return {
    ...theOrder,
    toppings: [
      ...theOrder.toppings.slice(0, index),
      ...theOrder.toppings.slice(index + 1)
    ]
  };
}

export function getItem(arr, filterBy) {
  const itemToEdit = arr.filter(item => item.itemNumber === filterBy);
  return itemToEdit[0];
}

export function getItemNumberToUpdate(currentState) {
  const { order, currentItemNumber, editItemNumber } = currentState;
  return editItemNumber === 0
    ? getItem(order, currentItemNumber)
    : getItem(order, editItemNumber);
}

export function getActiveItemCustom(state) {
  const item = getItemNumberToUpdate(state);
  if (item) {
    return item.custom;
  }
  return "";
}

export function createOrMergeItem(currentState, payload) {
  const newState = Object.assign({}, currentState);

  const assignedItemNumber = newState.editItemNumber > 0
    ? newState.editItemNumber
    : newState.currentItemNumber + 1;

  let newOrder;

  if (newState.editItemNumber > 0) {
    newOrder = newState.order.map(o => {
      if (o.itemNumber === assignedItemNumber) {
        return calcItemTotal(
          Object.assign({}, o, payload, { itemNumber: assignedItemNumber })
        );
      }
      return o;
    });
  } else {
    const newItem = calcItemTotal(
      Object.assign({}, itemMock, payload, { itemNumber: assignedItemNumber })
    );
    newOrder = [...newState.order, newItem];
    newState.currentItemNumber += 1;
  }
  return { order: newOrder, currentItemNumber: newState.currentItemNumber };
}

export function payOrderMerge(currentState) {
  return currentState.map(item => Object.assign({}, itemMock, item));
}
