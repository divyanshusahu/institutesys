import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListAcademicYears(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_academic_years?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Year Name",
            field: "year_name"
          },
          {
            title: "Start Date",
            field: "start_date",
            type: "date"
          },
          {
            title: "Current Year",
            field: "is_current_year",
            type: "boolean"
          }
        ];
        setData({
          columns: columns,
          data: res.data.years
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List of Academic Years"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListAcademicYears;
