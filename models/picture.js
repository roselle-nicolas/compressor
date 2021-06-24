const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const pictureSchema = mongoose.Schema({
    user_id      : { type: String, required: true },
    repository_id: { type: String, required: true },
    name         : { type: String, required: true },
    url          : { type: String, required: true, inique: true },
    operation_id : { type: String, required: true},
    size_in: { type: Number },
    size_output: { type: Number },
    compressRatio: { type: Number },
    percent: { type: Number },
});

pictureSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Picture", pictureSchema);