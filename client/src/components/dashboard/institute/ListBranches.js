import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import isEmpty from "is-empty";
import Swal from "sweetalert2";

function ListBranches(props) {
  const [tableData, setTableData] = React.useState({
    title: "title",
    columns: [],
    data: []
  });

  const listData = React.useCallback(() => {
    const getURL = "/api/branches/list?institute_name=" + props.institute.name;
    axios.get(getURL).then(res => {
      setTableData({
        title: res.data.name,
        data: res.data.item
      });
    });
  }, [props.institute.name]);

  React.useEffect(() => {
    try {
      listData();
    } catch {
      // this can be empty
    }
  }, [listData]);
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

  const handleDelete = email => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios.post("/api/branches/delete", { email: email }).then(res => {
          Swal.fire({
            type: "success",
            text: res.data.message
          });
          listData();
        });
      }
    });
  };

  const handleUpdate = data => {
    axios.post("/api/branches/update", data).then(res => {
      Swal.fire({
        type: "success",
        text: res.data.message
      });
      listData();
    });
  };

  return (
    <MaterialTable
      title={tableData.title}
      columns={tableData.columns}
      data={tableData.data}
      actions={[
        {
          icon: "refresh",
          tooltip: "Refresh",
          isFreeAction: true,
          onClick: () => {
            listData();
          }
        },
        {
          icon: "delete",
          tooltip: "Delete",
          onClick: (event, rowData) => {
            handleDelete(rowData.email);
          }
        }
      ]}
      options={{
        actionsColumnIndex: -1
      }}
      editable={{
        onRowUpdate: newData => {
          return new Promise(resolve => {
            setTimeout(() => {
              handleUpdate(newData);
              resolve();
            }, 1000);
          });
        }
      }}
    />
  );
}

export default ListBranches;
