import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListDivisions(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_divisions?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Grade",
            field: "grade"
          },
          {
            title: "Name",
            field: "name"
          }
        ];
        setData({
          columns: columns,
          data: res.data.divisions
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List of Divisions"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListDivisions;
