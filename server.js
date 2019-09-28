const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const auth = require("./routes/api/auth");
const institutes = require("./routes/api/institutes");
const features = require("./routes/api/features");
const subscriptions = require("./routes/api/subscriptions");
const tax = require("./routes/api/tax");
const standards = require("./routes/api/standards");
const categories = require("./routes/api/categories");
const grievance_categories = require("./routes/api/grievance_categories");
const payment = require("./routes/api/payment");
const branches = require("./routes/api/branches");
const school = require("./routes/api/school");
const handbooks = require("./routes/api/handbooks");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
    useNewUrlParser: true
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo Database"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/auth", auth);
app.use("/api/institutes", institutes);
app.use("/api/features", features);
app.use("/api/subscriptions", subscriptions);
app.use("/api/tax", tax);
app.use("/api/standards", standards);
app.use("/api/categories", categories);
app.use("/api/grievance_categories", grievance_categories);
app.use("/api/payment", payment);
app.use("/api/branches", branches);
app.use("/api/school", school);
app.use("/api/handbooks", handbooks);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
