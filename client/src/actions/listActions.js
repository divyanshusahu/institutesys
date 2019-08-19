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
  }
};
