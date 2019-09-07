import { SCHOOL_SIDEBAR } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SCHOOL_SIDEBAR:
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
}
