const mongoose = require("mongoose");

const repoSchema = mongoose.Schema({
    id: {type: String},
    name: { type: String, required: true},
    userId: { type: String, required: true},
    repository_parent_id: { type: String},
    project: { type: String}
});

module.exports = mongoose.model("Repo", repoSchema);