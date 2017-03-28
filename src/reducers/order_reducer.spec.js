/* globals expect */
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import orderReducer from './order_reducer';
import * as actions from '../actions';
import * as types from '../actions/types';
import { itemMock } from "../utils/utils";
import {
  initialState,
  item1,
  item1_full,
  editedItem1,
  editedItem1_full,
  item2,
  item2_full,
  item1_full_state,
  editedItem1_full_state,
  twoItemState,
  twoItemState_type
} from './_testing_states';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

test("orderReducer returns initial state", () => {
  expect(
    orderReducer(undefined, {})  
  ).toEqual(initialState);
});

test("action.createNewItem, types.CREATE_NEW_ITEM, add item to state, edit that item", () => {
  const store = mockStore(initialState);
  
  store.dispatch(actions.createNewItem(item1));
  
  expect(store.getActions()).toEqual([{
    type: types.CREATE_NEW_ITEM,
    payload: item1
  }]);
  
  expect(orderReducer(initialState, {
    type: types.CREATE_NEW_ITEM,
    payload: item1
  })).toEqual(item1_full_state);
  
  expect(orderReducer(initialState, {
    type: types.CREATE_NEW_ITEM,
    payload: editedItem1_full
  })).toEqual(editedItem1_full_state);
  
});

test("TYPE_CLICK should add type: 'name' to correct item", () => {
    expect(orderReducer(
      twoItemState,
      {
        type: types.TYPE_CLICK,
        payload: {type: "Garden"}
      })).toEqual(twoItemState_type);
});

