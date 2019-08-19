import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStandard, clearProp } from "../../../actions/standardActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

function StandardModal(props) {
  React.useEffect(() => {
    if (!isEmpty(props.standards.add)) {
      Swal.fire({
        type: props.standards.add.success ? "success" : "error",
        text: props.standards.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleStandardSubmit() {
    let post_data = {
      name: document.getElementById("create_standard_name").value,
      description: document.getElementById("create_standard_description").value
    };
    props.addStandard(post_data);
  }

  return (
    <div>
      <DialogTitle id="standard">Standard Detail</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_standard_name"
            label="Standard Type"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors) ? props.errors.create_standard_name : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_standard_description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_standard_description
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleStandardSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

StandardModal.propTypes = {
  addStandard: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  standards: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  standards: state.standards
});

export default connect(
  mapStateToProps,
  { addStandard, clearProp }
)(StandardModal);
