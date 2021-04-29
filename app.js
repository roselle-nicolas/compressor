const express = require("express");
const path = require("path");
// route export module
const formatRoutes = require("./routes/format");

const ENV = process.env;

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());

//route API
app.use("/api/onepic", formatRoutes);

//static serve
//picture compress
// eslint-disable-next-line no-undef
app.use("/assets", express.static(path.join(__dirname, ENV.FOLDER_PIC_COMPRESS)));

module.exports = app;