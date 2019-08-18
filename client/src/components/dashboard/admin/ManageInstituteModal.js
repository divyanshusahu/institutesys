import React from "react";
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

function ManageInstituteModal() {
  const [values, setValues] = React.useState({
    create_institute_funding: ""
  });
  
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }
  
  return (
    <div>
      <DialogTitle id="manage_institute">Add Institute</DialogTitle>
      <form>
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
          <TextField
            margin="dense"
            id="create_institute_phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            id="create_institute_registration_number"
            label="Registration Number"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            id="create_institute_owner_email"
            label="Owner Email"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <FormControl required variant="outlined" fullWidth style={{marginTop: "0.5rem"}}>
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
              <MenuItem value="Institute">Ramakrishna Mission</MenuItem>
              <MenuItem value="School">Another Funding Body</MenuItem>
            </Select>
          </FormControl>
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

export default ManageInstituteModal;
