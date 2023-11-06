const express = require("express");
const router = express.Router();
const property = require("../controllers/property_controller.js");

router.route("/get_properties").get(property.getProperties);
//router.route("/add_property").post(property.addProperty);
router.route("/status_change").post(property.changeStatus);

module.exports = router;
