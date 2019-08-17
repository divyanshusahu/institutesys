import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, REGISTER_STATUS } from "./types";

// Register
export const registerUser = (userData) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => dispatch({
      type: REGISTER_STATUS,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("institutesysJWTtoken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("institutesysJWTtoken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
