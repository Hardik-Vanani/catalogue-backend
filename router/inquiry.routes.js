const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
    INQUIRY: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getInquiry);

router.post("/", auth, VALIDATOR.createInquiry, APIS.createInquiry);

module.exports = router;
