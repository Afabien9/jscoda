class GameController {
  constructor() {
    this.SERVER_TICK_RATE = 20;
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;
    this.MAP_SIZE = 400;
    this.MARGIN = 10;

    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);

    this.game = new Game();

    this.name = localStorage.getItem("playerPseudo") || "Inconnu";
    this.serverUrl =
      localStorage.getItem("playerServerUrl") || "ws://localhost:8000/ws";
    this.spritePath = localStorage.getItem("skinPath") || "../assets/1.png";

    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    console.log("Exo 2 : Connexion à", this.serverUrl);
    this.socket = new WebSocket(this.serverUrl);

    this.initSocket();
    this.initInput();
    this.startInputSender();
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Exo 3 : WebSocket Connecté !");
      const identification = { name: this.name, skinPath: this.spritePath };
      this.socket.send(JSON.stringify(identification));
    };

    this.socket.onmessage = (event) => {
      const gameStateFromServer = JSON.parse(event.data);
      this.game.update(gameStateFromServer);
    };

    this.socket.onerror = (error) => console.error("Erreur WebSocket", error);
  }

  initInput() {
    const updateKey = (code, isPressed) => {
      if (code === "KeyW") this.inputState.up = isPressed;
      if (code === "KeyS") this.inputState.down = isPressed;
      if (code === "KeyA") this.inputState.left = isPressed;
      if (code === "KeyD") this.inputState.right = isPressed;
      if (code === "KeyE") this.inputState.attack = isPressed;
    };

    window.addEventListener("keydown", (e) => updateKey(e.code, true));
    window.addEventListener("keyup", (e) => updateKey(e.code, false));
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        const players = Object.values(this.game.players);
        let me = players.find((p) => p.name === this.name) || players[0];

        let filteredInput = { ...this.inputState };

        if (me) {
          if (me.y <= this.MARGIN) filteredInput.up = false;
          if (me.y >= this.MAP_SIZE - this.MARGIN) filteredInput.down = false;
          if (me.x <= this.MARGIN) filteredInput.left = false;
          if (me.x >= this.MAP_SIZE - this.MARGIN) filteredInput.right = false;
        }

        this.socket.send(
          JSON.stringify({
            type: "input",
            input: filteredInput,
          })
        );
      }
    }, this.SERVER_INTERVAL);
  }

  loop(timestamp) {
    requestAnimationFrame(this.loop);

    const players = Object.values(this.game.players);
    let me = players.find((p) => p.name === this.name) || players[0];

    if (me) {
      const isMoving =
        this.inputState.up ||
        this.inputState.down ||
        this.inputState.left ||
        this.inputState.right;
      if (isMoving) {
        console.log(
          `[Position Sync] ${me.name} | X: ${me.x.toFixed(
            0
          )}, Y: ${me.y.toFixed(0)}`
        );
      }
    }
  }
}

new GameController();
