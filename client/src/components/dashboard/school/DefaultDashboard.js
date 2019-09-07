import React from "react";

import Typography from "@material-ui/core/Typography";

function DefaultDashboard(props) {
  return (
    <div>
      <Typography variant="h2" component="p">Welcome, {props.school.name}</Typography>
    </div>
  );
}

export default DefaultDashboard;
