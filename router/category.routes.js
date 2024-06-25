const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {
    CATEGORY: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getCategory);

router.post("/", auth, upload.single("image"), VALIDATOR.createCategory, APIS.createCategory);

router.put("/:id", auth, upload.single("image"), VALIDATOR.updateCategory, APIS.updateCategory);

router.delete("/:id", auth, VALIDATOR.deleteCategory, APIS.deleteCategory);

module.exports = router;
