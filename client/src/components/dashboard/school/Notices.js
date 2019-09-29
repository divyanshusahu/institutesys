import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "date-fns";
import DateFnsUtil from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Notices(props) {
  const [startDate, handleStartDate] = React.useState(new Date());
  const handleStartDateChange = date => {
    handleStartDate(date);
  };

  const [endDate, handleEndDate] = React.useState(new Date());
  const handleEndDateChange = date => {
    handleEndDate(date);
  };

  const [notices, setNotices] = React.useState([]);

  const getNotices = React.useCallback(email => {
    axios.get("/api/notices/get_notices?email=" + email).then(res => {
      setNotices(res.data.notices);
    });
  }, []);

  React.useEffect(() => {
    getNotices(props.school.email);
  }, [props.school.email, getNotices]);

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      name: document.getElementById("add_notice_name").value,
      text: document.getElementById("add_notice_text").value,
      school: props.school.email,
      start_date: startDate,
      end_date: endDate,
      file: document.getElementById("add_notice_file").files[0]
    };
    var data = new FormData();
    data.append("file", post_data.file);

    axios
      .post("/api/notices/add_notice", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${post_data._boundary}`
        },
        params: {
          name: post_data.name,
          text: post_data.text,
          school: post_data.school,
          start_date: post_data.start_date,
          end_date: post_data.end_date
        }
      })
      .then(res => {
        Swal.fire({
          type: "success",
          text: res.data.message
        });
      });
  };

  return (
    <div>
      <Card>
        <MuiPickersUtilsProvider utils={DateFnsUtil}>
          <CardHeader title="Add Notices" />
          <CardContent>
            <form noValidate onSubmit={handleFormSubmit}>
              <TextField
                required
                fullWidth
                variant="outlined"
                name="add_notice_name"
                id="add_notice_name"
                label="Name"
                margin="dense"
              />
              <TextField
                required
                fullWidth
                variant="outlined"
                name="add_notice_text"
                id="add_notice_text"
                label="Text"
                margin="dense"
              />
              <KeyboardDatePicker
                margin="normal"
                required
                id="start_data"
                label="Start Date"
                format="dd/MM/yyyy"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{ "aria-label": "start_date" }}
              />
              <br />
              <KeyboardDatePicker
                margin="normal"
                required
                id="end_data"
                label="End Date"
                format="dd/MM/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{ "aria-label": "end_date" }}
              />
              <br />
              <TextField
                required
                fullWidth
                type="file"
                variant="outlined"
                name="add_notice_file"
                id="add_notice_file"
                margin="dense"
                inputProps={{ accept: "image/*" }}
              />
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </form>
          </CardContent>
        </MuiPickersUtilsProvider>
      </Card>
      <Card>
        <CardHeader title="List" />
        <CardContent>
          {notices.map(n => (
            <p key={n._id}>
              <Link to={`/api/notices/download/${n.file}`} target="_blank">
                {n.name}
              </Link>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Notices;
