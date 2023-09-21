const express = require('express');
const cors = require('cors');
const heroRouter = require('./src/routes/heroRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/heroes", heroRouter);

module.exports = app;
