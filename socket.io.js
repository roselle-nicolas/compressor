
let counter = 1;

exports.start = (io) => {
    io.on("connection", client => {
        console.log("connexion server socket.io");
        io.on("disconnect", () => {
            console.log("utilisateur déconecté");
        });
        client.on("ping", () => {
            console.log(`ping ${counter}`);
            if (counter === 4) {
                console.log("score: 1 / 0, service à droite...");
            }
            setTimeout(() => {
                counter++;
                client.emit("pong", "pong");
            }, 2000);
        });
        
    });
};