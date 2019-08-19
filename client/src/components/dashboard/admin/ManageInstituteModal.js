import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addInstitute, clearProp } from "../../../actions/instituteActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";

function ManageInstituteModal(props) {
  const [values, setValues] = React.useState({
    create_institute_funding: ""
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    if (!isEmpty(props.institutes.add)) {
      Swal.fire({
        type: props.institutes.add.success ? "success" : "error",
        text: props.institutes.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleInstituteSubmit() {
    let post_data = {
      name: document.getElementById("create_institute_name").value,
      phone_number: document.getElementById("create_institute_phone_number")
        .value,
      registration_number: document.getElementById(
        "create_institute_registration_number"
      ).value,
      owner_email: document.getElementById("create_institute_owner_email")
        .value,
      funding_body: document.getElementById("create_institute_funding").value
    };
    props.addInstitute(post_data);
  }

  return (
    <div>
      <DialogTitle id="manage_institute">Add Institute</DialogTitle>
      <form onSubmit={handleInstituteSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_institute_name"
            label="Institute Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors) ? props.errors.create_institute_name : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_phone_number
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_registration_number"
            label="Registration Number"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_registration_number
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_owner_email"
            label="Owner Email"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_owner_email
              : null}
          </FormHelperText>
          <FormControl
            required
            variant="outlined"
            fullWidth
            style={{ marginTop: "0.5rem" }}
          >
            <InputLabel ref={inputLabel} htmlFor="create_institute_funding">
              Select Funding Body
            </InputLabel>
            <Select
              value={values.create_institute_funding}
              onChange={handleChange}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="create_institute_funding"
                  id="create_institute_funding"
                />
              }
            >
              <MenuItem value="Ramakrishna Mission">
                Ramakrishna Mission
              </MenuItem>
              <MenuItem value="Another Funding Body">
                Another Funding Body
              </MenuItem>
            </Select>
          </FormControl>
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_funding_body
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleInstituteSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

ManageInstituteModal.propTypes = {
  addInstitute: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  institutes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  institutes: state.institutes
});

export default connect(
  mapStateToProps,
  { addInstitute, clearProp }
)(ManageInstituteModal);
