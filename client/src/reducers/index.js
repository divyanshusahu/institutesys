import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import instituteReducer from "./instituteReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  institutes: instituteReducer,
  datalist: listReducer
});

export default rootReducer;
