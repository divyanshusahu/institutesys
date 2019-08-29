import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layouts/Header";
import Landing from "./components/Landing";
import Footer from "./components/layouts/Footer";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EmailVerification from "./components/auth/EmailVerification";
import InvitationRegister from "./components/auth/InvitationRegister";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import InstituteDashboard from "./components/dashboard/institute/InstituteDashboard";
import SchoolDashboard from "./components/dashboard/school/SchoolDashboard";

import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./assets/css/main.css";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

if (localStorage.institutesysJWTtoken) {
  const token = localStorage.institutesysJWTtoken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <div className={classes.wrapper}>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/home" component={Landing} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/confirmation" component={EmailVerification} />
              <Route
                path="/invitation_register"
                component={InvitationRegister}
              />
              <PrivateRoute
                exact
                path="/admindashboard"
                component={AdminDashboard}
              />
              <PrivateRoute
                exact
                path="/institutedashboard"
                component={InstituteDashboard}
              />
              <PrivateRoute
                exact
                path="/schooldashboard"
                component={SchoolDashboard}
              />
            </Switch>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
