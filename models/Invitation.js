const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 86400
  }
});

module.exports = Invitation = mongoose.model("invitations", InvitationSchema);
