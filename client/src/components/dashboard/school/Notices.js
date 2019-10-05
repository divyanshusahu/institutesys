import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MaterialTable from "material-table";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Notices(props) {
  const [startDate, handleStartDate] = React.useState(new Date());
  const handleStartDateChange = date => {
    handleStartDate(date);
  };

  const [endDate, handleEndDate] = React.useState(new Date());
  const handleEndDateChange = date => {
    handleEndDate(date);
  };

  const [table, setTable] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/notices/get_notices?email=" + props.school.email)
      .then(res => {
        let columns = [
          {
            title: "Name",
            field: "name",
            render: rowData => (
              <Link
                to={`/api/notices/download/${rowData.file}`}
                target="_blank"
              >
                {rowData.name}
              </Link>
            )
          },
          {
            title: "Description",
            field: "text"
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
          }
        ];
        var temp_data = res.data.notices.map(n => {
          n.start_date = new Date(n.start_date);
          n.end_date = new Date(n.end_date);
          return n;
        });
        setTable({
          columns: columns,
          data: temp_data
        });
      });
  }, [props.school.email]);

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      name: document.getElementById("add_notice_name").value,
      text: document.getElementById("add_notice_text").value,
      school: props.school.email,
      start_date: startDate,
      end_date: endDate,
      file: document.getElementById("add_notice_file").files[0]
    };
    var data = new FormData();
    data.append("file", post_data.file);

    axios
      .post("/api/notices/add_notice", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${post_data._boundary}`
        },
        params: {
          name: post_data.name,
          text: post_data.text,
          school: post_data.school,
          start_date: post_data.start_date,
          end_date: post_data.end_date
        }
      })
      .then(res => {
        Swal.fire({
          type: "success",
          text: res.data.message
        });
      });
  };

  const handleRefresh = () => {
    axios
      .get("/api/notices/get_notices?email=" + props.school.email)
      .then(res => {
        let columns = [
          {
            title: "Name",
            field: "name",
            render: rowData => (
              <Link
                to={`/api/notices/download/${rowData.file}`}
                target="_blank"
              >
                {rowData.name}
              </Link>
            )
          },
          {
            title: "Description",
            field: "text"
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
          }
        ];
        var temp_data = res.data.notices.map(n => {
          n.start_date = new Date(n.start_date);
          n.end_date = new Date(n.end_date);
          return n;
        });
        setTable({
          columns: columns,
          data: temp_data
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
          notice_id: data._id
        };
        axios
          .post("/api/notices/delete", post_data)
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

  const handleUpdate = data => {
    var post_data = {
      name: data.name,
      text: data.text,
      start_date: data.start_date,
      end_date: data.end_date,
      _id: data._id
    };
    axios.post("/api/notices/update", post_data).then(res => {
      Swal.fire({
        type: "success",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <MuiPickersUtilsProvider utils={DateFnsUtil}>
          <CardHeader title="Add Notices" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <TextField
                required
                fullWidth
                variant="outlined"
                name="add_notice_name"
                id="add_notice_name"
                label="Name"
                margin="dense"
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                name="add_notice_text"
                id="add_notice_text"
                label="Text"
                margin="dense"
              />
              <KeyboardDatePicker
                margin="normal"
                required
                id="start_data"
                label="Start Date"
                format="dd/MM/yyyy"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{ "aria-label": "start_date" }}
              />
              <br />
              <KeyboardDatePicker
                margin="normal"
                required
                id="end_data"
                label="End Date"
                format="dd/MM/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{ "aria-label": "end_date" }}
              />
              <br />
              <TextField
                required
                fullWidth
                type="file"
                variant="outlined"
                name="add_notice_file"
                id="add_notice_file"
                margin="dense"
                inputProps={{ accept: "image/*" }}
              />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
          </CardContent>
        </MuiPickersUtilsProvider>
      </Card>
      <MaterialTable
        title="Notices List"
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
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              handleDelete(rowData);
            }
          }
        ]}
        editable={{
          onRowUpdate: newData => {
            return new Promise(resolve => {
              setTimeout(() => {
                handleUpdate(newData);
                resolve();
              }, 1000);
            });
          }
        }}
      />
    </div>
  );
}

export default Notices;
