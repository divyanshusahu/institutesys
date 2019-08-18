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
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";

import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Switch>
              <PrivateRoute  exact path="/admindashboard" component={AdminDashboard} />
            </Switch>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
