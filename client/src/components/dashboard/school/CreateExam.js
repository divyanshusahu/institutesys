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

function CreateExam(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [entryDate, setEntryDate] = React.useState(new Date());
  const handleEntryDate = date => {
    setEntryDate(date);
  };

  const [parentsApprovalDate, setParentsApprovalDate] = React.useState(
    new Date()
  );
  const handleParentsApprovalDate = date => {
    setParentsApprovalDate(date);
  };

  const [examPrepareDate, setExamPrepareDate] = React.useState(new Date());
  const handleExamPrepareDate = date => {
    setExamPrepareDate(date);
  };

  const [classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        var temp = res.data.grades.map(c => c.grade);
        setClasses(temp);
      });
  }, [setClasses, props.school.email]);

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
  };

  const [years, setYears] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_academic_years?email=" + props.school.email)
      .then(res => {
        var temp = res.data.years.map(y => y.year_name);
        setYears(temp);
      });
  }, [setYears, props.school.email]);

  const [selectedYear, setSelectedYear] = React.useState("");
  const handleYearChange = event => {
    setSelectedYear(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      year: selectedYear,
      name: document.getElementById("create_exam_name").value,
      grade: selectedGrade,
      description: document.getElementById("create_exam_description").value,
      marks_entry_date: entryDate,
      parents_approval_date: parentsApprovalDate,
      exam_prepare_date: examPrepareDate
    };
    axios.post("/api/school/create_exam", post_data).then(res => {
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
          <CardHeader title="Create Exam" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <FormControl
                required
                variant="outlined"
                fullWidth
                margin="normal"
              >
                <InputLabel ref={inputLabel} htmlFor="create_exam_year">
                  Select Exam Year
                </InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_exam_year"
                      id="create_exam_year"
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
                name="create_exam_name"
                id="create_exam_name"
                label="Exam Name"
                variant="outlined"
                margin="normal"
              />
              <FormControl
                required
                variant="outlined"
                fullWidth
                margin="normal"
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
                name="create_exam_description"
                id="create_exam_description"
                label="Exam Description"
                variant="outlined"
                margin="normal"
              />
              <KeyboardDatePicker
                required
                margin="normal"
                format="dd/MM/yyyy"
                label="Marks Entry Date"
                value={entryDate}
                onChange={handleEntryDate}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
              <br />
              <KeyboardDatePicker
                required
                margin="normal"
                format="dd/MM/yyyy"
                label="Parents Approval Date"
                value={parentsApprovalDate}
                onChange={handleParentsApprovalDate}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
              <br />
              <KeyboardDatePicker
                required
                margin="normal"
                format="dd/MM/yyyy"
                label="Exam Prepare Date"
                value={examPrepareDate}
                onChange={handleExamPrepareDate}
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

export default CreateExam;
