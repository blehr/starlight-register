import {
  CREATE_NEW_ITEM,
  DELETE_ITEM,
  ADD_TOPPING,
  SELECT_FIRST_SIDE_TOPPING,
  SELECT_SECOND_SIDE_TOPPING,
  SELECT_NO_TOPPING,
  EXTRA_CHEESE_CLICK,
  EXTRA_MEAT_CLICK,
  SET_EDIT_ITEM_NUMBER,
  RESET_EDIT_ITEM_NUMBER,
  ENABLE_BUTTONS,
  DISABLE_BUTTONS,
  DRESSING_CLICK,
  TYPE_CLICK,
  CUSTOM,
  RESET_ORDER_STATE,
  UPDATE_NAME,
  UPDATE_PHONE,
  UPDATE_ADDRESS,
  SET_DELIVERY,
  AMOUNT_OFF_TOTAL,
  ADD_TIP,
  PAY_ORDER_FLAG,
  SET_ORDER_TO_PAY
} from "../actions/types";

import {
  dealWithTopping,
  getItemNumberToUpdate,
  calcItemTotal,
  createOrMergeItem,
  calcOrderTotal,
  payOrderMerge
} from "../utils/reducer_helpers";

const initialState = {
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

export default function(state = initialState, action) {
  const theItem = getItemNumberToUpdate(state);
  let newState;
  switch (action.type) {
    case CREATE_NEW_ITEM:
      newState = Object.assign(
        {},
        state,
        createOrMergeItem(state, action.payload)
      );
      return { ...newState, total: calcOrderTotal(newState) };
    case TYPE_CLICK:
      return {
        ...state,
        order: state.order.map(o => {
          if (o.itemNumber === theItem.itemNumber) {
            return calcItemTotal(Object.assign({}, o, action.payload));
          }
          return o;
        })
      };
    case DRESSING_CLICK:
      return {
        ...state,
        order: state.order.map(o => {
          if (o.itemNumber === theItem.itemNumber) {
            return calcItemTotal(Object.assign({}, o, action.payload));
          }
          return o;
        })
      };
    case DELETE_ITEM:
      newState = {
        ...state,
        order: state.order.filter(o => o.itemNumber !== action.payload)
      };
      return { ...newState, total: calcOrderTotal(newState) };
    case ADD_TOPPING:
      newState = Object.assign({}, state, {
        order: [
          ...state.order.filter(o => o.itemNumber !== theItem.itemNumber),
          calcItemTotal(
            dealWithTopping(getItemNumberToUpdate(state), action.payload, state)
          )
        ]
      });
      return { ...newState, total: calcOrderTotal(newState) };
    case SELECT_FIRST_SIDE_TOPPING:
      return { ...state, firstSideToppings: !state.firstSideToppings };
    case SELECT_SECOND_SIDE_TOPPING:
      return { ...state, secondSideToppings: !state.secondSideToppings };
    case SELECT_NO_TOPPING:
      return { ...state, noTopping: !state.noTopping };
    case EXTRA_CHEESE_CLICK:
      theItem.extraCheese = !theItem.extraCheese;
      newState = {
        ...state,
        order: [
          ...state.order.filter(o => o.itemNumber !== theItem.itemNumber),
          calcItemTotal(theItem)
        ]
      };
      return { ...newState, total: calcOrderTotal(newState) };
    case EXTRA_MEAT_CLICK:
      theItem.extraMeat = !theItem.extraMeat;
      newState = {
        ...state,
        order: [
          ...state.order.filter(o => o.itemNumber !== theItem.itemNumber),
          calcItemTotal(theItem)
        ]
      };
      return { ...newState, total: calcOrderTotal(newState) };
    case SET_EDIT_ITEM_NUMBER:
      return { ...state, editItemNumber: action.payload };
    case RESET_EDIT_ITEM_NUMBER:
      return { ...state, editItemNumber: 0 };
    case ENABLE_BUTTONS:
      return { ...state, isDisabled: false };
    case DISABLE_BUTTONS:
      return { ...state, isDisabled: true };
    case CUSTOM:
      return {
        ...state,
        order: [
          ...state.order.filter(o => o.itemNumber !== theItem.itemNumber),
          Object.assign({}, theItem, { custom: action.payload })
        ]
      };
    case UPDATE_NAME:
      return { ...state, name: action.payload };
    case UPDATE_PHONE:
      return { ...state, phone: action.payload };
    case UPDATE_ADDRESS:
      return { ...state, address: action.payload };
    case SET_DELIVERY:
      newState = { ...state, delivery: action.payload };
      return { ...newState, total: calcOrderTotal(newState) };
    case AMOUNT_OFF_TOTAL:
      newState = { ...state, amountOffTotal: action.payload };
      return { ...newState, total: calcOrderTotal(newState) };
    case ADD_TIP:
      newState = { ...state, tip: action.payload };
      return { ...newState, total: calcOrderTotal(newState) };
    case PAY_ORDER_FLAG:
      return { ...state, payOrder: true };
    case SET_ORDER_TO_PAY:
      return {
        ...state,
        ...action.payload.order,
        order: payOrderMerge(action.payload.order.order),
        key: action.payload.key,
        currentItemNumber: action.payload.order.order.length + 5
      };
    case RESET_ORDER_STATE:
      return initialState;
    default:
      return state;
  }
}
