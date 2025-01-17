import axios from "axios";
import { ADD_INSTITUTE_STATUS, CLEAR_PROPS } from "./types";

export const addInstitute = userData => dispatch => {
  axios
    .post("/api/institutes/create", userData)
    .then(res => {
      dispatch({
        type: ADD_INSTITUTE_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_INSTITUTE_STATUS,
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
