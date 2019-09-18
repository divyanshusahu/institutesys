import React from "react";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function CreateLevelOne(props) {
  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      name: document.getElementById("create_level_1_name").value,
      description: document.getElementById("create_level_1_description").value
    };
    axios.post("/api/school/create_level_one", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  const getTableData = React.useCallback(() => {
    axios
      .get("/api/school/list_level_one?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setData({
          columns: columns,
          data: res.data.level_one
        });
      });
  }, [props.school.email]);

  React.useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <Card>
        <CardHeader title="Level 1" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_level_1_name"
              id="create_level_1_name"
              label="Name"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_level_1_description"
              id="create_level_1_description"
              label="Description"
              variant="outlined"
            />
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
      <MaterialTable
        title="Level 1"
        columns={table.columns}
        data={table.data}
        style={{ marginTop: "2rem" }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh",
            isFreeAction: true,
            onClick: () => {
              getTableData();
            }
          }
        ]}
      />
    </div>
  );
}

export default CreateLevelOne;
