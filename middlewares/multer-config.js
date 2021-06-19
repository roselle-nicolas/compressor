
const multer = require("multer");
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/svg": "svg",
    "image/svg+xml": "svg",
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "temp");
    },
    filename: (req, file, callback) => {
        console.log("file.mimetype", file.mimetype);
        const extension = MIME_TYPES[file.mimetype];
        console.log("ext : ", extension);
        let name = file.originalname.split(" ").join("-");
        callback(null, Date.now()+"-"+name);
    }
});

module.exports = multer({storage: storage}).single("image");