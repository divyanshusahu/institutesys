import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import instituteReducer from "./instituteReducer";
import featureReducer from "./featureReducer";
import standardReducer from "./standardReducer";
import categoryReducer from "./categoryReducer";
import grievanceCategoryReducer from "./grievanceCategoryReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  institutes: instituteReducer,
  features: featureReducer,
  standards: standardReducer,
  categories: categoryReducer,
  grievance_categories: grievanceCategoryReducer,
  datalist: listReducer
});

export default rootReducer;
