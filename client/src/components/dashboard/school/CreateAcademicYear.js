import React from "react";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

function CreateAcademicYear(props) {
  const [date, handleDate] = React.useState(new Date());
  const handleDateChange = date => {
    handleDate(date);
  };

  const [isCurrentYear, setCurrentYear] = React.useState(true);
  const handleYear = event => {
    setCurrentYear(event.target.checked);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    var post_data = {
      email: props.school.email,
      year_name: document.getElementById("create_academic_year_name").value,
      start_date: date,
      is_current_year: isCurrentYear
    };
    axios.post("/api/school/create_academic_year", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

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
