import React from "react";

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

function CreateBranch() {
  const [values, setValues] = React.useState({
    standard: ""
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

  const handleSubmit = (event) => {
    event.preventDefault();
  }

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
              <TextField
                label="Address"
                variant="outlined"
                margin="dense"
                id="create_branch_address"
                name="create_branch_address"
                required
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                id="create_branch_email"
                name="create_branch_email"
                required
                fullWidth
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                margin="dense"
                id="create_branch_phone_number"
                name="create_branch_phone_number"
                required
                fullWidth
              />
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

export default CreateBranch;
