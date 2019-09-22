import React from "react";
import axios from "axios";
import clsx from "clsx";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  active: {
    backgroundColor: "#3f51b5",
    color: "#ffffff"
  },
  timetable_root: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  timetable_children: {
    flexBasis: 0,
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(2),
    border: "1px solid rgba(0,0,0,0.5)"
  },
  timetable_slots_disabled: {
    backgroundColor: "rgba(240, 240, 240, 1)",
    pointerEvents: "none"
  },
  timetable_slots_enabled: {
    cursor: "pointer"
  },
  update_button: {
    marginTop: theme.spacing(5)
  }
}));

function AddTimeTable(props) {
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

  const [teachers, setTeachers] = React.useState("");
  React.useEffect(() => {
    axios
      .get("/api/school/list_teachers?email=" + props.school.email)
      .then(res => {
        setTeachers(res.data.teachers);
      });
  }, [props.school.email]);

  const [showTeachers, setShowTeachers] = React.useState([]);
  const listTeachers = (grade, division) => {
    var temp = [];
    for (let i = 0; i < teachers.length; i++) {
      for (let j = 0; j < teachers[i].skills.length; j++) {
        if (
          teachers[i].skills[j].grade === grade &&
          teachers[i].skills[j].division === division
        ) {
          temp.push({
            name: teachers[i].name,
            subject: teachers[i].skills[j].subject_name,
            email: teachers[i].email
          });
        }
      }
    }
    setShowTeachers(temp);
  };

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
    listDivision(event.target.value);
  };

  const [selectedDivision, setSelectedDivision] = React.useState("");
  const handleDivisionChange = event => {
    setSelectedDivision(event.target.value);
    listTeachers(selectedGrade, event.target.value);
  };

  const [emptyCells, setEmptyCells] = React.useState([]);
  const [timetableColumns, setColumns] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/add_weekly_holidays?email=" + props.school.email)
      .then(res => {
        var columns = ["Period"];
        var fields = Object.keys(res.data.holidays);
        for (let i = 0; i < fields.length; i++) {
          if (!res.data.holidays[fields[i]]) {
            columns.push(fields[i]);
          }
        }
        setColumns(columns);
        var cells = [];
        for (let i = 1; i < columns.length; i++) {
          cells.push(
            <div
              className={clsx(
                classes.timetable_children,
                classes.timetable_slots_disabled
              )}
              key={columns[i]}
              name={columns[i]}
            ></div>
          );
        }
        setEmptyCells(cells);
      });
  }, [
    props.school.email,
    classes.timetable_children,
    classes.timetable_slots_disabled
  ]);

  const [slots, setSlots] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_slots?email=" + props.school.email)
      .then(res => {
        setSlots(res.data.slots);
      });
  }, [props.school.email]);

  const initialTimeTable = slots.map(s => (
    <div className={classes.timetable_root} key={s.period}>
      <span className={classes.timetable_children}>{s.period}</span>
      {emptyCells.map(c => c)}
    </div>
  ));

  const [initTimeTable, setInitialTimeTable] = React.useState(initialTimeTable);
  React.useEffect(() => {
    setInitialTimeTable(
      slots.map(s => (
        <div className={classes.timetable_root} key={s.period}>
          <span className={classes.timetable_children}>{s.period}</span>
          {emptyCells.map(c => c)}
        </div>
      ))
    );
  }, [classes.timetable_root, classes.timetable_children, emptyCells, slots]);

  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const handleTeacherSelect = email => {
    setSelectedTeacher(email);
    setTimeout(() => {
      var available_time_slots = [];
      for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].email === email) {
          available_time_slots = teachers[i].available_time_slots;
          break;
        }
      }
      for (let i = 0; i < available_time_slots.length; i++) {
        var index = available_time_slots[i].period - 1;
        for (let j = 1; j < timetableColumns.length; j++) {
          if (available_time_slots[i][timetableColumns[j]]) {
            let element = document.getElementsByName(timetableColumns[j])[
              index
            ];
            element.classList.remove(classes.timetable_slots_disabled);
            element.classList.add(classes.timetable_slots_enabled);
          }
        }
      }
    }, 5000);
  };

  return (
    <div>
      <Card>
        <CardHeader title="Add Division Time Table" />
        <CardContent>
          <FormControl required variant="outlined" fullWidth margin="normal">
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
          <div>
            <GridList cellHeight={160} cols={4}>
              <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
                <ListSubheader component="div">List of Teachers</ListSubheader>
              </GridListTile>
              {showTeachers.map(teacher => (
                <GridListTile key={teacher.email} cols={1}>
                  <Paper
                    className={clsx(
                      classes.paper,
                      selectedTeacher === teacher.email ? classes.active : null
                    )}
                    onClick={() => handleTeacherSelect(teacher.email)}
                  >
                    <div>
                      <Typography variant="body1" component="p">
                        {teacher.name}
                      </Typography>
                      <Typography variant="body1" component="p">
                        {teacher.subject}
                      </Typography>
                    </div>
                  </Paper>
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div>
            <div className={classes.timetable_root}>
              {timetableColumns.map(f => (
                <span key={f} className={classes.timetable_children}>
                  {f}
                </span>
              ))}
            </div>
            {initTimeTable}
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.update_button}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTimeTable;