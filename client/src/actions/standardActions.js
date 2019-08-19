import axios from "axios";
import { ADD_STANDARD_STATUS, CLEAR_PROPS } from "./types";

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
        type: ADD_STANDARD_STATUS,
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
