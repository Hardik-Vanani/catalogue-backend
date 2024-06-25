const express = require("express");
const router = express.Router();

const {
    ROLE: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", APIS.getRole);

router.post("/", VALIDATOR.createRole, APIS.createRole);

module.exports = router;
