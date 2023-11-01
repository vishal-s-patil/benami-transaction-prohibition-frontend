const express = require("express");
const router = express.Router();
const nft = require("../controllers/nft_controller.js");

//router.route("/get_user_data?account_address").post(profile.get_user_data);
// router.route("/upload").post(profile.upload_xml);

router.route("/approve").post(nft.approve);
router.route("/owner_of").post(nft.ownerOf);
router.route("/get_all_owners").get(nft.getAllOwners);
router.route("/get_owned_nfts").get(nft.getOwnedNFTs);
router.route("/get_ownership_history").get(nft.getOwnershipHistory);

module.exports = router;
