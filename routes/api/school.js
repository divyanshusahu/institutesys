const express = require("express");
const router = express.Router();

const Branch = require("../../models/Branch");

router.get("/current_school", (req, res) => {
  Branch.findOne({ email: req.query.branch_email }).then(branch => {
    if (branch) {
      var send_data = {
        institute_name: branch.institute_name,
        address: branch.address,
        standard: branch.standard
      };
      return res.status(200).json({ success: true, branch: send_data });
    }
    return res.status(400).json({ success: false });
  });
});

module.exports = router;
