import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function ListGrades(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Grade",
            field: "grade"
          },
          {
            title: "Description",
            field: "description"
          },
          {
            title: "Max Student",
            field: "max_student"
          }
        ];
        setData({
          columns: columns,
          data: res.data.grades
        });
      });
  }, [props.school, setData]);

  const handleRefresh = () => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Grade",
            field: "grade"
          },
          {
            title: "Description",
            field: "description"
          },
          {
            title: "Max Student",
            field: "max_student"
          }
        ];
        setData({
          columns: columns,
          data: res.data.grades
        });
      });
  };

  const handleDelete = data => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        var post_data = {
          email: props.school.email,
          index: data.tableData.id
        };
        axios
          .post("/api/school/delete_grade", post_data)
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
        handleRefresh();
      }
    });
  };

  const inputLabel = React.useRef(null);

  const [gradeData, setGradeData] = React.useState({
    grade: "",
    description: "",
    max_student: "",
    age: "",
    start_time: "",
    end_time: ""
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [classes, setClasses] = React.useState([]);

  const handleStartTime = date => {
    setGradeData(oldValues => ({
      ...oldValues,
      start_time: date
    }));
  };

  const handleEndTime = date => {
    setGradeData(oldValues => ({
      ...oldValues,
      end_time: date
    }));
  };

  const handleGradeChange = event => {
    setGradeData(oldValues => ({
      ...oldValues,
      grade: event.target.value
    }));
  };

  const handleDescriptionChange = event => {
    setGradeData(oldValues => ({
      ...oldValues,
      description: event.target.value
    }));
  };

  const handleMaxStudentChange = event => {
    setGradeData(oldValues => ({
      ...oldValues,
      max_student: event.target.value
    }));
  };

  const handleAgeChange = event => {
    setGradeData(oldValues => ({
      ...oldValues,
      age: event.target.value
    }));
  };

  const [tableID, setTableID] = React.useState(null);

  const handleOpen = data => {
    setOpen(true);
    setTableID(data.tableData.id);
    setGradeData({
      grade: data.grade,
      description: data.description,
      max_student: data.max_student,
      age: data.age,
      start_time: data.start_time,
      end_time: data.end_time
    });
    if (props.standard === "primary_school") {
      setClasses(["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"]);
    }
  };

  const handleUpdate = () => {
    var post_data = {
      email: props.school.email,
      index: tableID,
      grade: gradeData.grade,
      description: gradeData.description,
      max_student: gradeData.max_student,
      age: gradeData.age,
      start_time: gradeData.start_time,
      end_time: gradeData.end_time
    };
    axios
      .post("/api/school/update_grade", post_data)
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
  };

  return (
    <div>
      <MaterialTable
        title="List Grades"
        columns={table.columns}
        data={table.data}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh",
            isFreeAction: true,
            onClick: () => {
              handleRefresh();
            }
          },
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => {
              handleOpen(rowData);
            }
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              handleDelete(rowData);
            }
          }
        ]}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtil}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="edit_grade">
          <DialogTitle id="edit_grade">Edit Grade</DialogTitle>
          <DialogContent>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel ref={inputLabel} htmlFor="create_grade">
                Grade
              </InputLabel>
              <Select
                value={gradeData.grade}
                onChange={handleGradeChange}
                input={<OutlinedInput name="create_grade" id="create_grade" />}
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
              value={gradeData.description}
              onChange={handleDescriptionChange}
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
              value={gradeData.max_student}
              onChange={handleMaxStudentChange}
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
              value={gradeData.age}
              onChange={handleAgeChange}
            />
            <KeyboardTimePicker
              required
              margin="normal"
              id="create_grade_start_time"
              label="Start Time"
              value={gradeData.start_time}
              onChange={handleStartTime}
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
            <br />
            <KeyboardTimePicker
              required
              margin="normal"
              id="create_grade_end_time"
              label="End Time"
              value={gradeData.end_time}
              onChange={handleEndTime}
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default ListGrades;
