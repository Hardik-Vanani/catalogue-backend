const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
    PAYMENT: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getPaymentDetails);

router.post("/", auth, VALIDATOR.createPaymentDetail, APIS.createPaymentDetail);

router.put("/:id", auth, VALIDATOR.updatePaymentDetail, APIS.updatePaymentDetail);

router.delete("/:id", auth,VALIDATOR.deletePaymentDetail, APIS.deletePaymentDetail);
module.exports = router;
