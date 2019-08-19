import axios from "axios";
import { GET_ERRORS, ADD_CATEGORY_STATUS, CLEAR_PROPS } from "./types";

export const addCategory = userData => dispatch => {
  axios
    .post("/api/categories/create", userData)
    .then(res => {
      dispatch({
        type: ADD_CATEGORY_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
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
