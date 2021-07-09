const Repo = require("../models/repository");
const Picture = require("../models/picture");
const fs = require("fs");


exports.getAll = (req, res) => {
    Repo
        .find()
        .then((repos) => {
            res.status(200).json(repos);
        })
        .catch((error) => {
            console.error(error);
        });

};
exports.getRepositorySelected = (req, res) => {
    Repo
        .find({
            user_id: req.body.user_id,
            repository_parent_id: req.body.repository_parent_id,
            project_id: req.body.project_id
        })
        .then((repos) => {
            res.status(200).json(repos);
        })
        .catch((error) => {
            console.error(error);
        });

};

exports.getOne = (req, res) => {
    const _idValue = req.params._id === "_null"? null : req.params._id;
    Repo
        .findOne({
            _id: _idValue
        })
        .then((repo) => {
            res.status(200).json(repo);
        })
        .catch(error => console.error(error));

};

exports.create = (req, res) => {
    const repository = new Repo({
        ...req.body
    });
    repository
        .save()
        .then(() => {
            res.status(201).json({repository});
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.modify = (req, res) => {
    Repo
        .updateOne(
            {_id: req.params._id},
            {...req.body, _id: req.params._id}
        )
        .then(() => {
            res.status(200).json({message: "Repository Updated"});
        })
        .catch(error => console.error(error));
};

const deleteDataPicture = (dataPicture) => {
    Picture.deleteOne({_id: dataPicture._id}).then(
        response => console.log(response)
    ).catch(
        error => console.log(error)
    );
};

const deletePicturefile = (dataPicture) => {
    // eslint-disable-next-line no-undef
    const pathCompressPicture = `${process.env.FOLDER_PIC_COMPRESS}/${process.env.PICTURE_PREFIX + dataPicture.name}`;
    const pathDownloadPicture = `temp/${dataPicture.name}`;
    
    // suppression de l'image compressé
    fs.unlink(pathCompressPicture, (error) => {
        if (!error) {
            // puis suppression de l'image d'origine
            fs.unlink(pathDownloadPicture, () => {
                if (!error) {
                    deleteDataPicture(dataPicture);
                    
                }else {
                    console.log(error);
                }
            });
        }else {
            console.log(error);
        }
    });
};

exports.delete = (req, res) => {
    // récupère toutes les images du dossier à effacé
    Picture.find({ repository_id: req.params._id})
        .then(
            pictures => {
                // efface les images du dossier
                if (pictures && pictures.length !== 0) {
                    for (const picture of pictures) {
                        // vérifie si une l'image à étais copié dans l'application. plussieur données avec le même url image
                        Picture.find({ url: picture.url })
                            .then(
                                dataPictures => {
                                    if (dataPictures.length > 1) {
                                        // efface selement les données de l'image et non le fichier
                                        deleteDataPicture(picture);
                                    }else {
                                        deletePicturefile(picture);
                                    }
                                }
                            )
                            .catch(error => console.log(error));
                    }
                }
            }
        )
        .catch(error => console.log(error));
    //efface le dossier    
    Repo
        .deleteOne({
            _id: req.params._id
        })
        .then((response) => {
            res.status(200).json({ response });
        })
        .catch(error => console.error(error));
};

