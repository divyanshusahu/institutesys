import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListStudents(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_students?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Email",
            field: "email"
          },
          {
            title: "Grade",
            field: "grade"
          }
        ];
        setData({
          columns: columns,
          data: res.data.students
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List of Students"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListStudents;
