import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
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

function ListStudents(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_students?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Grade",
            field: "grade"
          }
        ];
        setData({
          columns: columns,
          data: res.data.students
        });
      });
  }, [props.school, setData]);

  const handleRefresh = () => {
    axios
      .get("/api/school/list_students?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Grade",
            field: "grade"
          }
        ];
        setData({
          columns: columns,
          data: res.data.students
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
          email: data.email
        };
        axios
          .post("/api/school/delete_student", post_data)
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

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [editStudent, setEditStudent] = React.useState({});

  const handleEditChange = event => {
    setEditStudent(oldValues => ({
      ...oldValues,
      [event.target.id]: event.target.value
    }));
  };

  const handleDateChangeJD = date => {
    setEditStudent(oldValues => ({
      ...oldValues,
      joining_date: date
    }));
  };

  const handleDateChangeDOB = date => {
    setEditStudent(oldValues => ({
      ...oldValues,
      date_of_birth: date
    }));
  };

  const handleOpen = data => {
    setEditStudent(data);
    setOpen(true);
  };

  const handleUpdate = () => {};

  return (
    <div>
      <MaterialTable
        title="List of Students"
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="edit_student"
        >
          <DialogTitle id="edit_student">Edit Student</DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              variant="outlined"
              label="Student Name"
              margin="normal"
              value={editStudent.name}
              onChange={handleEditChange}
            />
            <TextField
              required
              fullWidth
              name="email"
              id="email"
              variant="outlined"
              label="Student Email"
              margin="normal"
              type="email"
              value={editStudent.email}
              onChange={handleEditChange}
            />
            <TextField
              required
              fullWidth
              name="admission_no"
              id="admission_no"
              variant="outlined"
              label="Admission Number"
              margin="normal"
              value={editStudent.admission_no}
              onChange={handleEditChange}
            />
            <TextField
              required
              fullWidth
              name="address"
              id="address"
              variant="outlined"
              label="Address"
              margin="normal"
              value={editStudent.address}
              onChange={handleEditChange}
            />
            <KeyboardDatePicker
              required
              margin="normal"
              id="joining_date"
              label="Joining Date"
              value={editStudent.joining_date}
              onChange={handleDateChangeJD}
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
            <br />
            <KeyboardDatePicker
              required
              margin="normal"
              id="date_of_birth"
              label="End Time"
              value={editStudent.date_of_birth}
              onChange={handleDateChangeDOB}
              KeyboardButtonProps={{ "aria-label": "change time" }}
            />
            <br />
            <TextField
              required
              fullWidth
              name="previous_class_performance"
              id="previous_class_performance"
              variant="outlined"
              label="Previous Class performance"
              margin="normal"
              type="number"
              value={editStudent.previous_class_performance}
              onChange={handleEditChange}
            />
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

export default ListStudents;
