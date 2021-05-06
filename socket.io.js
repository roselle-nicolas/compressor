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

            console.log("socket recu", dataReceived);

            const compressPictureId = Date.now();

            const dataCompressPictures = {
                numberOfPictures: dataReceived.nomberOfPicture,
                client: dataSocketClient
            };

            formatSocketCtrl.addCompressPicture(compressPictureId, dataCompressPictures);

            const dataSent = {compressPictureId};
            client.emit("startCompressFiles", JSON.stringify(dataSent));
        });          
    });
};