require("dotenv").config();
require("./config/conn.db");
const express = require("express");
const app = express();

const errorHandler = require("./middleware/errorhandler.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./router/index"));

app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
    console.log(`PORT : ${process.env.PORT} 🖥️ 🚀`);
});
