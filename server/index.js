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

const upload1 = multer({ storage });

app.post("/profile/upload", upload1.single("file"), (req, res) => {
  const { pass, account_address } = req.body;
  //console.log(req);

  //console.log(req.file);
  console.log(req.body);
  //console.log(req.);
  //console.log(req.pass);

  console.log("Pass:", pass);
  console.log("Account ID:", account_address);

  // Here, you can access the uploaded file using req.file
  // Process the file and parameters as needed

  res.status(200).send("File uploaded");
});

app.post("/property/add_property", (req, res) => {
  var upload = multer({ storage: storage }).single("file");
  //console.log(upload);
  // const { pass, account_address } = req.body;
  // //console.log(req);

  // //console.log(req.file);
  // console.log(req.body);
  // //console.log(req.);
  // //console.log(req.pass);

  // console.log("Pass:", pass);
  // console.log("Account ID:", account_address);

  // // Here, you can access the uploaded file using req.file
  // // Process the file and parameters as needed

  // res.status(200).send("File uploaded");

  upload(req, res, async function (error) {
    if (error) {
      return res.end("Error Uploading File");
    } else {
      // data = {
      //   name: "Luxury NYC Penthouse",
      //   address: "157 W 57th St APT 49B, New York, NY 10019",
      //   description: "Luxury Penthouse located in the heart of NYC",
      //   image: "",
      //   id: "",
      //   attributes: [
      //     {
      //       trait_type: "price",
      //       value: 20,
      //     },
      //     {
      //       trait_type: "type",
      //       value: "1bhk",
      //     },
      //     {
      //       trait_type: "Bed Rooms",
      //       value: 2,
      //     },
      //     {
      //       trait_type: "Bathrooms",
      //       value: 3,
      //     },
      //     {
      //       trait_type: "sqft",
      //       value: 123,
      //     },
      //     {
      //       trait_type: "emi",
      //       value: 10,
      //     },
      //   ],
      // };
      //const pinatabaseurl = `https://gateway.pinata.cloud/ipfs/`;
      const filename = req.file.filename;
      const owner = req.body.account_address;
      const data = req.body.data;

      console.log(filename);
      console.log("Owner : ", owner);
      console.log("Data : ", data);

      // const image_upload_response = await upload_image_promise(filename);
      // const IpfsHash = image_upload_response.IpfsHash;
      // const IpfsHash = "QmXGFPvcdQvTH1yiPYFbGa384Epu7qgE1nWwvVEKa9aKNS" //image_upload_response.IpfsHash
      // const imageurl = pinatabaseurl + IpfsHash;
      // data["image"] = imageurl;
      // const id = await total_supply_promise(owner);
      // data["id"] = 1 + +id;

      // const json_upload_response = await upload_json_promise(data);
      // const jsonurl = pinatabaseurl + json_upload_response;
      // // const jsonurl = pinatabaseurl + "QmSCgBBCjon2SAbvXpqGLhmGci7EnKbf21R3sywzaxEcmE";

      const property_data = null;

      const mint_response = "Nothing";

      // const property = new Property(property_data);
      // property.save();

      res.send({
        msg: "property added/minted successfully",
        txn: mint_response,
        data: property_data,
      });
    }
  });
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
