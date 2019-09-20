import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function AddTeacherTimeSlot(props) {
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

  const [table, setTable] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/add_weekly_holidays?email=" + props.school.email)
      .then(res => {
        var columns = [
          {
            title: "Slot",
            field: "slot",
            editable: "never"
          },
          {
            title: "Period",
            field: "period",
            type: "numeric",
            editable: "never"
          }
        ];
        var fields = Object.keys(res.data.holidays);
        for (let i = 0; i < fields.length; i++) {
          if (!res.data.holidays[fields[i]]) {
            columns.push({
              title: fields[i],
              field: fields[i],
              type: "boolean"
            });
          }
        }
        setTable(oldValues => ({
          ...oldValues,
          columns: columns
        }));
      });
  }, [props.school.email]);

  React.useEffect(() => {
    axios
      .get("/api/school/list_slots?email=" + props.school.email)
      .then(res => {
        var temp = res.data.slots.map(s => {
          var start_time = new Date(s.start_time);
          var start_time_display =
            ("0" + start_time.getHours()).slice(-2) +
            ":" +
            ("0" + start_time.getMinutes()).slice(-2);
          var end_time = new Date(s.end_time);
          var end_time_display =
            ("0" + end_time.getHours()).slice(-2) +
            ":" +
            ("0" + end_time.getMinutes()).slice(-2);
          return {
            slot: start_time_display + " to " + end_time_display,
            period: s.period,
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false
          };
        });
        setTable(oldValues => ({
          ...oldValues,
          data: temp
        }));
      });
  }, [props.school.email]);

  const handleTeacherSlotUpdate = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Card>
        <CardHeader title="Add Time Slots" />
        <CardContent>
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
        </CardContent>
      </Card>
      <div style={{ marginTop: "2rem" }}>
        <MaterialTable
          title="Select Available Slots"
          columns={table.columns}
          data={table.data}
          options={{
            actionsColumnIndex: -1
          }}
          editable={{
            onRowUpdate: newData => {
              return new Promise(resolve => {
                setTimeout(() => {
                  handleTeacherSlotUpdate(newData);
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

export default AddTeacherTimeSlot;
