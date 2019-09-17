import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListGrades(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_grades?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Grade",
            field: "grade"
          },
          {
            title: "Description",
            field: "description"
          },
          {
            title: "Max Student",
            field: "max_student"
          }
        ];
        setData({
          columns: columns,
          data: res.data.grades
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List Grades"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListGrades;
