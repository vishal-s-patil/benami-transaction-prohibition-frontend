const express = require("express");
const router = express.Router();
const profile = require("../controllers/profile_controller.js");

router.route("/get_user_data").post(profile.get_user_data);
router.route("/upload").post(profile.upload_xml);
router.route("/get_all_users").get(profile.get_all_users);

module.exports = router;
