import axios from "axios";
import { GET_ERRORS, ADD_STANDARD_STATUS, CLEAR_PROPS } from "./types";

export const addStandard = userData => dispatch => {
  axios
    .post("/api/standards/create", userData)
    .then(res => {
      dispatch({
        type: ADD_STANDARD_STATUS,
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
