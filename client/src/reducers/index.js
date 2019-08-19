import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import instituteReducer from "./instituteReducer";
import featureReducer from "./featureReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  institutes: instituteReducer,
  features: featureReducer,
  datalist: listReducer
});

export default rootReducer;
