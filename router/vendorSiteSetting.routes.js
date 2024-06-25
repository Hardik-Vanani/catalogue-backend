const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    SITE_SETTING: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getSetting);

router.post("/", auth, upload.single("logo"), VALIDATOR.createSetting, APIS.createSetting);

router.put("/:id", auth, upload.single("logo"), VALIDATOR.updateSetting, APIS.updateSetting);

router.delete("/:id", auth, VALIDATOR.deleteSetting, APIS.deleteSetting);

module.exports = router;
