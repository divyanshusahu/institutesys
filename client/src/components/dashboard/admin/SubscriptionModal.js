import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addSubscription,
  clearProp
} from "../../../actions/subscriptionActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

function SubscriptionModal(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    create_subscription_features: []
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [features, getFeatures] = React.useState([]);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    axios.get("/api/features/list").then(res => {
      getFeatures(res.data.item.map(i => i.name));
    });
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  React.useEffect(() => {
    if (!isEmpty(props.subscriptions.add)) {
      Swal.fire({
        type: props.subscriptions.add.success ? "success" : "error",
        text: props.subscriptions.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleSubscriptionSubmit() {
    let post_data = {
      name: document.getElementById("create_subscription_name").value,
      description: document.getElementById("create_subscription_description")
        .value,
      min_users: document.getElementById("create_subscription_min_users").value,
      price_per_user_per_month: document.getElementById(
        "create_subscription_price_per_user_per_month"
      ).value,
      price_per_user_per_year: document.getElementById(
        "create_subscription_price_per_user_per_year"
      ).value,
      number_of_free_days: document.getElementById(
        "create_subscription_number_of_free_days"
      ).value,
      number_of_free_users: document.getElementById(
        "create_subscription_number_of_free_users"
      ).value,
      features: values.create_subscription_features
    };
    props.addSubscription(post_data);
  }

  return (
    <div>
      <DialogTitle id="subscription">Add Subscription</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_subscription_name"
            label="Subscription Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_name
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_description
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_min_users"
            label="Min Users"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_min_users
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_price_per_user_per_month"
            label="Price per user/month"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_price_per_user_per_month
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_price_per_user_per_year"
            label="Price per user/year"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_price_per_user_per_year
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_number_of_free_days"
            label="Number of free days"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_number_of_free_days
              : null}
          </FormHelperText>

          <TextField
            margin="dense"
            id="create_subscription_number_of_free_users"
            label="Number of free users"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_subscription_number_of_free_users
              : null}
          </FormHelperText>

          <FormControl required variant="outlined" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="create_subscription_features">
              Select Subscription Features
            </InputLabel>
            <Select
              multiple
              value={values.create_subscription_features}
              onChange={handleChange}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="create_subscription_features"
                  id="create_subscription_features"
                />
              }
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {features.map(feature => (
                <MenuItem key={feature} value={feature}>
                  {feature}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleSubscriptionSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

SubscriptionModal.propTypes = {
  addSubscription: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  subscriptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  subscriptions: state.subscriptions
});

export default connect(
  mapStateToProps,
  { addSubscription, clearProp }
)(SubscriptionModal);
