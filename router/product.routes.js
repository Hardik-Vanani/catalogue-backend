const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
    PRODUCT: { APIS, VALIDATOR },
} = require("../controllers");

router.get("/", auth, APIS.getProducts);

router.post("/", auth, upload.single("productImage"), VALIDATOR.createProduct, APIS.createProduct);

router.put("/:id", auth, upload.single("productImage"), VALIDATOR.updateProduct, APIS.updateProduct);

router.delete("/:id", auth, VALIDATOR.deleteProduct, APIS.deleteProduct);

module.exports = router;
