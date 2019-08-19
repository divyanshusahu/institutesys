import axios from "axios";
import { ADD_GRIEVANCE_CATEGORY_STATUS, CLEAR_PROPS } from "./types";

export const addGrievanceCategory = userData => dispatch => {
  axios
    .post("/api/grievance_categories/create", userData)
    .then(res => {
      dispatch({
        type: ADD_GRIEVANCE_CATEGORY_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_GRIEVANCE_CATEGORY_STATUS,
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
