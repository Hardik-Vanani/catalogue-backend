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

module.exports = router;
