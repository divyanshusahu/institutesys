import axios from "axios";
import { ADD_FEATURE_STATUS, CLEAR_PROPS } from "./types";

export const addFeature = userData => dispatch => {
  axios
    .post("/api/features/create", userData)
    .then(res => {
      dispatch({
        type: ADD_FEATURE_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_FEATURE_STATUS,
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
