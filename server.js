const http = require('http')
const app = require("./app")
const ENV = require('./env')


app.set('port', process.env.PORT || ENV.port)
const server = http.createServer(app)
console.log(`Connecté au port ${ENV.port}`)

server.listen( process.env.PORT || ENV.port)