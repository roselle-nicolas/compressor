const express = require("express");
const path = require("path");
// route export module
const formatRoutes = require("./routes/format");
const handleImagesRoutes = require("./routes/handleImages");

const ENV = process.env;

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());

//*** START ROUTE API

//format
app.use("/api/onepic", formatRoutes);
//handleImages
app.use("/api/handleImages", handleImagesRoutes);

//ROUTE API FINISH***


// *** START STATIC SERVE

//picture compress
app.use("/assets", express.static(path.join(__dirname, ENV.FOLDER_PIC_COMPRESS)));

// STATIC SERVE FINISH ***

module.exports = app;