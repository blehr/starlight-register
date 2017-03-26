import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import OrderReducer from './order_reducer';
import AuthReducer from './auth_reducer';
import SavedOrdersReducer from './saved_order_reducer';

const rootReducer = combineReducers({
  order: OrderReducer,
  auth: AuthReducer,
  form: formReducer,
  savedOrders: SavedOrdersReducer
});

export default rootReducer;
