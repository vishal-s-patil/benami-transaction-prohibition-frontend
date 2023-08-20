const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const property_route = require("./routes/property_route.js");
const profile_route = require("./routes/profile_route.js");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//app.use("/user", user);

app.use("/profile", profile_route);

app.use("/property", property_route);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});