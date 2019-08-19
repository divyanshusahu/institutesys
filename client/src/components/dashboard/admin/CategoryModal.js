import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategory, clearProp } from "../../../actions/categoryActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

function CategoryModal(props) {
  React.useEffect(() => {
    if (!isEmpty(props.categories.add)) {
      Swal.fire({
        type: props.categories.add.success ? "success" : "error",
        text: props.categories.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleCategorySubmit() {
    let post_data = {
      name: document.getElementById("create_category_name").value,
      description: document.getElementById("create_category_description").value
    };
    props.addCategory(post_data);
  }

  return (
    <div>
      <DialogTitle id="category">Add Category</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_category_name"
            label="Category Type"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors) ? props.errors.create_category_name : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_category_description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_category_description
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleCategorySubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

CategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { addCategory, clearProp }
)(CategoryModal);
