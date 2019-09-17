import React from "react";
import Swal from "sweetalert2";
import MaterialTable from "material-table";
import axios from "axios";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function CreateSlot(props) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const [periods, setPeriods] = React.useState([]);
  React.useEffect(() => {
    let a = [];
    for (let i = 1; i <= 15; i++) {
      a.push(i);
    }
    setPeriods(a);
  }, [setPeriods]);

  const [selectedPeriod, setSelectedPeriod] = React.useState("");
  const handlePeriodChange = event => {
    setSelectedPeriod(event.target.value);
  };

  const [selectedPeriodType, setSelectedPeriodType] = React.useState("");
  const handlePeriodTypeChange = event => {
    setSelectedPeriodType(event.target.value);
  };

  const [startTime, setStartTime] = React.useState(new Date());
  const handleStartTime = date => {
    setStartTime(date);
  };

  const [endTime, setEndTime] = React.useState(new Date());
  const handleEndTime = date => {
    setEndTime(date);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      email: props.school.email,
      period: selectedPeriod,
      type: selectedPeriodType,
      start_time: startTime,
      end_time: endTime
    };
    axios.post("/api/school/create_slot", post_data).then(res => {
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
      .get("/api/school/list_slots?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Period",
            type: "numeric",
            field: "period"
          },
          {
            title: "Type",
            field: "type"
          },
          {
            title: "Start Time",
            field: "start_time",
            type: "time"
          },
          {
            title: "End Time",
            field: "end_time",
            type: "time"
          }
        ];
        setData({
          columns: columns,
          data: res.data.slots
        });
      });
  }, [props.school.email]);

  React.useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <div>
      <Card>
        <MuiPickersUtilsProvider utils={DateFnsUtil}>
          <CardHeader title="Create Slots" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <FormControl
                required
                variant="outlined"
                fullWidth
                margin="normal"
              >
                <InputLabel ref={inputLabel} htmlFor="create_period">
                  Select Period
                </InputLabel>
                <Select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_period"
                      id="create_period"
                    />
                  }
                >
                  {periods.map(c => (
                    <MenuItem value={c} key={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required variant="outlined" fullWidth>
                <InputLabel ref={inputLabel} htmlFor="create_period_type">
                  Select Period Type
                </InputLabel>
                <Select
                  value={selectedPeriodType}
                  onChange={handlePeriodTypeChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="create_period_type"
                      id="create_period_type"
                    />
                  }
                >
                  <MenuItem value="class">Class</MenuItem>
                  <MenuItem value="break">Break</MenuItem>
                </Select>
              </FormControl>
              <KeyboardTimePicker
                required
                margin="normal"
                id="create_period_start_time"
                label="Start Time"
                value={startTime}
                onChange={handleStartTime}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
              <br />
              <KeyboardTimePicker
                required
                margin="normal"
                id="create_period_end_time"
                label="End Time"
                value={endTime}
                onChange={handleEndTime}
                KeyboardButtonProps={{ "aria-label": "change time" }}
              />
              <br />
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
        </MuiPickersUtilsProvider>
      </Card>
      <MaterialTable
        title="Slots"
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

export default CreateSlot;
