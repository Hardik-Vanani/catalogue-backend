const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
    VENDOR: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getVendor);

router.put("/:id", auth, VALIDATOR.updateVendor, APIS.updateVendor);

router.delete("/:id", auth, APIS.deleteVendor);

module.exports = router;
