const mongoose = require("mongoose");

const repoSchema = mongoose.Schema({
    name                : { type: String, required: true},
    user_id             : { type: String, required: true},
    repository_parent_id: { type: String},
    project_id          : { type: String}
});

module.exports = mongoose.model("Repo", repoSchema);