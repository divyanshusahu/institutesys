const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mongoURI: process.env.MLAB_URI,
  secretOrKey: process.env.SECRET
};
