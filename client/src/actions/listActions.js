import { LIST_DATA } from "./types";
import axios from "axios";

export const listData = type => dispatch => {
  if (type === "institute") {
    axios.get("/api/institutes/list").then(res => {
      dispatch({
        type: LIST_DATA,
        payload: res.data
      });
    });
  } else if (type === "feature") {
    axios.get("/api/features/list").then(res => {
      dispatch({
        type: LIST_DATA,
        payload: res.data
      });
    });
  } else if (type === "standard") {
    axios.get("/api/standards/list").then(res => {
      dispatch({
        type: LIST_DATA,
        payload: res.data
      });
    });
  } else if (type === "category") {
    axios.get("/api/categories/list").then(res => {
      dispatch({
        type: LIST_DATA,
        payload: res.data
      });
    });
  } else if (type === "grievance_category") {
    axios.get("/api/grievance_categories/list").then(res => {
      dispatch({
        type: LIST_DATA,
        payload: res.data
      });
    });
  }
};
