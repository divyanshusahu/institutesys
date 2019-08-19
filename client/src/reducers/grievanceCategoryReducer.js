import { ADD_GRIEVANCE_CATEGORY_STATUS, CLEAR_PROPS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_GRIEVANCE_CATEGORY_STATUS:
      return {
        ...state,
        add: action.payload
      };
    case CLEAR_PROPS: {
      return {
        ...state,
        add: action.payload
      };
    }
    default:
      return state;
  }
}
