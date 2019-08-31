import axios from "axios";
import { ADD_BRANCH, CLEAR_PROPS } from "./types";

export const addBranch = userData => dispatch => {
  axios
    .post("/api/branches/create", userData)
    .then(res => {
      dispatch({
        type: ADD_BRANCH,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_BRANCH,
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
