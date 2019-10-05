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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function ListAcademicYears(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_academic_years?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Year Name",
            field: "year_name"
          },
          {
            title: "Start Date",
            field: "start_date",
            type: "date"
          },
          {
            title: "End Date",
            field: "end_date",
            type: "date"
          },
          {
            title: "Current Year",
            field: "is_current_year",
            type: "boolean"
          }
        ];
        let temp_data = res.data.years.map(y => {
          var result = new Date(y["start_date"]);
          result.setDate(result.getDate() + 365);
          y["end_date"] = result;

          y["start_date"] = new Date(y["start_date"]);
          return y;
        });
        setData({
          columns: columns,
          data: temp_data
        });
      });
  }, [props.school, setData]);

  const handleRefresh = () => {
    axios
      .get("/api/school/list_academic_years?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Year Name",
            field: "year_name"
          },
          {
            title: "Start Date",
            field: "start_date",
            type: "date"
          },
          {
            title: "Current Year",
            field: "is_current_year",
            type: "boolean"
          }
        ];
        setData({
          columns: columns,
          data: res.data.years
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
          start_date: data.start_date
        };
        axios
          .post("/api/school/delete_academic_year", post_data)
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

  const [date, handleDate] = React.useState(new Date());
  const handleDateChange = date => {
    handleDate(date);
  };

  const [isCurrentYear, setCurrentYear] = React.useState(true);
  const handleYear = event => {
    setCurrentYear(event.target.checked);
  };

  const [tableID, setTableID] = React.useState(null);
  const [yearName, setYearName] = React.useState("");

  const handleYearNameChange = event => {
    setYearName(event.target.value);
  };

  const handleOpen = data => {
    setOpen(true);
    handleDate(data.start_date);
    setCurrentYear(data.is_current_year);
    setTableID(data.tableData.id);
    setYearName(data.year_name);
  };

  const handleUpdate = () => {
    var post_data = {
      email: props.school.email,
      year_name: yearName,
      index: tableID,
      current_year: isCurrentYear,
      start_date: date
    };
    axios
      .post("/api/school/update_academic_year", post_data)
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
  };

  return (
    <div>
      <MaterialTable
        title="List of Academic Years"
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
          aria-labelledby="edit_academic_year"
        >
          <DialogTitle id="edit_academic_year">Edit Academic Year</DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_academic_year_name"
              id="create_academic_year_name"
              label="Year Name"
              variant="outlined"
              value={yearName}
              onChange={handleYearNameChange}
            />
            <KeyboardDatePicker
              margin="normal"
              required
              id="date-picker-dialog"
              label="Start Date"
              format="dd/MM/yyyy"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{ "aria-label": "change date" }}
            />
            <br />
            <FormControlLabel
              control={
                <Switch
                  checked={isCurrentYear}
                  value={isCurrentYear}
                  onChange={handleYear}
                  color="primary"
                  id="isCurrentYear"
                  name="isCurrentYear"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Is Current Year"
              labelPlacement="end"
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

export default ListAcademicYears;
