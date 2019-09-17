import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListTeachers(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_teachers?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Email",
            field: "email"
          }
        ];
        setData({
          columns: columns,
          data: res.data.teachers
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List of Teachers"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListTeachers;
