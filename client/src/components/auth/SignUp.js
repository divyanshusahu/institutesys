import React, { useEffect } from "react";
import { Link as RLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import Swal from "sweetalert2";
import isEmpty from "is-empty";

import countries from "../dashboard/admin/countries";

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

function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    country_name: ""
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    if (!isEmpty(props.auth.registerMessage)) {
      Swal.fire({
        type: props.auth.registerMessage.success ? "success" : "error",
        text: props.auth.registerMessage.message,
        onClose: () => {
          props.history.push("login");
        }
      });
    }
    //console.log(props);
  }, [props.auth.registerMessage, props.history]);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function registerSubmit(event) {
    event.preventDefault();

    let newUser = {
      name: document.getElementById("name").value,
      username: document.getElementById("email").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirm_password").value,
      role: "institute",
      country_name: values.country_name,
      phone_number: document.getElementById("phone_number").value,
      registration_number: document.getElementById("registration_number").value,
      funding_body: document.getElementById("funding_body").value,
      size_of_the_institute: document.getElementById("size_of_the_institute")
        .value,
      captcha: document.getElementById("g-recaptcha-response").value
    };
    props.registerUser(newUser);
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
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
              <FormControl required variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} htmlFor="country_name">
                  Country Name
                </InputLabel>
                <Select
                  value={values.country_name}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="country_name"
                      id="country_name"
                    />
                  }
                >
                  {countries.map(c => (
                    <MenuItem value={c} key={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText error margin="dense">
                {props.errors["create_institute_country_name"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Institute Name"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_name"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="phone_number"
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                label="Phone Number"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_phone_number"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="registration_number"
                variant="outlined"
                required
                fullWidth
                id="registration_number"
                label="Registration Number"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_registration_number"]}
              </FormHelperText>
            </Grid>
            {/*<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              <FormHelperText error>{props.errors["username"]}</FormHelperText>
            </Grid>*/}
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_owner_email"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="funding_body"
                label="Funding Body"
                id="funding_body"
                autoComplete="funding_body"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_funding_body"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                name="size_of_the_institute"
                label="Size of the Institute"
                id="size_of_the_institute"
                autoComplete="size_of_the_institute"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_size_of_the_institute"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_password"]}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="canfirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                margin="dense"
              />
              <FormHelperText error margin="dense">
                {props.errors["create_institute_confirm_password"]}
              </FormHelperText>
            </Grid>
            {/*<Grid item xs={12}>
              <FormControl required variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} htmlFor="role">
                  Role
                </InputLabel>
                <Select
                  value={values.role}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="role"
                      id="role"
                    />
                  }
                >
                  <MenuItem value="Institute">Institute</MenuItem>
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Parent">Parent</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText error>{props.errors["role"]}</FormHelperText>
            </Grid>*/}
            <Grid item xs={12}>
              <div
                className="g-recaptcha"
                data-sitekey="6LetqLUUAAAAAOiP3SzMZMqSkAX98coVN7YsHj7L"
              ></div>
              <FormHelperText error margin="dense">
                {props.errors["create_institute_captcha"]}
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(SignUp);
