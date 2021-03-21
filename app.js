const express = require('express')
const compress_images = require('compress-images')
const INPUT_path = './img/ter1.jpg'
const OUTPUT_path = './comp-img/comp-'

// route


const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.json())

app.use('/test2/', () => {
  console.log('in da funcchionne')
  compress_images(INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('in da CallBack')
      console.log('-------------')
      console.log(error)
      console.log(completed)
      console.log(statistic)
      console.log('-------------')
    })
})
//route
//auth

module.exports = app