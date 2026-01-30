// main.js
import Game from "./models/Game.js";
import GameView from "./views/GameView.js";
import GameController from "./controllers/GameController.js";

const gameModel = new Game();
const gameView = new GameView(gameModel);
const gameController = new GameController(gameModel, gameView);