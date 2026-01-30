import Player from "./Player.js";

// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
   "isRunning":true,
   "isOver":false,
   "timer":190.6000000000091,
   "players":{
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27":{
         "name":"blabla",
         "skinPath":"../TP6/assets/3.png",
         "position":[
            0.5600000000000003,
            0.17999999999999977
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":3,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      },
      "28ead291-fcea-4b41-a596-d3c876c49a53":{
         "name":"bloublou",
         "skinPath":"../TP6/assets/4.png",
         "position":[
            0.44,
            0.19
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":0,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      }
   }
};

export default class Game {
   constructor() {
      this.isRunning = false;
      this.isOver = false;
      this.timer = 0;
      this.players = {};
   }


   update(gameStateFromServer) {
      this.isRunning = gameStateFromServer.isRunning;
      this.isOver = gameStateFromServer.isOver;
      this.timer = gameStateFromServer.timer;

      const serverPlayerIds = Object.keys(gameStateFromServer.players);  // Recupe tous les UUID sous forme de liste

      serverPlayerIds.forEach(id => {
         const dataFromServer = gameStateFromServer.players[id];
         // dataFromServer.skinPath = "a" + dataFromServer.skinPath;
         dataFromServer.skinPath = dataFromServer.skinPath;

         if (this.players[id]) {
            this.players[id].update(dataFromServer);
         }
         else {
            const newPlayer = new Player(
               id,
               dataFromServer.name,
               dataFromServer.skinPath,
               dataFromServer.position,
            );

            this.players[id] = newPlayer;
            this.players[id].update(dataFromServer);

            console.log(`Nouveau joueur ajouté : ${dataFromServer.name} (ID: ${id})`);
         }
      });


      const localPlayersIds = Object.keys(this.players);

      localPlayersIds.forEach(id => {
         if (!gameStateFromServer.players[id]) {
            console.log(`Le joueur ${this.players[id].name} a quitté la partie.`)
            delete this.players[id];
         }
      });
   }
}

