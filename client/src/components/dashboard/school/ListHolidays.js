import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

function ListHolidays(props) {
  const [table, setData] = React.useState({
    columns: [],
    data: []
  });

  React.useEffect(() => {
    axios
      .get("/api/school/list_holidays?email=" + props.school.email)
      .then(res => {
        const columns = [
          {
            title: "Date",
            field: "date",
            type: "date"
          },
          {
            title: "Description",
            field: "description"
          },
          {
            title: "Year",
            field: "year"
          }
        ];
        var temp_data = res.data.holidays.map(h => {
          h.date = new Date(h.date);
          return h;
        });
        setData({
          columns: columns,
          data: temp_data
        });
      });
  }, [props.school, setData]);

  return (
    <div>
      <MaterialTable
        title="List Holidays"
        columns={table.columns}
        data={table.data}
      />
    </div>
  );
}

export default ListHolidays;
