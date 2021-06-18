const { startCompressFiles } = require("./pictureCompress");



exports.connection = (wss) => {

    wss.on("connection", (ws) => {
        console.log("[websocket]: connexion client");
        ws.on("message", (data) => {
            //webSocket: reception de toutes les données envoyées par le client
            const newData = JSON.parse(data);
            // données dispaché:
            // "startCompressFiles": demande d'une opération de compression d'images: 
            newData.startCompressFiles? startCompressFiles(newData.startCompressFiles, ws): false;
        });
        ws.on("close", (e) => {
            console.log("[WebSocket]: déconnexion client, code: ", e);
          
        });
    });

};