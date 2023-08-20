const express = require("express");
const router = express.Router();
const property = require("../controllers/property_controller.js");

router.route("/").get(property.getProperties);

module.exports = router;
