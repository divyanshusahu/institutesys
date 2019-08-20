import axios from "axios";
import { ADD_TAX_STATUS, CLEAR_PROPS } from "./types";

export const addTax = userData => dispatch => {
  axios
    .post("/api/tax/create", userData)
    .then(res => {
      dispatch({
        type: ADD_TAX_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_TAX_STATUS,
        payload: err.response.data
      });
    });
};

export const clearProp = () => dispatch => {
  dispatch({
    type: CLEAR_PROPS,
    payload: {}
  });
};
