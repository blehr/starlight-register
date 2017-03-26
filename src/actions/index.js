/*  global window  */

import * as firebase from "firebase";
import moment from "moment";
import { browserHistory } from "react-router";

import {
  CREATE_NEW_ITEM,
  DELETE_ITEM,
  ADD_TOPPING,
  EXTRA_CHEESE_CLICK,
  EXTRA_MEAT_CLICK,
  SELECT_FIRST_SIDE_TOPPING,
  SELECT_SECOND_SIDE_TOPPING,
  SELECT_NO_TOPPING,
  SET_EDIT_ITEM_NUMBER,
  RESET_EDIT_ITEM_NUMBER,
  DRESSING_CLICK,
  TYPE_CLICK,
  DISABLE_BUTTONS,
  ENABLE_BUTTONS,
  CUSTOM,
  SIGN_OUT,
  AUTH_USER,
  AUTH_ERROR,
  UPDATE_ORDERS,
  RESET_ORDER_STATE,
  UPDATE_NAME,
  UPDATE_PHONE,
  UPDATE_ADDRESS,
  SET_DELIVERY,
  AMOUNT_OFF_TOTAL,
  ADD_TIP,
  RESET_SET_ORDER_TO_PAY,
  PAY_ORDER_FLAG,
  SET_ORDER_TO_PAY,
  DELETE_ORDER
} from "./types";

const config = {
  apiKey: "AIzaSyDXj4875bKh4zwhY-7RmXfvmSljhdoqjRE",
  authDomain: "starlight-c0e08.firebaseapp.com",
  databaseURL: "https://starlight-c0e08.firebaseio.com",
  storageBucket: "starlight-c0e08.appspot.com",
  messagingSenderId: "140839006928"
};

firebase.initializeApp(config);

const DB = firebase.database();

export function createNewItem(data) {
  return {
    type: CREATE_NEW_ITEM,
    payload: data
  };
}

export function deleteItem(data) {
  return {
    type: DELETE_ITEM,
    payload: data
  };
}

export function toppingClick(data) {
  return {
    type: ADD_TOPPING,
    payload: data
  };
}

export function selectFirstSideToppings() {
  return {
    type: SELECT_FIRST_SIDE_TOPPING
  };
}

export function selectSecondSideToppings() {
  return {
    type: SELECT_SECOND_SIDE_TOPPING
  };
}

export function selectNoTopping() {
  return {
    type: SELECT_NO_TOPPING
  };
}

export function extraCheeseClick() {
  return {
    type: EXTRA_CHEESE_CLICK
  };
}

export function extraMeatClick() {
  return {
    type: EXTRA_MEAT_CLICK
  };
}

export function setEditItemNumber(num) {
  return {
    type: SET_EDIT_ITEM_NUMBER,
    payload: num
  };
}

export function resetEditItemNumber() {
  return {
    type: RESET_EDIT_ITEM_NUMBER
  };
}

export function typeClick(name) {
  return {
    type: TYPE_CLICK,
    payload: name
  };
}

export function dressingClick(name) {
  return {
    type: DRESSING_CLICK,
    payload: name
  };
}

export function enableButtons() {
  return {
    type: ENABLE_BUTTONS
  };
}

export function disableButtons() {
  return {
    type: DISABLE_BUTTONS
  };
}

export function customizeOrder(data) {
  return {
    type: CUSTOM,
    payload: data
  };
}

export function updateName(val) {
  return {
    type: UPDATE_NAME,
    payload: val
  };
}

export function updatePhone(val) {
  return {
    type: UPDATE_PHONE,
    payload: val
  };
}

export function updateAddress(val) {
  return {
    type: UPDATE_ADDRESS,
    payload: val
  };
}

export function setDelivery(x) {
  return {
    type: SET_DELIVERY,
    payload: x
  };
}

export function setAmountOffTotal(amount) {
  return {
    type: AMOUNT_OFF_TOTAL,
    payload: amount
  };
}

export function addTip(amount) {
  return {
    type: ADD_TIP,
    payload: amount
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error.message
  };
}

export function unAuthUser() {
  return {
    type: SIGN_OUT
  };
}

export function signOutUser() {
  return dispatch => {
    firebase.auth().signOut().then(response => {
      dispatch(unAuthUser());
      browserHistory.push("/");
    });
  };
}

export function verifyAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  };
}

export function signInUser(credentials) {
  return function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push("/pizzas");
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
}

export function resetOrderState() {
  return {
    type: RESET_ORDER_STATE
  };
}

export function resetSetOrderToPay() {
  return {
    type: RESET_SET_ORDER_TO_PAY
  };
}

export function setPayOrderFlag() {
  return {
    type: PAY_ORDER_FLAG
  };
}

