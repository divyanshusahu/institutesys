import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function NewUserRegister(props) {
  const classes = useStyles();
  const [insData, setData] = React.useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    let token = window.location.search.substring(1).split("=")[1];
    axios
      .get("/api/brancjes/newuser/create_password?token=" + token)
      .then(res => {
        setData({
          name: res.data.name,
          email: res.data.email
        });
      });
  }, []);

  const registerSubmit = event => {
    event.preventDefault();

    if (
      document.getElementById("password").value ===
      document.getElementById("confirm_password").value
    ) {
      let newUser = {
        name: insData.name,
        username: document.getElementById("username").value,
        email: insData.owner_email,
        password: document.getElementById("password").value,
        role: "institute",
        isVerified: true,
        _id: insData._id
      };
      axios.post("/api/branches/newuser/create_password", newUser).then(res => {
        if (res.data.success) {
          window.location.pathname = "/login";
        }
      });
    } else {
      Swal.fire({
        type: "error",
        text: "Password doen not match"
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={registerSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                disabled
                value={insData.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled
                value={insData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default NewUserRegister;
