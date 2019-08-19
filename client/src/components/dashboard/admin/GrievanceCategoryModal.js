import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addGrievanceCategory,
  clearProp
} from "../../../actions/grievanceCategoryActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

function GrievanceCategoryModal(props) {
  React.useEffect(() => {
    if (!isEmpty(props.grievance_categories.add)) {
      Swal.fire({
        type: props.grievance_categories.add.success ? "success" : "error",
        text: props.grievance_categories.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleGrievanceCategorySubmit() {
    let post_data = {
      name: document.getElementById("create_gc_name").value,
      description: document.getElementById("create_gc_description").value
    };
    props.addGrievanceCategory(post_data);
  }

  return (
    <div>
      <DialogTitle id="grievance_category">Add Grievance Category</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_gc_name"
            label="Category Type"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_grievance_category_name
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_gc_description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_grievance_category_description
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleGrievanceCategorySubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

GrievanceCategoryModal.propTypes = {
  addGrievanceCategory: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  grievance_categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  grievance_categories: state.grievance_categories
});

export default connect(
  mapStateToProps,
  { addGrievanceCategory, clearProp }
)(GrievanceCategoryModal);
