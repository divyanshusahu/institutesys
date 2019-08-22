import axios from "axios";
import { ADD_SUBSCRIPTION_STATUS, CLEAR_PROPS } from "./types";

export const addSubscription = userData => dispatch => {
  axios
    .post("/api/subscriptions/create", userData)
    .then(res => {
      dispatch({
        type: ADD_SUBSCRIPTION_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_SUBSCRIPTION_STATUS,
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
