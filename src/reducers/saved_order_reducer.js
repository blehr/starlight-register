import {
  UPDATE_ORDERS
} from '../actions/types';


export default function(state={orders: []}, action) {
  switch(action.type) {
    case UPDATE_ORDERS:
      return { ...state, orders: [...action.payload] };
    default:
      return state;
  }
}