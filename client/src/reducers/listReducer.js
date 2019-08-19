import { LIST_DATA } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
