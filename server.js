const http = require('http')
const app = require('./app')
const nport = 3333


app.set('port',process.env.PORT || nport)
const server = http.createServer(app)
console.log(`Connecté au port${nport}`)

server.listen(process.env.PORT || nport);