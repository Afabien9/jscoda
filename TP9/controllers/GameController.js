export default class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.SERVER_INTERVAL = 1000 / 20;

    this.inputState = { up: false, down: false, left: false, right: false, attack: false };
    
    this.initSocket();
    this.initKeyboard();
    
    setInterval(() => this.syncInputs(), this.SERVER_INTERVAL);
    requestAnimationFrame((ts) => this.loop(ts));
  }

  initSocket() {
    const url = localStorage.getItem("playerServerUrl") || "ws://localhost:8001/ws";
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({
        name: localStorage.getItem("playerPseudo"),
        skinPath: localStorage.getItem("skinPath")
      }));
    };
    this.socket.onmessage = (e) => {
      this.lastTick = performance.now();
      this.model.update(JSON.parse(e.data));
    };
  }

  initKeyboard() {
    const map = { KeyW: "up", KeyS: "down", KeyA: "left", KeyD: "right", KeyM: "attack", Space: "attack" };
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      if (e.shiftKey) { // Combo Shift
        this.inputState.up = true; this.inputState.right = true; this.inputState.attack = true;
      } else if (map[e.code]) {
        this.inputState[map[e.code]] = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (map[e.code]) this.inputState[map[e.code]] = false;
      if (!e.shiftKey && (e.code === "ShiftLeft" || e.code === "ShiftRight")) {
        this.inputState.up = false; this.inputState.right = false; this.inputState.attack = false;
      }
    });
  }

  syncInputs() {
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify({ type: "input", input: this.inputState }));
    }
  }

  loop(ts) {
    const alpha = Math.min(1, (ts - this.lastTick) / this.SERVER_INTERVAL);
    this.view.render(alpha);
    requestAnimationFrame((t) => this.loop(t));
  }
}