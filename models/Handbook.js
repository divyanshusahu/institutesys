const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Schema.Types.ObjectId;

const HandbookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  file: {
    type: ObjectID,
    required: true
  }
});

module.exports = Handbook = mongoose.model("handbooks", HandbookSchema);
