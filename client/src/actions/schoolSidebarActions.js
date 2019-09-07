import { SCHOOL_SIDEBAR } from "./types";

export const schoolSidebarSelect = type => dispatch => {
  dispatch({
    type: SCHOOL_SIDEBAR,
    payload: type
  });
};
