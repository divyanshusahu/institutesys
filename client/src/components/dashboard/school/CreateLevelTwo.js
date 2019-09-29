import React from "react";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import axios from "axios";

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

function CreateLevelTwo(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [level1, setLevel1] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_level_one?email=" + props.school.email)
      .then(res => {
        setLevel1(res.data.level_one);
      });
  }, []);

  const [selectedLevel, setSelectedLevel] = React.useState("");
  const handleLevelChange = event => {
    setSelectedLevel(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      level1: selectedLevel,
      name: document.getElementById("create_level_2_name").value,
      description: document.getElementById("create_level_2_description").value
    };
    axios.post("/api/school/create_level_two", post_data).then(res => {
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
      .get("/api/school/list_level_two?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Level 1",
            field: "level_one"
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setData({
          columns: columns,
          data: res.data.level_two
        });
      });
  }, [props.school.email]);

  React.useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <Card>
        <CardHeader title="Level 2" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel ref={inputLabel} htmlFor="level_1">
                Category 1
              </InputLabel>
              <Select
                value={selectedLevel}
                onChange={handleLevelChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="level_1"
                    id="level_1"
                  />
                }
              >
                {level1.map(c => (
                  <MenuItem value={c.name} key={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_level_2_name"
              id="create_level_2_name"
              label="Name"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_level_2_description"
              id="create_level_2_description"
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
        title="Level 2"
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

export default CreateLevelTwo;
