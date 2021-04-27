function groom (req, res) {
    console.log("ENTER GROOM");
    const file = req.body;
    console.log(file);
    /*const poid = req.file.size
  console.log('poid :', poid)
  const ext = req.file.mimetype
  console.log('extension :', ext)
  if (poid < 4) {
    res.status(201).json({message: 'image trop grosse'})
  } else if(ext !== ('jpg', 'png','svg','gif','jpeg')) {
    res.status(201).json({message: 'Formatnon reconnu'})
  } else {
    next()
  }*/
    res.end();
}
module.exports = groom;