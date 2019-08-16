import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/layouts/Header";
import Landing from "./components/Landing";
import Footer from "./components/layouts/Footer";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

const useStyles = makeStyles({
  "@global": {
    a: {
      textDecoration: "none"
    }
  },
  wrapper: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
});

function App() {

  const classes = useStyles();

  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <div className={classes.wrapper}>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Footer />
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
