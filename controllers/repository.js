const Repo = require("../models/repository");

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

exports.getOne = (req, res) => {
    Repo
        .findOne({
            id: req.params._id
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
            res.status(201).json({message: "Repository created"});
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.modify = (req, res) => {
    Repo
        .updateOne({
            _id: req.params._id,
            ...req.body
        })
        .then(() => {
            res.status(200).json({message: "Repository Updated"});
        })
        .catch(error => console.error(error));
};

exports.delete = (req, res) => {
    Repo
        .deleteOne({
            _id: req.params._id
        })
        .then(() => {
            res.status(200).jeson({message:"Repository deleted"});
        })
        .catch(error => console.error(error));
};