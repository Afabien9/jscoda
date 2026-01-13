const configTouches = {
  HAUT: "KeyW",
  BAS: "KeyS",
  GAUCHE: "KeyA",
  DROITE: "KeyD",
  ATTAQUE: "KeyE",
  MORT_TEST: "KeyR"
};

class Player {
  constructor(pseudo, x, y, spriteSheetSrc) {
      // Informations de base
      this.pseudo = pseudo;
      this.x = x;
      this.y = y;
      this.img = new Image();
      this.img.src = spriteSheetSrc;

      // Statistiques de combat (issues de test.js)
      this.hpMax = 100;
      this.hp = 100;
      this.ATK = 20;
      this.speed = 2;
      this.isAlive = true;
      this.direction = "Sud";

      // États d'animation
      this.moving = false;
      this.ATKing = false;
      this.dying = false;
      this.dead = false;

      // Configuration Spritesheet
      this.spriteSize = 64;
      this.spriteSizeATK = 128;

      // Animation de MARCHE
      this.currentWalkSpriteStep = 0;
      this.walkSpriteDuration = 4;
      this.walkSpriteIndex = 0;
      this.walkSpriteNumber = 9;

      // Animation d'ATTAQUE
      this.currentAttackSpriteStep = 0;
      this.attackSpriteDuration = 4;
      this.attackSpriteIndex = 0;
      this.attackSpriteNumber = 6;

      // Animation de MORT
      this.currentDyingSpriteStep = 0;
      this.dyingSpriteDuration = 6;
      this.dyingSpriteIndex = 0;
      this.dyingSpriteNumber = 6;
  }


  animate() {
      if (this.dead) return;

      //MORT
      if (this.dying) {
          this.currentDyingSpriteStep++;
          if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
              this.currentDyingSpriteStep = 0;
              this.dyingSpriteIndex++;
          }
          if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
              this.dyingSpriteIndex = this.dyingSpriteNumber - 1;
              this.dead = true;
          }
      } 
      //ATTAQUE
      else if (this.ATKing || this.attackSpriteIndex > 0) {
          this.currentAttackSpriteStep++;
          if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
              this.currentAttackSpriteStep = 0;
              this.attackSpriteIndex++;
          }
          if (this.attackSpriteIndex >= this.attackSpriteNumber) {
              this.attackSpriteIndex = 0;
              this.ATKing = false; 
          }
      } 
      //MARCHE
      else if (this.moving) {
          this.currentWalkSpriteStep++;
          if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
              this.currentWalkSpriteStep = 0;
              this.walkSpriteIndex++;
          }
          if (this.walkSpriteIndex >= this.walkSpriteNumber) {
              this.walkSpriteIndex = 0;
          }
      } 
      // IDLE
      else {
          this.walkSpriteIndex = 0;
      }
  }

  draw(ctx) {
      let sx, sy;
      let sWidth = this.spriteSize;
      let sHeight = this.spriteSize;
      let offsetX = 0; 
      let offsetY = 0;

      // MORT
      if (this.dying || this.dead) {
          sy = 20 * this.spriteSize;
          sx = this.dyingSpriteIndex * this.spriteSize;
      } 
      // ATTAQUE
      else if (this.ATKing || this.attackSpriteIndex > 0) {
          sWidth = this.spriteSizeATK;
          sHeight = this.spriteSizeATK;
          offsetX = -32; 
          offsetY = -32;

          const rows = { "North": 3456, "West": 3648, "Sud": 3840, "Est": 4032 };
          sy = rows[this.direction];
          sx = this.attackSpriteIndex * this.spriteSizeATK;
      } 
      //MARCHE
      else {
          const rows = { "North": 8, "West": 9, "Sud": 10, "Est": 11 };
          sy = rows[this.direction] * this.spriteSize;
          sx = this.walkSpriteIndex * this.spriteSize;
      }

      ctx.drawImage(
          this.img,
        sx, sy,             // Source X, Y
        sWidth, 
        sHeight,    // Source Largeur, Hauteur
        this.x + offsetX,   // Destination X avec décalage
        this.y + offsetY,   // Destination Y avec décalage
        sWidth, sHeight
      );
  }
}


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Player("alexis", 100, 100, "character-spritesheet.png");
const keys = {};

// Ecouteurs de touches
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === configTouches.ATTAQUE) player.ATKing = true;
  if (e.code === configTouches.MORT_TEST) player.dying = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

/**
* LOGIQUE DE MOUVEMENT
*/
function updateMovement() {
  if (player.dying || player.dead || player.ATKing) {
      player.moving = false;
      return;
  }

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

  // Collision bords canvas
  player.x = Math.max(0, Math.min(canvas.width - 64, player.x));
  player.y = Math.max(0, Math.min(canvas.height - 64, player.y));
}


function gameLoop() {
  updateMovement();
  player.animate();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Lancement après chargement de l'image
player.img.onload = () => {
  console.log("Jeu démarré");
  gameLoop();
};