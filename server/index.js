const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const property_route = require("./routes/property_route.js");
const profile_route = require("./routes/profile_route.js");
const escrow_route = require("./routes/escrow_route.js");
const nft_route = require("./routes/nft_route.js");
const multer = require("multer");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

app.post("/profile/upload", upload.single("file"), (req, res) => {
  const { pass, account_id } = req.body;
  //console.log(req);

  //console.log(req.file);
  console.log(req.body);
  //console.log(req.);
  //console.log(req.pass);

  console.log("Pass:", pass);
  console.log("Account ID:", account_id);

  // Here, you can access the uploaded file using req.file
  // Process the file and parameters as needed

  res.status(200).send("File uploaded");
});

//app.use("/user", user);

app.use("/profile", profile_route);

app.use("/property", property_route);

app.use("/nft", nft_route);

app.use("/escrow", escrow_route);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
