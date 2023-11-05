const express = require("express");
const router = express.Router();
const escrow = require("../controllers/escrow_controller.js");

router.route("/init").post(escrow.init);
router.route("/list").post(escrow.listProperty);
router.route("/set_buyer").post(escrow.setBuyer);
router.route("/set_lender").post(escrow.setLender);
router.route("/deposit_earnest").post(escrow.depositEarnest);
router.route("/get_balance_in_contract").get(escrow.getContractBalance);
router.route("/send_amount").post(escrow.sendAmount);
router.route("/finalize_sale").post(escrow.finalizeSale);

module.exports = router;
