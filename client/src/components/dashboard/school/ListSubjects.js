import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Swal from "sweetalert2";

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
            field: "grade",
            editable: "never"
          }
        ];
        setData({
          columns: columns,
          data: res.data.subjects
        });
      });
  }, [props.school, setData]);

  const handleRefresh = () => {
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
            field: "grade",
            editable: "never"
          }
        ];
        setData({
          columns: columns,
          data: res.data.subjects
        });
      });
  };

  const handleDelete = data => {
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
        var post_data = {
          email: props.school.email,
          index: data.tableData.id
        };
        axios
          .post("/api/school/delete_subject", post_data)
          .then(res => {
            Swal.fire({
              type: "success",
              text: res.data.message
            });
          })
          .catch(res => {
            Swal.fire({
              type: "error",
              text: res.data.message
            });
          });
        handleRefresh();
      }
    });
  };

  const handleUpdate = data => {
    console.log(data);
  };

  return (
    <div>
      <MaterialTable
        title="List Subjects"
        columns={table.columns}
        data={table.data}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh",
            isFreeAction: true,
            onClick: () => {
              handleRefresh();
            }
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              handleDelete(rowData);
            }
          }
        ]}
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
    </div>
  );
}

export default ListSubjects;
