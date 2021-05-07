const formatSocketCtrl = require("./controllers/formatSocket");

exports.start = (io) => {
    io.on("connection", client => {
        console.log("connexion server socket.io");
        io.on("disconnect", () => {
            console.log("utilisateur déconecté");
        });
        const dataSocketClient = client;

        // reception de la demande de compression d'images
        client.on("startCompressFiles", (compressPictureData) => {
            const dataReceived = JSON.parse(compressPictureData);

            const compressPictureId = Date.now();

            const dataCompressPictures = {
                numberOfPictures: dataReceived.nomberOfPicture,
                client: dataSocketClient
            };

            // sauvegarde des infos de la demande de compression d'images
            formatSocketCtrl.addCompressPicture(compressPictureId, dataCompressPictures);

            //envoie de l'identifiant de l'opération de compression d'un utilisateur.
            const dataSent = {compressPictureId};
            client.emit("startCompressFiles", JSON.stringify(dataSent));
        });          
    });
};