
const formatSocketCtrl = require("../controllers/formatSocket");

exports.startCompressFiles = (compressPictureData, ws) => {
    console.log("start compressPicture", compressPictureData);
    const compressPictureId = Date.now();

    const dataCompressPictures = {
        numberOfPictures: compressPictureData.nomberOfPicture,
        ws
    };

    // sauvegarde des infos de la demande de compression d'images
    formatSocketCtrl.addCompressPicture(compressPictureId, dataCompressPictures);

    //envoie de l'identifiant de l'opération de compression d'un utilisateur.
    const data = {startCompressFiles: {compressPictureId}};
    ws.send(JSON.stringify(data));
};