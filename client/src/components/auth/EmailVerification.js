import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function EmailVerification(props) {
  React.useEffect(() => {
    var timerInterval;
    let token = window.location.search.substring(1).split("=")[1];
    axios.get("/api/auth/confirmation?token=" + token).then(res => {
      Swal.fire({
        type: res.data.success ? "success" : "error",
        text: res.data.message,
        timer: 2000,
        onBeforeOpen: () => {},
        onClose: () => {
          clearInterval(timerInterval);
        }
      }).then(result => {
        if (result.dismiss) {
          props.history.push("login");
        }
      });
    });
  }, [props.history]);

  return <div></div>;
}

export default EmailVerification;
