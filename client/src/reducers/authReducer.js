import { SET_CURRENT_USER, USER_LOADING, REGISTER_STATUS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  registerMessage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_STATUS: 
      return {
        ...state,
        registerMessage: action.payload
      }
    default:
      return state;
  }
}
