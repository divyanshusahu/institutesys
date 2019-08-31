import React from "react";

import Typography from "@material-ui/core/Typography";

function DefaultDashboard(props) {
  return (
    <Typography variant="h2" component="p">
      Welcome, {props.institute.name}
    </Typography>
  );
}

export default DefaultDashboard;
