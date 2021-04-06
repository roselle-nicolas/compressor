const compress_images = require('compress-images')
const OUTPUT_path = './comp-img/comp-'

exports.chooseComp = (req, res, tcomp) => {
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
    { png: { engine: 'pngquant', command: ['--quality=10-'+tcomp, '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', tcomp, '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
    })
  console.log('TERMINUS')
  res.status(200).json({message: 'coucou'})
}

exports.sendFile = (req, res) => {
  console.log('Process strating ...')
  console.log('req.file :', req.file)
  console.log('req.file.filename: ', req.file.filename)
  console.log('req.file.path :', req.file.path)
  let INPUT_path = './'+req.file.path
  console.log('input path :', INPUT_path)
  compress_images(INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('static :', statistic)
      console.log('-------------')
    })
  console.log('TERMINUS')
  res.end()
}

exports.local = () => {
  console.log('in da funcchionne')
  const INPUT_path = './images/ter1.jpg'
  compress_images(INPUT_path, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    function logg (error, completed, statistic) {
      console.log('Rapport de compression :')
      console.log('-------------')
      console.log('erreur :', error)
      console.log('achevé :', completed)
      console.log('détails :', statistic)
      console.log('-------------')
    }
  )
}

exports.pong = (req, res) => {
  console.log(req.file)
  res.status(201).json({message: 'test ok !'})
}
