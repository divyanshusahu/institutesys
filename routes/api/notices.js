const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const Notice = require("../../models/Notice");
const mongoURI = require("../../config/keys").mongoURI;

let gfs;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("notices");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "notices"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.post("/add_notice", upload.single("file"), (req, res) => {
  const newNotice = new Notice({
    name: req.query.name,
    text: req.query.text,
    school: req.query.school,
    start_date: req.query.start_date,
    end_date: req.query.end_date,
    file: res.req.file.id
  });
  newNotice.save();
  return res.status(200).json({ success: true, message: "Uploaded" });
});

router.get("/get_files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: err });
    }
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files found" });
    } else {
      return res.status(200).json({ success: true, files: files });
    }
  });
});

router.get("/get_notices", (req, res) => {
  Notice.find({ school: req.query.email }).then(notice => {
    if (notice) {
      return res.status(200).json({ success: true, notices: notice });
    } else {
      return res.status(400).json({ success: false });
    }
  });
});

router.get("/download/:id", (req, res) => {
  var ObjectId = mongoose.Types.ObjectId;
  var search_id = new ObjectId(req.params.id);
  gfs.files.findOne({ _id: search_id }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).send("Not Found");
    } else {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
});

module.exports = router;