export function saveOrder(order) {
  if (order.payOrder) {
    return;
  }
  const createdAt = moment().valueOf();
  const newOrder = {
    createdAt,
    order: order.order,
    total: order.total,
    delivery: order.delivery,
    amountOffTotal: order.amountOffTotal,
    tip: order.tip,
    name: order.name,
    phone: order.phone,
    address: order.address,
    key: order.key,
    paid: false,
    credit: null,
    completedAt: null,
    completed: false
  };
  return dispatch => {
    DB.ref("orders/")
      .push(newOrder)
      .then(response => console.log(response.toString().split("/").pop()));
    dispatch(resetOrderState());
  };
}

export function saveOrderCredit(order) {
  const createdAt = moment().valueOf();
  const newOrder = {
    createdAt: order.createdAt ? order.createdAt : createdAt,
    order: order.order,
    total: order.total,
    delivery: order.delivery,
    amountOffTotal: order.amountOffTotal,
    tip: order.tip,
    name: order.name,
    phone: order.phone,
    address: order.address,
    key: order.key,
    paid: true,
    credit: true,
    completedAt: null,
    completed: false
  };
  return dispatch => {
    if (order.key) {
      const orderRef = DB.ref("orders/" + order.key);
      orderRef.update(newOrder).then(response => {
        const dataParameter = {
          amount_money: {
            amount: "" + order.total * 100,
            currency_code: "USD"
          },
          callback_url: "https://starlight-c0e08.firebaseapp.com/square",
          client_id: "sq0idp-RZF2WdJAg8qPmLZ6xk_Zjw",
          version: "1.2",
          notes: order.key,
          options: {
            supported_tender_types: [
              "CREDIT_CARD",
              "CASH",
              "OTHER",
              "SQUARE_GIFT_CARD",
              "CARD_ON_FILE"
            ]
          }
        };

        window.location = "square-commerce-v1://payment/create?data=" +
          encodeURIComponent(JSON.stringify(dataParameter));
      });
      dispatch(resetOrderState());
    } else {
      DB.ref("orders/").push(newOrder).then(response => {
        const dataParameter = {
          amount_money: {
            amount: "" + order.total * 100,
            currency_code: "USD"
          },
          callback_url: "https://starlight-c0e08.firebaseapp.com/square",
          client_id: "sq0idp-RZF2WdJAg8qPmLZ6xk_Zjw",
          version: "1.2",
          notes: response.toString().split("/").pop(),
          options: {
            supported_tender_types: [
              "CREDIT_CARD",
              "CASH",
              "OTHER",
              "SQUARE_GIFT_CARD",
              "CARD_ON_FILE"
            ]
          }
        };

        window.location = "square-commerce-v1://payment/create?data=" +
          encodeURIComponent(JSON.stringify(dataParameter));
      });
      dispatch(resetOrderState());
    }
  };
}

export function saveOrderCash(order) {
  const createdAt = moment().valueOf();
  const newOrder = {
    createdAt: order.createdAt ? order.createdAt : createdAt,
    order: order.order,
    total: order.total,
    delivery: order.delivery,
    amountOffTotal: order.amountOffTotal,
    tip: order.tip,
    name: order.name,
    phone: order.phone,
    address: order.address,
    key: order.key,
    paid: true,
    credit: false,
    completedAt: null,
    completed: false
  };
  return dispatch => {
    if (order.key) {
      const orderRef = DB.ref("orders/" + order.key);
      orderRef.update(newOrder);
      dispatch(resetOrderState());
    } else {
      DB.ref("orders/")
        .push(newOrder)
        .then(response => console.log(response.toString().split("/").pop()));
      dispatch(resetOrderState());
    }
  };
}

export function deleteOrder(key) {
  return dispatch => (
    DB.ref("orders/" + key).remove()
  )
}

export function setOrderToPay(key, order) {
  return {
    type: SET_ORDER_TO_PAY,
    payload: { key, order }
  };
}

export function updateOrders(data) {
  return {
    type: UPDATE_ORDERS,
    payload: data.reverse()
  };
}

export function retreiveOrders() {
  const startAtTime = moment().startOf("day").valueOf();
  const orderRef = DB.ref("orders");
  return dispatch => {
    orderRef
      .orderByChild("createdAt")
      .startAt(startAtTime)
      .on("value", snapshot => {
        const newarray = [];
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const value = childSnapshot.val();
          newarray.push({ [`${key}`]: value });
        });
        dispatch(updateOrders(newarray));
      });
  };
}

export function markAsComplete(x) {
  const completedAt = moment().valueOf();
  const orderRef = DB.ref("orders/" + x);
  return dispatch => {
    orderRef.update({
      completed: true,
      completedAt
    });
  };
}
