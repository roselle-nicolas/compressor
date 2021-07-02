const { response } = require("express");
const fs = require("fs");
const Picture = require("../models/picture");

exports.createPicture = (req, res) => {
    console.log(req.body);
    const picture = new Picture({
        ...req.body,
    });
    picture.save()
        .then(() => res.status(201).json(picture))
        .catch(error => res.status(500).json({ error }));
};

exports.getPicturesSelected = (req, res) => {
    console.log(req.body.user_id, req.body.repository_id);

    Picture.find({ 
        user_id: req.body.user_id,
        repository_id: req.body.repository_id,
    })
        .then(pictures => res.status(200).json(pictures))
        .catch(error => res.status(500).json({ error }) );
};

exports.modify = (req, res) => {
    Picture.findOne({ _id: req.params._id })
        .then(picture => {
            //suppression de l'image iriginale téléchargé si l'image est traité pour la première fois.
            if (picture) {
                if (req.body.operation_id === "_null" && req.body.operation_id !== picture.operation_id) {
                    fs.unlink(`temp/${picture.name}`, () => {
                        console.log(`effacement de: temp/${picture.name}`);
                    });
                }
            }
        })
        .catch(error => console.log(error));

    
    Picture.updateOne(
        { _id: req.params._id },
        {
            ...req.body,
            _id: req.params._id
        }
    )
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(500).json({ error }));
};

exports.deletePicture = (req, res) => {
    // récupérer les infos de l'image
    Picture.findOne({ _id: req.params._id})
        .then(
            dataPicture => {
                // plusieurs dataPicture avec la même url?. cela peut arriver si l'image a été copiée dans l'application?
                Picture.find({ url: dataPicture.url })
                    .then(
                        dataPictures => {
                            if (dataPictures.length > 1) {
                                // efface selement les données de l'image et non le fichier
                                deleteDataPicture(dataPicture, res);
                            }else {
                                deletePicturefile(dataPicture, res);
                            }
                        }
                    )
                    .catch();
            }
        )
        .catch(error => res.status(500).json({ error }));
};

const deletePicturefile = (dataPicture, res) => {
    console.log("effacement du fichier de l'image");
    // eslint-disable-next-line no-undef
    const pathCompressPicture = `${process.env.FOLDER_PIC_COMPRESS}/${process.env.PICTURE_PREFIX + dataPicture.name}`;
    const pathDownloadPicture = `temp/${dataPicture.name}`;
    
    // suppression de l'image compressé
    fs.unlink(pathCompressPicture, (error) => {
        if (!error) {
            // puis suppression de l'image d'origine
            fs.unlink(pathDownloadPicture, () => {
                if (!error) {
                    deleteDataPicture(dataPicture, res);
                    
                }else {
                    res.status(400).json({ error });
                }
            });
        }else {
            res.status(400).json({ error });
            return;
        }
    });
};

const deleteDataPicture = (dataPicture, res) => {
    console.log("effacement des données d'une image");
    Picture.deleteOne({_id: dataPicture._id}).then(
        response => res.status(200).json({ response })
    ).catch(
        error => res.status(400).json({ error })
    );
};