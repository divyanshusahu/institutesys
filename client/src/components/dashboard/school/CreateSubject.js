import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

function CreateSubject(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [classes, setClasses] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        var classArray = res.data.grades.map(c => c.grade);
        setClasses(classArray);
      });
  }, [setClasses, props.school]);

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      subject_name: document.getElementById("create_subject_name").value,
      subject_description: document.getElementById("create_subject_description")
        .value,
      grade: selectedGrade
    };
    axios.post("/api/school/create_subject", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Create Subject" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <TextField
              required
              fullWidth
              name="create_subject_name"
              id="create_subject_name"
              variant="outlined"
              label="Subject Name"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              name="create_subject_description"
              id="create_subject_description"
              variant="outlined"
              label="Subject Description"
              margin="normal"
            />
            <FormControl
              required
              variant="outlined"
              fullWidth
              style={{ marginTop: "1rem" }}
            >
              <InputLabel ref={inputLabel} htmlFor="create_grade">
                Grade
              </InputLabel>
              <Select
                value={selectedGrade}
                onChange={handleGradeChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="create_grade"
                    id="create_grade"
                  />
                }
              >
                {classes.map(c => (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
    </div>
  );
}

export default CreateSubject;
