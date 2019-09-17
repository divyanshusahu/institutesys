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

function CreateStudent(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        var classArray = res.data.grades.map(c => c.grade);
        setClasses(classArray);
      });
  }, [setClasses, props.school]);

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
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
      name: document.getElementById("create_student_name").value,
      email: document.getElementById("create_student_email").value,
      password: document.getElementById("create_student_password").value,
      admission_no: document.getElementById("create_student_admission_no")
        .value,
      address: document.getElementById("create_student_address").value,
      joining_date: joinDate,
      date_of_birth: dateOfBirth,
      grade: selectedGrade,
      previous_class_performance: document.getElementById(
        "create_student_prev_class"
      ).value
    };
    axios.post("/api/school/create_student", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Create Student" />
        <CardContent>
          <MuiPickersUtilsProvider utils={DateFnsUtil}>
            <form noValidate onSubmit={handleFormSubmit}>
              <TextField
                required
                fullWidth
                name="create_student_name"
                id="create_student_name"
                variant="outlined"
                label="Student Name"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                name="create_student_email"
                id="create_student_email"
                variant="outlined"
                label="Student Email"
                margin="normal"
                type="email"
              />
              <TextField
                required
                fullWidth
                name="create_student_password"
                id="create_student_password"
                variant="outlined"
                label="Student Password"
                margin="normal"
                type="password"
              />
              <TextField
                required
                fullWidth
                name="create_student_admission_no"
                id="create_student_admission_no"
                variant="outlined"
                label="Admission Number"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                name="create_student_address"
                id="create_student_address"
                variant="outlined"
                label="Address"
                margin="normal"
              />
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
              <FormControl
                required
                variant="outlined"
                fullWidth
                style={{ marginTop: "1rem" }}
              >
                <InputLabel ref={inputLabel} htmlFor="create_grade">
                  Grade
                </InputLabel>
                <Select
                  value={selectedGrade}
                  onChange={handleGradeChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_grade"
                      id="create_grade"
                    />
                  }
                >
                  {classes.map(c => (
                    <MenuItem value={c} key={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                name="create_student_prev_class"
                id="create_student_prev_class"
                variant="outlined"
                label="Previous Class performance"
                margin="normal"
                type="number"
              />
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

export default CreateStudent;
