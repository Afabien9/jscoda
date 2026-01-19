const configTouches = {
  P1: { HAUT: "KeyW", BAS: "KeyS", GAUCHE: "KeyA", DROITE: "KeyD", ATTAQUE: "KeyE" },
  P2: { HAUT: "ArrowUp", BAS: "ArrowDown", GAUCHE: "ArrowLeft", DROITE: "ArrowRight", ATTAQUE: "Enter" }
};

class Player {
  constructor(pseudo, x, y, spriteSheetSrc, controls) {
    this.pseudo = pseudo;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = spriteSheetSrc;
    this.controls = controls;

    this.hpMax = 100;
    this.hp = 100;
    this.speed = 4;
    this.direction = "Sud";

    this.canAttack = true;
    this.attackCooldown = 1000;
    this.cooldownTimer = 0;

    this.moving = false;
    this.ATKing = false;
    this.dying = false;
    this.dead = false;

    this.spriteSize = 64;
    this.spriteSizeATK = 193;

    this.walkSpriteIndex = 0;
    this.walkSpriteNumber = 9;
    this.attackSpriteIndex = 0;
    this.attackSpriteNumber = 6;
    this.dyingSpriteIndex = 0;
    this.dyingSpriteNumber = 6;
    
    this.animStep = 0;
    this.animFreq = 5;
  }

  animate() {
    if (this.dead) return;
    this.animStep++;
    if (this.animStep >= this.animFreq) {
      this.animStep = 0;
      if (this.dying) {
        this.dyingSpriteIndex++;
        if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
          this.dyingSpriteIndex = this.dyingSpriteNumber - 1;
          this.dead = true;
        }
      } else if (this.ATKing) {
        this.attackSpriteIndex++;
        if (this.attackSpriteIndex >= this.attackSpriteNumber) {
          this.attackSpriteIndex = 0;
          this.ATKing = false;
        }
      } else if (this.moving) {
        this.walkSpriteIndex = (this.walkSpriteIndex + 1) % this.walkSpriteNumber;
      } else {
        this.walkSpriteIndex = 0;
      }
    }
  }

  draw(ctx) {
    let sx, sy, sWidth = this.spriteSize, sHeight = this.spriteSize;
    let offsetX = 0, offsetY = 0;

    if (this.dying || this.dead) {
      sy = 20 * this.spriteSize;
      sx = this.dyingSpriteIndex * this.spriteSize;
    } else if (this.ATKing || this.attackSpriteIndex > 0) {
      sWidth = sHeight = this.spriteSizeATK;
      offsetX = offsetY = (this.spriteSize - this.spriteSizeATK) / 2;
      const rows = { North: 3456, West: 3648, Sud: 3840, Est: 4032 };
      sy = rows[this.direction];
      sx = this.attackSpriteIndex * this.spriteSizeATK;
    } else {
      const rows = { North: 8, West: 9, Sud: 10, Est: 11 };
      sy = rows[this.direction] * this.spriteSize;
      sx = this.walkSpriteIndex * this.spriteSize;
    }

    ctx.drawImage(this.img, sx, sy, sWidth, sHeight, this.x + offsetX, this.y + offsetY, sWidth, sHeight);
  }

  drawUI(ctx) {
    const barWidth = 60;
    const barHeight = 7;
    const uiX = this.x + (this.spriteSize / 2) - (barWidth / 2);
    
    ctx.fillStyle = "white";
    ctx.font = "bold 12px Rajdhani, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(this.pseudo, this.x + this.spriteSize/2, this.y - 30);

    // Vie
    ctx.fillStyle = "red";
    ctx.fillRect(uiX, this.y - 15, barWidth, barHeight);
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(uiX, this.y - 15, barWidth * (this.hp / this.hpMax), barHeight);

    // Cooldown
    if (!this.canAttack) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(uiX, this.y - 22, barWidth, 4);
      const elapsed = Date.now() - this.cooldownTimer;
      ctx.fillStyle = "#f1c40f"; 
      ctx.fillRect(uiX, this.y - 22, barWidth * Math.min(elapsed / this.attackCooldown, 1), 4);
    }
  }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const keys = {};

const player1 = new Player(localStorage.getItem("p1_pseudo") || "J1", 150, 200, localStorage.getItem("p1_skin") || "spritesheets/1.png", configTouches.P1);
const player2 = new Player(localStorage.getItem("p2_pseudo") || "J2", 600, 200, localStorage.getItem("p2_skin") || "spritesheets/2.png", configTouches.P2);
const players = [player1, player2];

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  players.forEach(p => {
    if (e.code === p.controls.ATTAQUE && p.canAttack && !p.dying && !p.dead) {
      p.ATKing = true;
      p.canAttack = false;
      p.cooldownTimer = Date.now();
      const cible = (p === player1) ? player2 : player1;
      const dist = Math.sqrt(Math.pow(p.x - cible.x, 2) + Math.pow(p.y - cible.y, 2));
      if (dist < 70 && !cible.dead) {
        setTimeout(() => { if(!p.dying) { cible.hp -= 20; if (cible.hp <= 0) { cible.hp = 0; cible.dying = true; } } }, 200);
      }
      setTimeout(() => { p.canAttack = true; }, p.attackCooldown);
    }
  });
});

window.addEventListener("keyup", (e) => { keys[e.code] = false; });

function gameLoop() {
  players.forEach(p => {
    if (p.dying || p.dead || p.ATKing) { p.moving = false; return; }
    p.moving = false;
    if (keys[p.controls.HAUT]) { p.y -= p.speed; p.direction = "North"; p.moving = true; }
    else if (keys[p.controls.BAS]) { p.y += p.speed; p.direction = "Sud"; p.moving = true; }
    if (keys[p.controls.GAUCHE]) { p.x -= p.speed; p.direction = "West"; p.moving = true; }
    else if (keys[p.controls.DROITE]) { p.x += p.speed; p.direction = "Est"; p.moving = true; }
    p.x = Math.max(0, Math.min(canvas.width - 64, p.x));
    p.y = Math.max(0, Math.min(canvas.height - 64, p.y));
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach(p => { p.animate(); p.draw(ctx); p.drawUI(ctx); });
  requestAnimationFrame(gameLoop);
}

let loaded = 0;
players.forEach(p => p.img.onload = () => { if(++loaded === 2) gameLoop(); });