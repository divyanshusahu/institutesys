import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import MaterialTable from "material-table";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Handbook(props) {
  const [table, setTable] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/handbooks/get_handbooks?email=" + props.school.email)
      .then(res => {
        let columns = [
          {
            title: "Name",
            field: "name",
            render: rowData => (
              <Link
                to={`/api/handbooks/download/${rowData.file}`}
                target="_blank"
              >
                {rowData.name}
              </Link>
            )
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setTable({
          columns: columns,
          data: res.data.handbooks
        });
      });
  }, [props.school.email]);

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      name: document.getElementById("add_handbook_name").value,
      description: document.getElementById("add_handbook_description").value,
      file: document.getElementById("add_handbook_file").files[0]
    };
    var data = new FormData();
    data.append("file", post_data.file);
    axios
      .post("/api/handbooks/add_handbook", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${post_data._boundary}`
        },
        params: {
          name: post_data.name,
          description: post_data.description,
          school: props.school.email
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
      .get("/api/handbooks/get_handbooks?email=" + props.school.email)
      .then(res => {
        let columns = [
          {
            title: "Name",
            field: "name",
            render: rowData => (
              <Link
                to={`/api/handbooks/download/${rowData.file}`}
                target="_blank"
              >
                {rowData.name}
              </Link>
            )
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setTable({
          columns: columns,
          data: res.data.handbooks
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
          handbooks_id: data._id
        };
        axios
          .post("/api/handbooks/delete", post_data)
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
      description: data.description,
      _id: data._id
    };
    axios.post("/api/handbooks/update", post_data).then(res => {
      Swal.fire({
        type: "success",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Add Handbook" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <TextField
              required
              fullWidth
              variant="outlined"
              name="add_handbook_name"
              id="add_handbook_name"
              label="Name"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              name="add_handbook_description"
              id="add_handbook_description"
              label="Description"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              type="file"
              variant="outlined"
              name="add_handbook_file"
              id="add_handbook_file"
              margin="normal"
              inputProps={{ accept: "application/pdf" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
      <div style={{ marginTop: "1rem" }}>
        <MaterialTable
          title="Notices"
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
    </div>
  );
}

export default Handbook;
