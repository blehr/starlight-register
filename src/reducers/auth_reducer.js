import { AUTH_ERROR, AUTH_USER, SIGN_OUT } from "../actions/types";

export default function(state = { authenticated: false, error: null }, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case SIGN_OUT:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
