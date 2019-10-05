import React from "react";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
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

function CreateGrade(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [startTime, setStartTime] = React.useState(new Date());
  const handleStartTime = date => {
    setStartTime(date);
  };

  const [endTime, setEndTime] = React.useState(new Date());
  const handleEndTime = date => {
    setEndTime(date);
  };

  const [classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    if (props.standard === "primary_school") {
      setClasses(["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"]);
    } else if (props.standard === "secondary_school") {
        setClasses(["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"]);
      }
  }, [setClasses, props.standard]);

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      create_grade: selectedGrade,
      description: document.getElementById("create_grade_description").value,
      max_student: document.getElementById("create_grade_max_students").value,
      age: document.getElementById("create_grade_age").value,
      start_time: startTime,
      end_time: endTime
    };
    axios.post("/api/school/create_grade", post_data).then(res => {
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
          <CardHeader title="Create Grade" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <FormControl required variant="outlined" fullWidth>
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
                name="create_grade_description"
                id="create_grade_description"
                label="Grade Description"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                type="number"
                name="create_grade_max_students"
                id="create_grade_max_students"
                label="Max Student per Division"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                fullWidth
                type="number"
                name="create_grade_age"
                id="create_grade_age"
                label="Age of Student for this grade"
                variant="outlined"
                margin="normal"
              />
              <KeyboardTimePicker
                required
                margin="normal"
                id="create_grade_start_time"
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
              <br />
              <KeyboardTimePicker
                required
                margin="normal"
                id="create_grade_end_time"
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
                KeyboardButtonProps={{ "aria-label": "change time" }}
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

export default CreateGrade;
