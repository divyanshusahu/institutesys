import React from "react";
import isEmpty from "is-empty";
import axios from "axios";
import Swal from "sweetalert2";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  }
}));

function UpdateDetails(props) {
  const classes = useStyles();

  const listData = React.useCallback(() => {
    var i = props.institute.email;
    axios.get("/api/institutes/details?owner_email=" + i).then(res => {
      document.getElementById("create_institute_name").value =
        res.data.institute.name;
      document.getElementById("create_institute_phone_number").value =
        res.data.institute.phone_number;
      document.getElementById("create_institute_registration_number").value =
        res.data.institute.registration_number;
      document.getElementById("create_institute_owner_email").value =
        res.data.institute.owner_email;
      document.getElementById("create_institute_funding_body").value =
        res.data.institute.funding_body;
    });
  }, [props.institute]);

  React.useEffect(() => {
    listData();
  }, [listData]);

  const handleSubmit = () => {
    const post_data = {
      email: props.institute.email,
      name: document.getElementById("create_institute_name").value,
      phone_number: document.getElementById("create_institute_phone_number")
        .value,
      funding_body: document.getElementById("create_institute_funding_body")
        .value
    };
    axios.post("/api/institutes/update", post_data).then(res => {
      Swal.fire({
        type: "success",
        text: res.data.message
      });
    });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title="Update Details" />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            id="create_institute_name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <FormHelperText error>
            {!isEmpty(props.errors) ? props.errors.create_institute_name : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_phone_number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_phone_number
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_registration_number"
            type="text"
            fullWidth
            variant="outlined"
            disabled
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_registration_number
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_owner_email"
            type="text"
            fullWidth
            variant="outlined"
            disabled
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_owner_email
              : null}
          </FormHelperText>
          <TextField
            margin="dense"
            id="create_institute_funding_body"
            type="text"
            fullWidth
            variant="outlined"
          />
          <FormHelperText error>
            {!isEmpty(props.errors)
              ? props.errors.create_institute_funding_body
              : null}
          </FormHelperText>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default UpdateDetails;
