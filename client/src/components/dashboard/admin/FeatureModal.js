import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFeature, clearProp } from "../../../actions/featureActions";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";

function FeatureModal(props) {
  React.useEffect(() => {
    if (!isEmpty(props.features.add)) {
      Swal.fire({
        type: props.features.add.success ? "success" : "error",
        text: props.features.add.message
      });
      props.clearProp();
    }
  }, [props]);

  function handleFeatureSubmit() {
    let post_data = {
      name: document.getElementById("create_feature_name").value,
      description: document.getElementById("create_feature_description").value
    };
    props.addFeature(post_data);
  }

  return (
    <div>
      <DialogTitle id="features">Add Features</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="create_feature_name"
            label="Feature Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors) ? props.errors.create_feature_name : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_feature_description"
            label="Feature Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_feature_description
              : null}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            tye="submit"
            variant="outlined"
            color="default"
            onClick={handleFeatureSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

FeatureModal.propTypes = {
  addFeature: PropTypes.func.isRequired,
  clearProp: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  features: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  features: state.features
});

export default connect(
  mapStateToProps,
  { addFeature, clearProp }
)(FeatureModal);
