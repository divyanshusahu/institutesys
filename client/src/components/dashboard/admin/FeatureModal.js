import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function FeatureModal() {
  return (
    <div>
      <DialogTitle id="manage_institute">Add Features</DialogTitle>
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
          <TextField
            margin="dense"
            id="create_feature_description"
            label="Feature Description"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button tye="submit" variant="outlined" color="default">
            Submit
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default FeatureModal;
