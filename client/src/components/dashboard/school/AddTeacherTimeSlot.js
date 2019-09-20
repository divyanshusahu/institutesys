import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Swal from "sweetalert2";

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
        setTable({
          columns: columns,
          data: []
        });
      });
  }, [props.school.email]);

  const [slots, setSlots] = React.useState();
  React.useEffect(() => {
    axios
      .get("/api/school/list_slots?email=" + props.school.email)
      .then(res => {
        var temp = res.data.slots.map(s => ({
          period: s.period,
          start_time: s.start_time,
          end_time: s.end_time
        }));
        setSlots(temp);
      });
  }, [props.school.email]);

  const resetTeacherSlot = () => {
    var data = slots.map(s => {
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
    var newTable = table;
    newTable.data = data;
    setTable(newTable);
  };

  const [teachers, setTeachers] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/school/list_teachers?email=" + props.school.email)
      .then(res => {
        setTeachers(res.data.teachers);
      });
  }, [props.school.email, setTeachers]);

  const getTeacherTimeSlots = email => {
    axios
      .get("/api/school/list_teacher_available_slots?email=" + email)
      .then(res => {
        var oldData = table.data;
        for (let i = 0; i < res.data.data.length; i++) {
          let index = res.data.data[i].period - 1;
          oldData[index] = res.data.data[i];
        }
        setTable(oldValues => ({
          ...oldValues,
          data: oldData
        }));
      });
  };

  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const handleTeacherChange = event => {
    setSelectedTeacher(event.target.value);
    resetTeacherSlot();
    getTeacherTimeSlots(event.target.value);
  };

  const handleTeacherSlotUpdate = data => {
    data.teacher_email = selectedTeacher;
    axios.post("/api/school/add_time_slot", data).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message
      });
      getTeacherTimeSlots(selectedTeacher);
    });
  };

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
                <MenuItem value={c.email} key={c.email}>
                  {c.name}
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
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh",
              isFreeAction: true,
              onClick: () => {
                getTeacherTimeSlots(selectedTeacher);
              }
            }
          ]}
        />
      </div>
    </div>
  );
}

export default AddTeacherTimeSlot;
