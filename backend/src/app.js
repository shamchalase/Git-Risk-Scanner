const express = require("express");
const cors = require("cors");

const scanRoutes = require("./routes/scanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/scan", scanRoutes);

module.exports = app;
