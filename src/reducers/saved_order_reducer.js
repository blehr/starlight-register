import {
  UPDATE_ORDERS,
  TODAY_ORDERS,
  YESTERDAY_ORDERS,
  MONTH_ORDERS
} from '../actions/types';


export default function(state={orders: [], todayOrders: [], yesterdayOrders: [], monthOrders: []}, action) {
  switch(action.type) {
    case UPDATE_ORDERS:
      return { ...state, orders: [...action.payload] };
    case TODAY_ORDERS:
      return { ...state, todayOrders: [ ...action.payload] };
    case YESTERDAY_ORDERS:
      return { ...state, yesterdayOrders: [ ...action.payload] };
    case MONTH_ORDERS:
      return { ...state, monthOrders: [ ...action.payload] };
    default:
      return state;
  }
}