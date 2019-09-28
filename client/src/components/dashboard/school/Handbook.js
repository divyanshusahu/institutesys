import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Handbook(props) {
  const [handbooks, setHandbooks] = React.useState([]);

  const getHandbooks = React.useCallback(email => {
    axios.get("/api/handbooks/get_handbooks?email=" + email).then(res => {
      setHandbooks(res.data.handbooks);
    });
  }, []);

  React.useEffect(() => {
    getHandbooks(props.school.email);
  }, [props.school.email, getHandbooks]);

  const handleFormSubmit = event => {
    event.preventDefault();

    var post_data = {
      name: document.getElementById("add_handbook_name").value,
      description: document.getElementById("add_handbook_description").value,
      file: document.getElementById("add_handbook_file").files[0]
    };
    var data = new FormData();
    data.append("file", post_data.file);
    axios
      .post("/api/handbooks/add_handbook", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${post_data._boundary}`
        },
        params: {
          name: post_data.name,
          description: post_data.description,
          school: props.school.email
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
        <CardHeader title="Add Handbook" />
        <CardContent>
          <form noValidate onSubmit={handleFormSubmit}>
            <TextField
              required
              fullWidth
              variant="outlined"
              name="add_handbook_name"
              id="add_handbook_name"
              label="Name"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              name="add_handbook_description"
              id="add_handbook_description"
              label="Description"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              type="file"
              variant="outlined"
              name="add_handbook_file"
              id="add_handbook_file"
              margin="normal"
              inputProps={{ accept: "application/pdf" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="List" />
        <CardContent>
          {handbooks.map(h => (
            <p key={h._id}>
              <Link to={`/api/handbooks/download/${h.file}`} target="_blank">
                {h.name}
              </Link>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Handbook;
