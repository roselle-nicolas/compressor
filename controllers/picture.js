const fs = require("fs");
const Picture = require("../models/picture");

exports.createPicture = (req, res) => {
    const picture = new Picture({
        ...req.body,
    });
    picture.save()
        .then(() => res.status(201).json({picture}))
        .catch(error => res.status(500).json({ error }));
};

exports.getPicturesSelected = (req, res) => {

    const repository_id = req.body.repository_id === "_null"? null : req.body.repository_id;
    const operation_id = req.body.operation_id === "_null"? null : req.body.operation_id;

    Picture.find({ 
        user_id: req.body.user_id,
        repository_id,
        operation_id
    })
        .then(pictures => res.status(200).json({ pictures }))
        .catch(error => res.status(500).json({ error }) );
};

exports.modify = (req, res) => {
    Picture.updateOne({
        _id: req.body._id,
        ...req.body
    })
        .then((picture) => res.status(201).json({ picture }))
        .catch((error) => res.status(500).json({ error }));
};

exports.deletePicture = (req, res) => {
    const filename = req.params.filename;
    // suppression de l'image compressé
    // eslint-disable-next-line no-undef
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