const compress_images = require('compress-images')
const OUTPUT_path = './comp-img/comp-'

exports.jpgComp = (req, res, tcomp) => {
  console.log('Process starting ...')
  console.log('req.file :', req.file)
  console.log('req.body :', req.body)
  console.log('T comp :', req.body.rangeValue)
  console.log('req.file.filename: ', req.file.filename)
  console.log('req.file.path :', req.file.path)
  let INPUT_path = './'+req.file.path
  tcomp = req.body.rangeValue
  console.log('input path :', INPUT_path)
  compress_images( INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', tcomp ] } },
    { png: { engine: false, command: ['--quality=10-'+tcomp, '-o'] } },
    { svg: { engine: false, command: '--multipass' } },
    { gif: { engine: false, command: ['--colors', tcomp, '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
      console.log('TERMINUS')
    })
  res.status(200).json({message: `${req.protocol}://${req.get('host')}/comp-img/comp-${req.file.filename}`})
}

exports.pngComp = (req, res, tcomp) => {
  console.log('Process starting ...')
  console.log('req.file :', req.file)
  console.log('req.body :', req.body)
  console.log('T comp :', req.body.rangeValue)
  console.log('req.file.filename: ', req.file.filename)
  console.log('req.file.path :', req.file.path)
  let INPUT_path = './'+req.file.path
  tcomp = req.body.rangeValue
  console.log('input path :', INPUT_path)
  compress_images( INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false, 
    { jpg: { engine: false, command: ['-quality', tcomp ] } },
    { png: { engine: 'pngquant', command: ['--quality='+tcomp+'-100', '-o'] } },
    { svg: { engine: false, command: '--multipass' } },
    { gif: { engine: false, command: ['--colors', tcomp, '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
      console.log('TERMINUS')
    })
  res.status(200).json({message: `${req.protocol}://${req.get('host')}/comp-img/comp-${req.file.filename}`})
}

exports.gifComp = (req, res, tcomp) => {
  console.log('Process starting ...')
  console.log('req.file :', req.file)
  console.log('req.body :', req.body)
  console.log('T comp :', req.body.rangeValue)
  console.log('req.file.filename: ', req.file.filename)
  console.log('req.file.path :', req.file.path)
  let INPUT_path = './'+req.file.path
  tcomp = req.body.rangeValue
  console.log('input path :', INPUT_path)
  compress_images( INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: false, command: ['-quality', tcomp ] } },
    { png: { engine: false, command: ['--quality=10-'+tcomp, '-o'] } },
    { svg: { engine: false, command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', tcomp, '--use-col=web'] } },
    
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
      console.log('TERMINUS')
    })
  res.status(200).json({message: `${req.protocol}://${req.get('host')}/comp-img/comp-${req.file.filename}`})
}

exports.svgComp = (req, res, tcomp) => {
  console.log('Process starting ...')
  console.log('req.file :', req.file)
  console.log('req.body :', req.body)
  console.log('T comp :', req.body.rangeValue)
  console.log('req.file.filename: ', req.file.filename)
  console.log('req.file.path :', req.file.path)
  let INPUT_path = './'+req.file.path
  // tcomp = req.body.rangeValue
  console.log('input path :', INPUT_path)
  compress_images( INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: false, command: ['-quality', tcomp ] } },
    { png: { engine: false, command: ['--quality=10-'+tcomp, '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: false, command: ['--colors', tcomp, '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
      console.log('TERMINUS')
    })
  res.status(200).json({message: `${req.protocol}://${req.get('host')}/comp-img/comp-${req.file.filename}`})
}

