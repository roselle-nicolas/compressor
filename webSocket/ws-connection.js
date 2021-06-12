const { startCompressFiles } = require("./pictureCompress");



exports.connection = (wss) => {

    wss.on("connection", (ws) => {
        console.log("[websocket]: connexion client");
        ws.on("message", (data) => {
            const newData = JSON.parse(data);
            // début des opération de compression: "startCompressFiles"
            newData.startCompressFiles? startCompressFiles(newData.startCompressFiles, ws): false;
        });
        ws.on("close", (e) => {
            console.log("[WebSocket]: déconnexion client, code: ", e);
          
        });
    });

};