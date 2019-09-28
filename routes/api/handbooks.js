const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const Handbook = require("../../models/Handbook");

const storage = new GridFsStorage({
  url: require("../../config/keys").mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          display_name: req.query.name,
          description: req.query.description,
          school: req.query.school,
          bucketName: "handbooks"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.post("/add_handbook", upload.single("file"), (req, res) => {
  const newHandbook = new Handbook({
    name: req.query.name,
    description: req.query.description,
    school: req.query.school,
    file: res.req.file.id
  });
  newHandbook.save();
  return res.status(200).json({ success: true, message: "Uploaded" });
});

module.exports = router;
