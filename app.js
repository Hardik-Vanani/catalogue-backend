require("dotenv").config();
require("./config/conn.db");
const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorhandler.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contain all routes
app.use("/api", require("./router/index"));

// Handle error which come from the any routes
app.use(errorHandler);

// Listen connection on the port
app.listen(process.env.PORT, (req, res) => {
    console.log(`PORT : ${process.env.PORT} 🖥️ 🚀`);
});
