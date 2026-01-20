
const backendData = {
   "isRunning":true,
   "isOver":false,
   "timer":190.6000000000091,
   "players":{
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27":{
         "name":"blabla",
         "skinPath":"./assets/3.png",
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
         "skinPath":"./assets/4.png",
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

class Game {
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

    const serverPlayers = gameStateFromServer.players;

    for (let id in serverPlayers) {
      const pData = serverPlayers[id];
      if (!this.players[id]) {
        console.log("Nouveau joueur détecté : " + pData.name);
        // Utilisation de la classe Player
        this.players[id] = new Player(
          pData.name, 
          pData.position[0] * 400, 
          pData.position[1] * 400, 
          pData.skinPath
        );
      } else {
        this.players[id].update(pData);
      }
    }

    for (let id in this.players) {
      if (!serverPlayers[id]) {
        console.log("Suppression du joueur ID : " + id);
        delete this.players[id];
      }
    }
  }
}


const myGame = new Game();

//Test d'ajout initial
console.log("Ajout de nouveaux joueurs");
myGame.update(backendData);
console.log("Nombre de joueurs attendus (2) :", Object.keys(myGame.players).length);

//Test de mise à jour des métadonnées de la partie
console.log("Mise à jour des métadonnées");
const modifiedData1 = JSON.parse(JSON.stringify(backendData)); 
modifiedData1.timer = 150.5;
modifiedData1.isOver = true;

myGame.update(modifiedData1);
console.log("Timer mis à jour (150.5) :", myGame.timer);
console.log("Partie terminée (true) :", myGame.isOver);

//Test de mise à jour des stats des joueurs
console.log("Mise à jour des stats (HP de blabla)");
const player1Id = "3cd71bbb-6a6b-4d4e-80e3-107130328a27";
modifiedData1.players[player1Id].hp = 50; 
modifiedData1.players[player1Id].position = [0.1, 0.1]; 

myGame.update(modifiedData1);
console.log("HP de blabla (50) :", myGame.players[player1Id].hp);
console.log("Position X de blabla (40) :", myGame.players[player1Id].x);

//Test de suppression de joueur
console.log("Suppression d'un joueur");
const modifiedData2 = JSON.parse(JSON.stringify(modifiedData1));
delete modifiedData2.players["28ead291-fcea-4b41-a596-d3c876c49a53"];

myGame.update(modifiedData2);
console.log("Nombre de joueurs restants (1) :", Object.keys(myGame.players).length);
console.log("bloublou existe toujours ? :", !!myGame.players["28ead291-fcea-4b41-a596-d3c876c49a53"]);

console.log("backendata:", backendData);
