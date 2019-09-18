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
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function CreateHoliday(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  
  const [date, handleDate] = React.useState(new Date());
  const handleDateChange = date => {
    handleDate(date);
  };

  const [selectedYear, setSelectedYear] = React.useState("");
  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  const [years, setYears] = React.useState([]);
  React.useEffect(() => {
    axios.get("/api/school/list_academic_years?email="+props.school.email).then(res => {
      var temp = res.data.years.map(y => y.year_name);
      setYears(temp);
    });
  }, [setYears, props.school.email]);

  const handleFormSubmit = event => {
    event.preventDefault();
    var post_data = {
      email: props.school.email,
      year: selectedYear,
      date: date,
      description: document.getElementById("create_holiday_description").value
    };
    axios.post("/api/school/create_holiday", post_data).then(res => {
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
          <CardHeader title="Add Holiday" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <FormControl required variant="outlined" fullWidth margin="dense">
                <InputLabel ref={inputLabel} htmlFor="create_holiday_year">
                  Year
                </InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_holiday_year"
                      id="create_holiday_year"
                    />
                  }
                >
                  {years.map(c => (
                    <MenuItem value={c} key={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                margin="dense"
                name="create_holiday_description"
                id="create_holiday_description"
                label="Holiday Description"
                variant="outlined"
              />
              <KeyboardDatePicker
                margin="normal"
                required
                id="holiday-date"
                label="Holiday Date"
                format="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{ "aria-label": "change date" }}
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

export default CreateHoliday;
