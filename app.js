const express = require("express");
const cors = require("cors");
const path = require("path");

const heroRouter = require("./src/routes/heroRoute");


const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/heroes", heroRouter);

module.exports = app;
