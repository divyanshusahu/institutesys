import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/layouts/Header";
import Landing from "./components/Landing";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "white"
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
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
