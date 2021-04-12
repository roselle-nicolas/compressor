const express = require('express')
const formatRoutes = require('./routes/format')
const path = require('path')
// route


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.json())

//route
app.use('/api/onepic', formatRoutes)
app.use('/assets', express.static(path.join(__dirname, 'comp-img')))

//auth

module.exports = app