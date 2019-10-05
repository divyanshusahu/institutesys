import React from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

function DefaultDashboard(props) {

  const [table, setTable] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/notices/get_notices?email=" + props.school.email)
      .then(res => {
        let columns = [
          {
            title: "Name",
            field: "name",
            render: rowData => (
              <Link
                to={`/api/notices/download/${rowData.file}`}
                target="_blank"
              >
                {rowData.name}
              </Link>
            )
          },
          {
            title: "Description",
            field: "text"
          },
          {
            title: "Start Date",
            field: "start_date",
            type: "date"
          },
          {
            title: "End Date",
            field: "end_date",
            type: "date"
          }
        ];
        var temp_data = res.data.notices.map(n => {
          n.start_date = new Date(n.start_date);
          n.end_date = new Date(n.end_date);
          return n;
        });
        setTable({
          columns: columns,
          data: temp_data
        });
      });
  }, [props.school.email]);
  
  return (
    <div>
      <Typography variant="h2" component="p">
        Welcome, {props.school.name}
      </Typography>
      <MaterialTable
        title="Notices List"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default DefaultDashboard;
