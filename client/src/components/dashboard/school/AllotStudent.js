import React from "react";
import axios from "axios";
import isEmpty from "is-empty";
import clsx from "clsx";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2)
  },
  student_root: {
    padding: theme.spacing(2),
    fontSize: 18
  },
  student_children: {
    cursor: "pointer"
  },
  student_selected: {
    color: "#ffffff",
    backgroundColor: "#3f51b5",
    padding: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

function AllotStudent(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [grades, setGrades] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        var temp = res.data.grades.map(g => g.grade);
        setGrades(temp);
      });
  }, [props.school.email, setGrades]);

  const [divisions, setDivisions] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_divisions?email=" + props.school.email)
      .then(res => {
        setDivisions(res.data.divisions);
      });
  }, [props.school.email]);

  const [showDivision, setShowDivision] = React.useState([]);
  const listDivision = grade => {
    var temp = [];
    for (let i = 0; i < divisions.length; i++) {
      if (divisions[i].grade === grade) {
        temp.push(divisions[i].name);
      }
    }
    setShowDivision(temp);
  };

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
    listDivision(event.target.value);
  };

  const [selectedDivision, setSelectedDivision] = React.useState("");
  const handleDivisionChange = event => {
    setSelectedDivision(event.target.value);
  };

  const [students, setStudents] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_students?email=" + props.school.email)
      .then(res => {
        var temp = [];
        for (let i = 0; i < res.data.students.length; i++) {
          if (
            res.data.students[i].grade === selectedGrade &&
            isEmpty(res.data.students[i].division)
          ) {
            temp.push(res.data.students[i]);
          }
        }
        setStudents(temp);
      });
  }, [props.school.email, selectedGrade, setStudents]);

  const [selectedStudent, setSelectedStudent] = React.useState("");
  const handleStudentSelect = email => {
    setSelectedStudent(email);
  };

  const handleFormSubmit = () => {
    if (isEmpty(selectedStudent) || isEmpty(selectedDivision)) {
      Swal.fire({
        type: "error",
        text: "Please select both student and division"
      });
    } else {
      var post_data = {
        email: props.school.email,
        grade: selectedGrade,
        student: selectedStudent,
        division: selectedDivision
      };
      axios
        .post("/api/school/allot_student", post_data)
        .then(res => {
          Swal.fire({
            type: "success",
            text: res.data.message
          });
        })
        .catch(res => {
          Swal.fire({
            type: "error",
            text: res.data.message
          });
        });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader title="Allot Student" />
        <CardContent>
          <FormControl required variant="outlined" margin="normal" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="select_grade">
              Select Grade
            </InputLabel>
            <Select
              value={selectedGrade}
              onChange={handleGradeChange}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="select_grade"
                  id="select_grade"
                />
              }
            >
              {grades.map(c => (
                <MenuItem value={c} key={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required variant="outlined" fullWidth margin="normal">
            <InputLabel ref={inputLabel} htmlFor="select_division">
              Select Division
            </InputLabel>
            <Select
              value={selectedDivision}
              onChange={handleDivisionChange}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="select_division"
                  id="select_division"
                  disabled={selectedGrade ? false : true}
                />
              }
            >
              {showDivision.map(c => (
                <MenuItem value={c} key={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CardHeader subheader="List Students" />
          <Paper className={classes.paper}>
            {students.map(s => (
              <div key={s.email} className={classes.student_root}>
                <span
                  className={clsx(
                    classes.student_children,
                    selectedStudent === s.email ? classes.student_selected : ""
                  )}
                  onClick={() => handleStudentSelect(s.email)}
                >
                  {s.name}
                </span>
              </div>
            ))}
          </Paper>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleFormSubmit}
          >
            Add
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AllotStudent;
