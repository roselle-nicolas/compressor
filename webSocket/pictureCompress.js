
const formatSocketCtrl = require("../controllers/formatSocket");

exports.startCompressFiles = (compressPictureData, ws) => {

    const compressPictureId = Date.now();

    const dataCompressPictures = {
        numberOfPictures: compressPictureData.nomberOfPicture,
        numberOfRemainigPicture: compressPictureData.nomberOfPicture,
        numberOfPicturesDownload: 0,
        ws
    };

    // sauvegarde informations: operation de la compression d'images
    formatSocketCtrl.addCompressPicture(compressPictureId, dataCompressPictures);

    //webSocket: envoie: identifiant de l'opération de compression d'un utilisateur. Le client devra envoyer les images à compressées avec cette identifiant.
    const data = {startCompressFiles: {compressPictureId}};
    ws.send(JSON.stringify(data));
};