import React from "react";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

function CreateAcademicYear() {
  const [date, handleDate] = React.useState(new Date());
  const handleDateChange = date => {
    handleDate(date);
  };

  const [isCurrentYear, setCurrentYear] = React.useState(true);
  const handleYear = event => {
    setCurrentYear(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtil}>
        <Card>
          <CardHeader title="Add Academic Year" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <TextField
                required
                fullWidth
                margin="dense"
                name="create_academic_year_name"
                id="create_academic_year_name"
                label="Year Name"
                variant="outlined"
              />
              <KeyboardDatePicker
                margin="normal"
                required
                id="date-picker-dialog"
                label="Start Date"
                format="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{ "aria-label": "change date" }}
              />
              <br />
              <FormControlLabel
                control={
                  <Switch
                    checked={isCurrentYear}
                    value={isCurrentYear}
                    onChange={handleYear}
                    color="primary"
                    id="isCurrentYear"
                    name="isCurrentYear"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Is Current Year"
                labelPlacement="end"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "2rem" }}
              >
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default CreateAcademicYear;
