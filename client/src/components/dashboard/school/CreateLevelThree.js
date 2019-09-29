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

function CreateLevelThree(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [level2, setLevel2] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_level_two?email=" + props.school.email)
      .then(res => {
        setLevel2(res.data.level_two);
      });
  }, [props.school.email]);

  const [selectedLevel, setSelectedLevel] = React.useState("");
  const handleLevelChange = event => {
    setSelectedLevel(event.target.value);
  };
  
  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      level2: selectedLevel,
      name: document.getElementById("create_level_3_name").value,
      description: document.getElementById("create_level_3_description").value
    };
    axios.post("/api/school/create_level_three", post_data).then(res => {
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
      .get("/api/school/list_level_three?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Level 2",
            field: "level_two"
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setData({
          columns: columns,
          data: res.data.level_three
        });
      });
  }, [props.school.email]);

  React.useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <Card>
        <CardHeader title="Level 3" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel ref={inputLabel} htmlFor="level_2">
                Category 2
              </InputLabel>
              <Select
                value={selectedLevel}
                onChange={handleLevelChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="level_2"
                    id="level_2"
                  />
                }
              >
                {level2.map(c => (
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
              name="create_level_3_name"
              id="create_level_3_name"
              label="Name"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              margin="dense"
              name="create_level_3_description"
              id="create_level_3_description"
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
        title="Level 3"
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

export default CreateLevelThree;
