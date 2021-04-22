const compress_images = require('compress-images')
const ENV = require('../env')
const OUTPUT_path = './comp-img/comp-'

const logFileReqReport = (req) => {
  if (ENV.showLog) {
    console.log('Process starting ...')
    console.log('req.file :', req.file)
    console.log('req.body :', req.body)
    console.log('T comp :', req.body.rangeValue)
    console.log('req.file.filename: ', req.file.filename)
    console.log('req.file.path :', req.file.path)
  }
}

const logCompressReport = (error, completed, statistic) => {
  if (ENV.showLog) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
      console.log('TERMINUS')
  }
}

const compressPicture = (req, res, tcomp) => {
        let mineTypePicture = "";

        switch (req.file.mimetype) {
          case 'image/jpg':
            mineTypePicture = "jpg"
            break;
          case 'image/jpeg':
            mineTypePicture = "jpg"
            break;
          case 'image/png':
            mineTypePicture = "png"
            break;
          case 'image/gif':
            mineTypePicture = 'gif'
            break;
          case 'image/svg':
            mineTypePicture = 'svg'
            break;
          case 'image/svg+xml':
            mineTypePicture = 'svg'
            break;
        
          default:
            break;
        }
        console.log("MINETYPE : ", req.file.mimetype);
        console.log("MINETYPE : ", mineTypePicture);
        let INPUT_path = './'+req.file.path
        tcomp = req.body.rangeValue
        console.log('input path :', INPUT_path)
        compress_images( INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
          { jpg: { engine: mineTypePicture === "jpg"? 'mozjpeg': false, command: ['-quality', tcomp ] } },
          { png: { engine:  mineTypePicture === "png"? 'pngquant': false, command: ['--quality=10-'+tcomp, '-o'] } },
          { svg: { engine:  mineTypePicture === "svg"? 'svgo': false, command: '--multipass' } },
          { gif: { engine: mineTypePicture === "gif"? 'gifsicle': false, command: ['--colors', tcomp, '--use-col=web'] } },
          function logg (error, completed, statistic) {
            logCompressReport(error, completed, statistic)
            const pinctureLink = `http://${ENV.host}:${ENV.port}/assets/${ENV.picturePrefix + req.file.filename}`
            console.log('picktureLink : ', pinctureLink)
            res.status(200).json({pictureLink: pinctureLink})
          })
}

exports.jpgComp = (req, res, tcomp) => {
  // log fichier entrée
  logFileReqReport(req)
  compressPicture(req, res, tcomp)
}

exports.pngComp = (req, res, tcomp) => {
  // log fichier entrée
  logFileReqReport(req)
  compressPicture(req, res, tcomp)
}

exports.gifComp = (req, res, tcomp) => {
  // log fichier entrée
  logFileReqReport(req)
  compressPicture(req, res, tcomp)
}

exports.svgComp = (req, res, tcomp) => {
  // log fichier entrée
  logFileReqReport(req)
  compressPicture(req, res, tcomp)
}

