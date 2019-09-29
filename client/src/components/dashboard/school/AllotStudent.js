import React from "react";
import axios from "axios";
import isEmpty from "is-empty";
import clsx from "clsx";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    marginTop: theme.spacing(2),
    minHeight: 500,
    backgroundColor: "rgba(240,240,240,0.5)"
  },
  display_root: {
    display: "flex",
    flexDirection: "row",
    minHeight: 550
  },
  display_child: {
    flexBasis: 0,
    flexGrow: 1,
    margin: theme.spacing(1),
    overflow: "auto"
  },
  student_root: {
    padding: theme.spacing(1),
    fontSize: 18,
    width: "100%",
    textAlign: "center"
  },
  student_children: {
    margin: 0,
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
    width: "80%"
  },
  student_selected: {
    color: "#ffffff",
    backgroundColor: "#3f51b5",
    padding: theme.spacing(1)
  },
  division_root: {
    padding: theme.spacing(1)
  },
  division_child: {
    minHeight: 100,
    border: "1px solid rgba(0,0,0,0.1)",
    margin: "0 0",
    backgroundColor: "rgba(0,0,0,0)"
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

  const [divisionStudents, setDivisionStudents] = React.useState({
    A: [],
    B: [],
    C: [],
    D: []
  });

  const onDragEnd = result => {
    const { destination, source } = result;

    if (isEmpty(destination)) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    if (
      source.droppableId === "students" &&
      destination.droppableId !== "students"
    ) {
      let newStudents = students;
      let draggedStudent = newStudents[source.index];
      newStudents.splice(source.index, 1);
      setStudents(newStudents);

      let newDivision = divisionStudents[destination.droppableId];
      newDivision.splice(destination.index, 0, draggedStudent);
      setDivisionStudents(oldValues => ({
        ...oldValues,
        [destination.droppableId]: newDivision
      }));
    }

    if (
      destination.droppableId === "students" &&
      source.droppableId !== "students"
    ) {
      let newDivision = divisionStudents[source.droppableId];
      let draggedStudent = newDivision[source.index];
      newDivision.splice(source.index, 1);
      setDivisionStudents(oldValues => ({
        ...oldValues,
        [source.droppableId]: newDivision
      }));

      let newStudents = students;
      newStudents.splice(destination.index, 0, draggedStudent);
      setStudents(newStudents);
    }
  };

  const handleFormSubmit = () => {
    if (
      (isEmpty(divisionStudents["A"]) &&
        isEmpty(divisionStudents["B"]) &&
        isEmpty(divisionStudents["C"]) &&
        isEmpty(divisionStudents["D"])) ||
      isEmpty(selectedGrade)
    ) {
      Swal.fire({
        type: "error",
        text: "Allot atleast one student"
      });
      return;
    } else {
      var post_data = {
        email: props.school.email,
        grade: selectedGrade,
        division_students: divisionStudents
      };
      axios
        .post("/api/school/allot_students", post_data)
        .then(res => {
          Swal.fire({
            type: "success",
            text: res.data.message
          });
        })
        .catch(() => {
          Swal.fire({
            type: "error",
            text: "Error occurred"
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
          <CardHeader subheader="List Students" />
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={classes.display_root}>
              <div className={classes.display_child}>
                <Droppable droppableId="students">
                  {provided => (
                    <Paper
                      ref={provided.innerRef}
                      className={classes.paper}
                      {...provided.droppableProps}
                    >
                      {students.map((s, index) => (
                        <Draggable
                          draggableId={s.email}
                          index={index}
                          key={index}
                        >
                          {provided => (
                            <div
                              className={classes.student_root}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <p
                                className={clsx(classes.student_children)}
                                {...provided.dragHandleProps}
                              >
                                {s.name}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Paper>
                  )}
                </Droppable>
              </div>
              <div className={classes.display_child}>
                <Paper className={classes.paper}>
                  {showDivision.map((d, index) => (
                    <Droppable droppableId={d} key={index}>
                      {provided => (
                        <div className={classes.division_root}>
                          <div
                            className={classes.division_child}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <p>{d}</p>
                            {divisionStudents[d].map((s, index) => (
                              <Draggable
                                draggableId={s.email}
                                index={index}
                                key={index}
                              >
                                {provided => (
                                  <div
                                    className={classes.student_root}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <p
                                      className={clsx(classes.student_children)}
                                      {...provided.dragHandleProps}
                                    >
                                      {s.name}
                                    </p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
                </Paper>
              </div>
            </div>
          </DragDropContext>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleFormSubmit}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AllotStudent;
