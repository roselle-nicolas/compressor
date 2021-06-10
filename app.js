const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
// route
const formatRoutes = require("./routes/format");
const formatSocketRoutes = require("./routes/formatSocket");
const handleImagesRoutes = require("./routes/handleImages");
const userRoutes = require("./routes/auth");
const repositoryRoutes = require("./routes/repository");

const ENV = process.env;

const app = express();

mongoose.connect(ENV.connectMongoose,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
     })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());

//*** START ROUTE API

//auth
app.use('/api/auth', userRoutes);
//format
app.use("/api/onepic", formatRoutes);
//formatSocket
app.use("/api/onepic/multi", formatSocketRoutes);
//handleImages
app.use("/api/handleImages", handleImagesRoutes);
// repository
app.use("/api/repository", repositoryRoutes);

//ROUTE API FINISH***


// *** START STATIC SERVE

//picture compress
app.use("/assets", express.static(path.join(__dirname, ENV.FOLDER_PIC_COMPRESS)));

// STATIC SERVE FINISH ***

module.exports = app;