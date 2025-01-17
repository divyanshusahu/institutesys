import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import instituteReducer from "./instituteReducer";
import featureReducer from "./featureReducer";
import subscriptionReducer from "./subscriptionReducer";
import taxReducer from "./taxReducer";
import standardReducer from "./standardReducer";
import categoryReducer from "./categoryReducer";
import grievanceCategoryReducer from "./grievanceCategoryReducer";
import listReducer from "./listReducer";
import branchReducer from "./branchReducer";
import schoolSidebarReducer from "./schoolSidebarReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  institutes: instituteReducer,
  features: featureReducer,
  subscriptions: subscriptionReducer,
  tax: taxReducer,
  standards: standardReducer,
  categories: categoryReducer,
  grievance_categories: grievanceCategoryReducer,
  datalist: listReducer,
  branches: branchReducer,
  schoolSidebar: schoolSidebarReducer
});

export default rootReducer;
