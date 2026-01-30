import Player from "./Player.js";

export default class Game {
  constructor() {
    this.players = {};
    this.timer = 0;
    this.isRunning = false;
  }

  update(serverState) {
    this.timer = serverState.timer;
    this.isRunning = serverState.isRunning;
    const serverPlayers = serverState.players;

    for (let id in serverPlayers) {
      const pData = serverPlayers[id];
      if (!this.players[id]) {
        this.players[id] = new Player(pData.name, pData.position[0]*2000, pData.position[1]*2000, pData.skinPath);
      }
      this.players[id].update(pData);
    }

    // Nettoyage
    Object.keys(this.players).forEach(id => {
      if (!serverPlayers[id]) delete this.players[id];
    });
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((a, b) => b.level - a.level || b.hp - a.hp)
      .slice(0, 10);
  }
}