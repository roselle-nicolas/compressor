const compressImages = require("compress-images");

const ENV = process.env;

let AllCompressPictures = {};


exports.addCompressPicture = (compressPicturesId, dataCompressPictures) => {
    AllCompressPictures[compressPicturesId] = dataCompressPictures;
};

const logFileReqReport = (req) => {
    if (ENV.MODE === "development") {
        console.log("Process starting ...");
        console.log("req.file :", req.file);
        console.log("req.body :", req.body);
        console.log("T comp :", req.body.rangeValue);
        console.log("req.file.filename: ", req.file.filename);
        console.log("req.file.path :", req.file.path);
    }
};

const logPreCompresse = (mimetype, extentionFile, INPUT_path) => {
    if (ENV.MODE === "development") { 
        console.log("MIMETYPE : ", mimetype);
        console.log("EXT_FILE : ", extentionFile);
        console.log("input path :", INPUT_path);
    }
};

const logCompressReport = (error, completed, statistic) => {
    if (ENV.MODE === "development") { 
        console.log("Rapport de compression :");
        console.log("-------------");
        console.log("erreur :", error);
        console.log("achevé :", completed);
        console.log("static :", statistic);
        console.log("-------------");
        console.log("TERMINUS");
    }
};

const getExtentionFile = (mimetype) => {
    switch (mimetype) {
    case "image/jpg":
        return "jpg";
    case "image/jpeg":
        return "jpg";
    case "image/png":
        return "png";
    case "image/gif":
        return "gif";
    case "image/svg":
        return "svg";
    case "image/svg+xml":
        return"svg";
    default:
        return null;
    }
};

const compressPicture = (currentOperation, compressRatio, file) => {
    const mimetype = file.mimetype;
    const filename = file.filename;
    const INPUT_path = `./${file.path}`;
    const OUTPUT_path = "./comp-img/comp-";
    const extentionFile = getExtentionFile(mimetype);

    logPreCompresse(mimetype, extentionFile, INPUT_path);
    
    // dépendance: node_module compress-images
    compressImages(
        INPUT_path,
        OUTPUT_path,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: extentionFile === "jpg"? "mozjpeg": false, command: ["-quality", compressRatio ] } },
        { png: { engine: extentionFile === "png"? "pngquant": false, command: ["--quality=10-"+compressRatio, "-o"] } },
        { svg: { engine: extentionFile === "svg"? "svgo": false, command: "--multipass" } },
        { gif: { engine: extentionFile === "gif"? "gifsicle": false, command: ["--colors", compressRatio, "--use-col=web"] } },
        function(error, completed, statistic) {

            logCompressReport(error, completed, statistic);

            if (!error) {
                // hébergement serveur static: 
                const pinctureLink = `http://${ENV.HOST}:${ENV.PORT}/assets/${ENV.PICTURE_PREFIX + filename}`;

                // websocket: envoie client: image compréssé terminé: url
                const data = {conpressOnePictureFinish: {pinctureLink}};
                currentOperation.ws.send(JSON.stringify(data));
                //décrémenter le nombre d'image restant à compresser
                currentOperation.numberOfRemainigPicture -= 1;
                // websocket: envoie client: fin de la compression de toutes les images
                if (currentOperation.numberOfRemainigPicture <= 0) {
                    currentOperation.ws.send(JSON.stringify({compressAllPicturesFinish: true}));
                }
            }
        }
    );
};

const downloadPicture = (req, res) => {
    // récupéretion des données d'une opération client
    const compressPictureId = req.body.compressPictureId;
    const currentOperation = AllCompressPictures[compressPictureId];
    
    //enregistrement du nombre d'images téléchargées
    currentOperation.numberOfPicturesDownload++;

    // téléchargement de toutes les images terminé
    if (currentOperation.numberOfPicturesDownload === currentOperation.numberOfPictures) {
        //envois au client: téléchargement terminées
        currentOperation.ws.send(JSON.stringify({downloadAllPicturesFinish: true}));
    }
    //reponse http: image téléchargé avec succès, compression en cours.
    res.status(200).json({response: `compression de l'image: ${req.file.filename} en cour...`});

    //Compression d'une image
    compressPicture(currentOperation, req.body.compressRatio, req.file);
};

exports.jpgComp = (req, res) => {
    logFileReqReport(req);
    downloadPicture(req, res);
};

exports.pngComp = (req, res) => {
    logFileReqReport(req);
    downloadPicture(req, res);
};

exports.gifComp = (req, res) => {
    logFileReqReport(req);
    downloadPicture(req, res);
};

exports.svgComp = (req, res) => {
    logFileReqReport(req);
    downloadPicture(req, res);
};

