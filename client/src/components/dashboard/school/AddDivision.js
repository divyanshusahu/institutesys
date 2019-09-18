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

function AddDivision(props) {
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

  /*const [teachers, setTeachers] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_teachers?email=" + props.school.email)
      .then(res => {
        var temp = res.data.teachers.map(c => c.name);
        setTeachers(temp);
      });
  }, [setTeachers, props.school.email]);

  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const handleTeacherChange = event => {
    setSelectedTeacher(event.target.value);
  };*/

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      name: document.getElementById("create_division_name").value,
      grade: selectedGrade
    };
    axios.post("/api/school/create_division", post_data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader title="Add Division" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <FormControl required variant="outlined" fullWidth>
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
              name="create_division_name"
              id="create_division_name"
              label="Division Name"
              variant="outlined"
              margin="normal"
            />
            {/*<FormControl required variant="outlined" fullWidth>
              <InputLabel ref={inputLabel} htmlFor="select_teacher">
                Select Teacher
              </InputLabel>
              <Select
                value={selectedTeacher}
                onChange={handleTeacherChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="select_teacher"
                    id="select_teacher"
                  />
                }
              >
                {teachers.map(c => (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
                </FormControl>*/}
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

export default AddDivision;
