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

function CreateTeacher(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [selectedStaffType, setSelectedStaffType] = React.useState("");
  const handleStaffTypeChange = event => {
    setSelectedStaffType(event.target.value);
  };

  const [joinDate, handleJoinDate] = React.useState(new Date());
  const handleJoinDateChange = date => {
    handleJoinDate(date);
  };

  const [dateOfBirth, handleDateOfBirth] = React.useState(new Date());
  const handleDateOfBirthChange = date => {
    handleDateOfBirth(date);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      branch_email: props.school.email,
      name: document.getElementById("create_teacher_name").value,
      email: document.getElementById("create_teacher_email").value,
      password: document.getElementById("create_teacher_password").value,
      phone_number: document.getElementById("create_teacher_phone_no").value,
      pan: document.getElementById("create_teacher_pan").value,
      qualification: document.getElementById("create_teacher_qualification")
        .value,
      designation: document.getElementById("create_teacher_designation").value,
      staff_type: selectedStaffType,
      joining_date: joinDate,
      date_of_birth: dateOfBirth
    };
    axios.post("/api/school/create_teacher", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Create Teacher" />
        <CardContent>
          <MuiPickersUtilsProvider utils={DateFnsUtil}>
            <form noValidate onSubmit={handleFormSubmit}>
              <TextField
                required
                fullWidth
                name="create_teacher_name"
                id="create_teacher_name"
                variant="outlined"
                label="Teacher Name"
                margin="dense"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_email"
                id="create_teacher_email"
                variant="outlined"
                label="Teacher Email"
                margin="dense"
                type="email"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_password"
                id="create_teacher_password"
                variant="outlined"
                label="Teacher Password"
                margin="dense"
                type="password"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_phone_no"
                id="create_teacher_phone_no"
                variant="outlined"
                label="Phone Number"
                margin="dense"
                type="number"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_pan"
                id="create_teacher_pan"
                variant="outlined"
                label="PAN"
                margin="dense"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_qualification"
                id="create_teacher_qualification"
                variant="outlined"
                label="Qualification"
                margin="dense"
              />
              <TextField
                required
                fullWidth
                name="create_teacher_designation"
                id="create_teacher_designation"
                variant="outlined"
                label="Designation"
                margin="dense"
              />
              <FormControl
                required
                variant="outlined"
                fullWidth
                style={{ marginTop: "1rem" }}
                margin="dense"
              >
                <InputLabel
                  ref={inputLabel}
                  htmlFor="create_teacher_staff_type"
                >
                  Staff Type
                </InputLabel>
                <Select
                  value={selectedStaffType}
                  onChange={handleStaffTypeChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_teacher_staff_type"
                      id="create_teacher_staff_type"
                    />
                  }
                >
                  <MenuItem value="permanent">Permanent</MenuItem>
                  <MenuItem value="intern">Intern</MenuItem>
                </Select>
              </FormControl>
              <KeyboardDatePicker
                margin="normal"
                required
                id="joining-date"
                label="Joining Date"
                format="dd/MM/yyyy"
                value={joinDate}
                onChange={handleJoinDateChange}
                KeyboardButtonProps={{ "aria-label": "change date" }}
              />
              <br />
              <KeyboardDatePicker
                margin="normal"
                required
                id="date-of-birth"
                label="Date of Birth"
                format="dd/MM/yyyy"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
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
          </MuiPickersUtilsProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateTeacher;
