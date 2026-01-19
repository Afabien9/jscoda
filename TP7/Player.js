// Configuration des touches clavier
const configTouches = {
  HAUT: "KeyW",
  BAS: "KeyS",
  GAUCHE: "KeyA",
  DROITE: "KeyD",
  ATTAQUE: "KeyE",
  MORT_TEST: "KeyR",
  DEGATS_TEST: "KeyH",
};

// Classe pour gérer le joueur
class Player {
  constructor(pseudo, x, y, spriteSheetSrc) {
    this.pseudo = pseudo;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = spriteSheetSrc;

    this.hpMax = 100;
    this.hp = 100;
    this.speed = 4;
    this.direction = "Sud";

    this.moving = false;
    this.ATKing = false;
    this.dying = false;
    this.dead = false;
    this.shouldBeRemoved = false;

    this.canAttack = true;
    this.attackCooldown = 500;
    this.cooldownTimer = 0;

    this.spriteSize = 64;
    this.spriteSizeATK = 193;

    this.walkSpriteIndex = 0;
    this.walkSpriteNumber = 9;
    this.currentWalkSpriteStep = 0;
    this.walkSpriteDuration = 4;

    this.attackSpriteIndex = 0;
    this.attackSpriteNumber = 6;
    this.currentAttackSpriteStep = 0;
    this.attackSpriteDuration = 4;

    this.deathSpriteIndex = 0;
    this.deathSpriteNumber = 6;
    this.currentDeathSpriteStep = 0;
    this.deathSpriteDuration = 10;
  }

   
update(data) {
  // Synchronise les positions reçues du serveur
  this.x = data.position[0] * 400; 
  this.y = data.position[1] * 400;
  

  this.hp = data.hp;
  this.moving = data.isWalking;
  this.ATKing = data.isAttacking;
  this.dying = data.isDying;

  // Mapping des directions
  const directions = { 0: "Sud", 1: "West", 2: "North", 3: "Est" };
  if (data.direction !== undefined) {
    this.direction = directions[data.direction];
  }
}
  

  // Gère les animations du joueur
  animate() {
    if (this.shouldBeRemoved) return;

    if (this.dying && !this.dead) {
      this.currentDeathSpriteStep++;
      if (this.currentDeathSpriteStep >= this.deathSpriteDuration) {
        this.currentDeathSpriteStep = 0;
        this.deathSpriteIndex++;
      }

      if (this.deathSpriteIndex >= this.deathSpriteNumber) {
        this.deathSpriteIndex = this.deathSpriteNumber - 1;
        this.dead = true;

        setTimeout(() => {
          this.shouldBeRemoved = true;
        }, 10);
      }
      return;
    }

    if (this.dead) return;

    if (this.ATKing) {
      this.currentAttackSpriteStep++;
      if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
        this.currentAttackSpriteStep = 0;
        this.attackSpriteIndex++;
      }
      if (this.attackSpriteIndex >= this.attackSpriteNumber) {
        this.attackSpriteIndex = 0;
        this.ATKing = false;
      }
    } else if (this.moving) {
      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber)
        this.walkSpriteIndex = 0;
    } else {
      this.walkSpriteIndex = 0;
    }
  }

  // Dessine le joueur sur le canvas
  draw(ctx) {
    if (this.shouldBeRemoved) return;

    let sx,
      sy,
      sWidth = this.spriteSize,
      sHeight = this.spriteSize;
    let offsetX = 0,
      offsetY = 0;

    if (this.dying || this.dead) {
      sy = 20 * this.spriteSize;
      sx = this.deathSpriteIndex * this.spriteSize;
    } else if (this.ATKing) {
      sWidth = this.spriteSizeATK;
      sHeight = this.spriteSizeATK;
      offsetX = (this.spriteSize - this.spriteSizeATK) / 2;
      offsetY = (this.spriteSize - this.spriteSizeATK) / 2;
      const rows = { North: 3456, West: 3648, Sud: 3840, Est: 4032 };
      sy = rows[this.direction];
      sx = this.attackSpriteIndex * this.spriteSizeATK;
    } else {
      const rows = { North: 8, West: 9, Sud: 10, Est: 11 };
      sy = rows[this.direction] * this.spriteSize;
      sx = this.walkSpriteIndex * this.spriteSize;
    }

    ctx.drawImage(
      this.img,
      sx,
      sy,
      sWidth,
      sHeight,
      this.x + offsetX,
      this.y + offsetY,
      sWidth,
      sHeight
    );
  }

  // Dessine le pseudo et la barre de vie
  drawUI(ctx) {
    if (this.dying || this.dead || this.shouldBeRemoved) return;

    const barWidth = 50;
    const barHeight = 6;
    const offsetX = this.spriteSize / 2 - barWidth / 2;

    ctx.fillStyle = "white";
    ctx.font = "bold 12px Rajdhani, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(this.pseudo, this.x + this.spriteSize / 2, this.y - 25);

    ctx.fillStyle = "red";
    ctx.fillRect(this.x + offsetX, this.y - 12, barWidth, barHeight);
    const healthPercent = Math.max(0, this.hp / this.hpMax);
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(
      this.x + offsetX,
      this.y - 12,
      barWidth * healthPercent,
      barHeight
    );
    if (!this.canAttack) {
      const cdOffsetY = -18; 
      const elapsed = Date.now() - this.cooldownTimer;
      const cdPercent = Math.min(elapsed / this.attackCooldown, 1);

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.x + offsetX, this.y + cdOffsetY, barWidth, 2);

      ctx.fillStyle = "#f1c40f";
      ctx.fillRect(
        this.x + offsetX,
        this.y + cdOffsetY,
        barWidth * cdPercent,
        2
      );
    }
  }
}

// Récupère les éléments du canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const savedPseudo = localStorage.getItem("playerPseudo") || "Inconnu";
const savedSkin = localStorage.getItem("skinPath") || "assets/1.png";

let player = new Player(savedPseudo, 100, 100, savedSkin);
const keys = {};

// Écoute les touches appuyées
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (!player || player.dying || player.dead) return;

  if (e.code === configTouches.ATTAQUE && player.canAttack) {
    player.ATKing = true;
    player.canAttack = false;
    player.cooldownTimer = Date.now();
    setTimeout(() => {
      if (player) player.canAttack = true;
    }, player.attackCooldown);
  }

  if (e.code === configTouches.DEGATS_TEST) {
    player.hp -= 20;
    if (player.hp <= 0) {
      player.hp = 0;
      player.dying = true;
    }
  }
  if (e.code === configTouches.MORT_TEST) {
    player.hp = 0;
    player.dying = true;
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function updateMovement() {
  if (!player || player.ATKing || player.dying || player.dead) return;
  player.moving = false;

  if (keys[configTouches.HAUT]) {
    player.y -= player.speed;
    player.direction = "North";
    player.moving = true;
  } else if (keys[configTouches.BAS]) {
    player.y += player.speed;
    player.direction = "Sud";
    player.moving = true;
  }
  if (keys[configTouches.GAUCHE]) {
    player.x -= player.speed;
    player.direction = "West";
    player.moving = true;
  } else if (keys[configTouches.DROITE]) {
    player.x += player.speed;
    player.direction = "Est";
    player.moving = true;
  }

  player.x = Math.max(0, Math.min(canvas.width - 64, player.x));
  player.y = Math.max(0, Math.min(canvas.height - 64, player.y));
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (player) {
    updateMovement();
    player.animate();
    player.draw(ctx);
    player.drawUI(ctx);

    if (player.shouldBeRemoved) {
      player = null;
      console.log("Joueur retiré de la scène.");
    }
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();