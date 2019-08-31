import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import isEmpty from "is-empty";

function ListBranches(props) {
  const [tableData, setTableData] = React.useState({
    title: "title",
    columns: [],
    data: []
  });

  React.useEffect(() => {
    try {
      const getURL =
        "/api/branches/list?institute_name=" + props.institute.name;
      axios.get(getURL).then(res => {
        setTableData({
          title: res.data.name,
          data: res.data.item
        });
      });
    } catch {
      // this can be empty
    }
  }, [props]);
  //console.log(tableData);
  React.useEffect(() => {
    try {
      if (!isEmpty(tableData.data)) {
        var fields = Object.keys(tableData.data[0]);
        var index = fields.indexOf("tableData");
        fields.splice(index, 1);
        var columns = fields.map(c => {
          if (c === "name" || c === "email") {
            return {
              title: c.replace(/_/g, " ").toUpperCase(),
              field: c,
              editable: "never"
            };
          }
          return {
            title: c.replace(/_/g, " ").toUpperCase(),
            field: c
          };
        });
        setTableData(oldValues => ({
          ...oldValues,
          columns: columns
        }));
      }
    } catch {
      // this can be empty
    }
  }, [tableData.data]);
  return (
    <MaterialTable
      title={tableData.title}
      columns={tableData.columns}
      data={tableData.data}
    />
  );
}

export default ListBranches;
