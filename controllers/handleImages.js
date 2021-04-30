const fs = require("fs");

exports.deletePicture = (req, res) => {
    const filename = req.params.filename;
    // suppression de l'image compressé
    fs.unlink(`${process.env.FOLDER_PIC_COMPRESS}/${process.env.PICTURE_PREFIX + filename}`, (error) => {
        if (!error) {
            // puis suppression de l'image d'origine
            fs.unlink(`temp/${filename}`, () => {
                if (!error) {
                    res.status(200).json({ message : "image supprimé avec succès !"});
                }else {
                    res.status(400).json({ error });
                }
            });
        }else {
            res.status(400).json({ error });
        }
    });
};