require("dotenv").config();
const http = require("http");
const app = require("./app");
// const ENV = require("./env");
// eslint-disable-next-line no-undef
app.set("port", process.env.PORT );
const server = http.createServer(app);
console.log(`Connecté au port ${process.env.PORT}`);

server.listen( process.env.PORT);