import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBranch, clearProp } from "../../../actions/branchActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

function CreateBranch(props) {
  const [values, setValues] = React.useState({
    standard: "",
    institution: "",
    timezone: ""
  });
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const post_data = {
      institute_name: props.auth.user.name,
      branch_name: document.getElementById("create_branch_name").value,
      email: document.getElementById("create_branch_email").value,
      password: document.getElementById("create_branch_password").value,
      address: document.getElementById("create_branch_address").value,
      phone_number: document.getElementById("create_branch_phone_number").value,
      standard: values.standard,
      institution: values.institution,
      timezone: values.timezone
    };
    props.addBranch(post_data);
  };

  React.useEffect(() => {
    if (!isEmpty(props.branches.add)) {
      if(props.branches.add.success) {
        Swal.fire({
          type: props.branches.add.success ? "success" : "error",
          text: props.branches.add.message
        });
        props.clearProp();
      }
    }
  }, [props]);

  return (
    <div>
      <Container maxWidth="lg">
        <Card>
          <CardHeader title="Create Branch" />
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                margin="dense"
                id="create_branch_name"
                name="create_branch_name"
                required
                fullWidth
              />
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_name}
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                id="create_branch_email"
                name="create_branch_email"
                required
                fullWidth
              />
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_email}
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                label="Password"
                variant="outlined"
                margin="dense"
                id="create_branch_password"
                name="create_branch_password"
                required
                fullWidth
              />
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_password}
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                label="Address"
                variant="outlined"
                margin="dense"
                id="create_branch_address"
                name="create_branch_address"
                required
                fullWidth
              />
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_address}
                </FormHelperText>
              ) : (
                ""
              )}
              <TextField
                label="Phone Number"
                variant="outlined"
                margin="dense"
                id="create_branch_phone_number"
                name="create_branch_phone_number"
                type="number"
                required
                fullWidth
              />
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_phone_number}
                </FormHelperText>
              ) : (
                ""
              )}
              <FormControl required variant="outlined" fullWidth margin="dense">
                <InputLabel ref={inputLabel} htmlFor="standard">
                  Select Standard
                </InputLabel>
                <Select
                  value={values.standard}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="standard"
                      id="standard"
                    />
                  }
                >
                  <MenuItem value="primary_school">Primary School</MenuItem>
                  <MenuItem value="secondary_school">Secondary School</MenuItem>
                </Select>
              </FormControl>
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_standard}
                </FormHelperText>
              ) : (
                ""
              )}
              <FormControl required variant="outlined" fullWidth margin="dense">
                <InputLabel ref={inputLabel} htmlFor="institution">
                  Select Institution
                </InputLabel>
                <Select
                  value={values.institution}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="institution"
                      id="institution"
                    />
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="boys">Boys School</MenuItem>
                  <MenuItem value="girls">Girls School</MenuItem>
                </Select>
              </FormControl>
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_institution}
                </FormHelperText>
              ) : (
                ""
              )}
              <FormControl required variant="outlined" fullWidth margin="dense">
                <InputLabel ref={inputLabel} htmlFor="timezone">
                  Select Timezone
                </InputLabel>
                <Select
                  value={values.timezone}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="timezone"
                      id="timezone"
                    />
                  }
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="UTC +5:30">UTC +5:30</MenuItem>
                  <MenuItem value="UTC -5:30">UTC -5:30</MenuItem>
                </Select>
              </FormControl>
              {props.branches.add ? (
                <FormHelperText error>
                  {props.branches.add.create_branch_timezone}
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

CreateBranch.propTypes = {
  addBranch: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  branches: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  branches: state.branches,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBranch, clearProp }
)(CreateBranch);
