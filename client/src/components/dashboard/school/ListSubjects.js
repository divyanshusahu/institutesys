import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListSubjects(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_subjects?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Subject",
            field: "subject_name"
          },
          {
            title: "Description",
            field: "subject_description"
          },
          {
            title: "Grade",
            field: "grade"
          }
        ];
        setData({
          columns: columns,
          data: res.data.subjects
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List Subjects"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListSubjects;
