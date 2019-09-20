import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function AddTeacherSkill(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [teachers, setTeachers] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_teachers?email=" + props.school.email)
      .then(res => {
        var temp = res.data.teachers.map(t => t.name);
        setTeachers(temp);
      });
  }, [props.school.email, setTeachers]);

  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const handleTeacherChange = event => {
    setSelectedTeacher(event.target.value);
  };

  const [grades, setGrades] = React.useState([]);
  const [divisions, setDivisions] = React.useState([]);
  const [subjects, setSubject] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        var temp = res.data.grades.map(g => g.grade);
        setGrades(temp);
      });
  }, [props.school.email, setGrades]);

  const listDivision = grade => {
    axios
      .get("/api/school/list_divisions?email=" + props.school.email)
      .then(res => {
        var temp = [];
        for (let i = 0; i < res.data.divisions.length; i++) {
          if (res.data.divisions[i].grade === grade) {
            temp.push(res.data.divisions[i].name);
          }
        }
        setDivisions(temp);
      });
  };

  const ListSubject = grade => {
    axios
      .get("/api/school/list_subjects?email=" + props.school.email)
      .then(res => {
        var temp = [];
        for (let i = 0; i < res.data.subjects.length; i++) {
          if (res.data.subjects[i].grade === grade) {
            temp.push(res.data.subjects[i].subject_name);
          }
          setSubject(temp);
        }
      });
  };

  const [selectedGrade, setSelectedGrade] = React.useState("");
  const handleGradeChange = event => {
    setSelectedGrade(event.target.value);
    listDivision(event.target.value);
    ListSubject(event.target.value);
  };

  const [selectedDivision, setSelectedDivision] = React.useState("");
  const handleDivisionChange = event => {
    setSelectedDivision(event.target.value);
  };

  const [selectedSubject, setSelectedSubject] = React.useState("");
  const handleSubjectChange = event => {
    setSelectedSubject(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Card>
        <CardHeader title="Add Skills" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <FormControl required variant="outlined" fullWidth margin="normal">
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
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
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
                {grades.map(c => (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <InputLabel ref={inputLabel} htmlFor="select_division">
                Select Division
              </InputLabel>
              <Select
                value={selectedDivision}
                onChange={handleDivisionChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="select_division"
                    id="select_division"
                    disabled={selectedGrade ? false : true}
                  />
                }
              >
                {divisions.map(c => (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required variant="outlined" fullWidth margin="normal">
              <InputLabel ref={inputLabel} htmlFor="select_subject">
                Select Subject
              </InputLabel>
              <Select
                value={selectedSubject}
                onChange={handleSubjectChange}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="select_subject"
                    id="select_subject"
                    disabled={selectedGrade ? false : true}
                  />
                }
              >
                {subjects.map(c => (
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
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTeacherSkill;
