class GameController {
    constructor() {
      
        // Server sends updates at 20 ticks per second
        this.SERVER_TICK_RATE = 20;
        // Duration between two server ticks in milliseconds
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

        this.game = new Game();
        this.pseudo = localStorage.getItem('pseudo');
        this.serverUrl = localStorage.getItem('serverUrl');
        this.skinPath = localStorage.getItem('skinPath');
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
        };

        this.socket = new WebSocket(this.serverUrl);

        this.initSocket();
        this.initInput();
        this.startInputSender();

        // Permanently bind "this" at the instance of the GameController class
        this.loop = this.loop.bind(this);

        // Regulates framerate to keep 60fps
        requestAnimationFrame(this.loop);
    }

    
        initSocket() {
            this.socket.onopen = () => {
                console.log("Connected to server");

                this.socket.send(JSON.stringify({
                    name: this.pseudo,
                    skinPath: this.skinPath
                }));
            };

            this.socket.onmessage = (e) => {
                console.log("Message recieved");

                // this.socket.send(JSON.parse(e.data));
                const data = JSON.parse(e.data);
                this.game.update(data);
            }
        }


    initInput() {
        window.addEventListener('keydown', (event) => {
            if (event.key == "z") {
                this.inputState.up = true;
            }
            if (event.key == "s") {
                this.inputState.down = true;
            }
            if (event.key == "q") {
                this.inputState.left = true;
            }
            if (event.key == "d") {
                this.inputState.right = true;
            }
            if (event.key == " ") {
                this.inputState.attack = true;
            }
            console.log(this.inputState);
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == "z") {
                this.inputState.up = false;
            }
            if (event.key == "s") {
                this.inputState.down = false;
            }
            if (event.key == "q") {
                this.inputState.left = false;
            }
            if (event.key == "d") {
                this.inputState.right = false;
            }
            if (event.key == " ") {
                this.inputState.attack = false;
            }
            console.log(this.inputState);
        });
    }

    startInputSender() {
        setInterval(() => {
            if(WebSocket.OPEN == this.socket.readyState) {
                this.socket.send(JSON.stringify({
                    type: "input",
                    input: this.inputState
                }));
            }

            else {
                return;
            }
        }, this.SERVER_INTERVAL);    
    }




    // === Main render loop ===
    loop(timestamp) {
    // On récupère les IDs des joueurs présents dans le jeu
    const playerIds = Object.keys(this.game.players);

    if (playerIds.length > 0) {
        playerIds.forEach(id => {
            const p = this.game.players[id];
            // On affiche le nom et la position avec 2 décimales pour la lisibilité
            console.log(`[VÉRIF] Joueur: ${p.name} | X: ${p.renderX.toFixed(2)} | Y: ${p.renderY.toFixed(2)}`);
        });
    } else {
        console.log("En attente de données joueurs...");
    }

    // Request the next frame
    requestAnimationFrame(this.loop);
}
}

console.log()
// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();