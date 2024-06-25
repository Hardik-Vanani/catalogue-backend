const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate } = require("express-validation");

const auth = require("../middleware/auth.middleware");
const DB = require("../models");

const {
    USER: { APIS, VALIDATOR },
} = require("../controllers");

// Login User
router.post("/signin", VALIDATOR.loginUser, APIS.loginUser);

// Create new credential
router.post("/signup", VALIDATOR.createUser, APIS.createUser);

router.put("/update/:id", async (req, res) => {
    try {
    } catch (error) {
        return response.INTERNAL_SERVER_ERROR({ res });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
    } catch (error) {
        return response.INTERNAL_SERVER_ERROR({ res });
    }
});

module.exports = router;
