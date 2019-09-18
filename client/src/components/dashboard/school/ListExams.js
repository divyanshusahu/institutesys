import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListExams(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_exams?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Grade",
            field: "grade"
          },
          {
            title: "Name",
            field: "name"
          },
          {
            title: "Description",
            field: "description"
          }
        ];
        setData({
          columns: columns,
          data: res.data.exams
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List of Exams"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListExams;
