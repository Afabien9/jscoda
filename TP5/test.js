class Player {
    constructor(pseudo, skin, pos) {
      this.pseudo = pseudo;
      this.skin = skin;
      this.x = pos[0];
      this.y = pos[1];
      this.hpMax = 100;
      this.hp = 100;
      this.ATK = 20;
      this.speedATK = 1.2;
      this.speed = 1.5;
      this.lvl = 1;
      this.previouslvl = 1;
      this.cooldownATK = 2000;
      this.maxCooldownATK = 2000;
      this.isAlive = true;
      this.regenHP = 0.2;
      this.direction = "Sud";
      this.ATKing = false;
      this.moving = false;
      this.dying = false;
  
      this.currentWalkSpriteStep = 0;
      this.walkSpriteDuration = 4;
      this.walkSpriteIndex = 0;
      this.walkSpriteNumber = 9;
  
      this.currentAttackSpriteStep = 0;
      this.attackSpriteDuration = 4;
      this.attackSpriteIndex = 0;
      this.attackSpriteNumber = 6;
  
      this.currentDyingSpriteStep = 0;
      this.dyingSpriteDuration = 6;
      this.dyingSpriteIndex = 0;
      this.dyingSpriteNumber = 6;
    }
  
    update(data) {
      this.x = data.pos[0];
      this.y = data.pos[1];
      this.hpMax = data.hpMax;
      this.hp = data.hp;
      this.ATK = data.ATK;
      this.speedATK = data.speedATK;
      this.speed = data.speed;
      this.previouslvl = this.lvl;
      this.lvl = data.lvl;
      this.cooldownATK = data.cooldownATK;
      this.maxCooldownATK = data.maxCooldownATK;
      this.isAlive = data.isAlive;
      this.regenHP = data.regenHP;
      this.direction = data.direction;
      this.ATKing = data.ATKing;
      this.canATK = data.canATK;
      this.moving = data.moving;
      this.dying = data.dying;
    }
  
    animate() {
      if (this.moving) {
        this.currentAttackSpriteStep = 0;
        this.attackSpriteIndex = 0;
  
        this.currentWalkSpriteStep++;
        if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
          this.currentWalkSpriteStep = 0;
          this.walkSpriteIndex++;
        }
        if (this.walkSpriteIndex >= this.walkSpriteNumber) {
          this.walkSpriteIndex = 0;
        }
      } else if (
        this.ATKing ||
        this.currentAttackSpriteStep > 0 ||
        this.attackSpriteIndex > 0
      ) {
        this.walkSpriteIndex = 0;
        this.currentWalkSpriteStep = 0;
  
        this.currentAttackSpriteStep++;
        if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
          this.currentAttackSpriteStep = 0;
          this.attackSpriteIndex++;
        }
        if (this.attackSpriteIndex >= this.attackSpriteNumber) {
          this.attackSpriteIndex = 0;
        }
      } else if (this.dying) {
        this.currentDyingSpriteStep++;
        if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
          this.currentDyingSpriteStep = 0;
          this.dyingSpriteIndex++;
        }
        if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
          this.dead = true;
        }
      } else {
        this.walkSpriteIndex = 0;
      }
      console.log(
        "**************************************************************************"
      );
      console.log("Walk animation : \n");
      console.log("isWalking : " + this.moving);
      console.log("walkSpriteIndex : " + this.walkSpriteIndex);
      console.log("Walk current sprite step : " + this.currentWalkSpriteStep);
  
      console.log("ATK animation : \n");
      console.log("isATKing : " + this.ATKing);
      console.log("attackSpriteIndex : " + this.attackSpriteIndex);
  
      console.log("Dying animation : \n");
      console.log("isDying : " + this.dying);
      console.log("dyingSpriteIndex : " + this.dyingSpriteIndex);
      console.log("Dying current sprite step : " + this.currentDyingSpriteStep);
      console.log(
        "**************************************************************************"
      );
    }
  
    // Dans la classe Player pas script car script n'a pas les coordonées et tout ce qu'il faut
    draw(ctx, img) {
      const spriteSize = 64;
      const spriteSizeATK = 128;
  
      let sx, sy;
      let sWidth = spriteSize;
      let sHeight = spriteSize;
      let middle = 0;
  
      if (this.moving) {
        if (this.direction === "North") {
          sy = 8 * spriteSize;
          sx = this.walkSpriteIndex * spriteSize;
        } else if (this.direction === "West") {
          sy = 9 * spriteSize;
          sx = this.walkSpriteIndex * spriteSize;
        } else if (this.direction === "Sud") {
          sy = 10 * spriteSize;
          sx = this.walkSpriteIndex * spriteSize;
        } else if (this.direction === "Est") {
          sy = 11 * spriteSize;
          sx = this.walkSpriteIndex * spriteSize;
        }
      } else if (
        this.ATKing ||
        this.currentAttackSpriteStep > 0 ||
        this.attackSpriteIndex > 0
      ) {
        sWidth = spriteSizeATK;
        sHeight = spriteSizeATK;
        middle = 64;
  
        if (this.direction === "North") {
          sy = 57 * spriteSize;
          sx = this.attackSpriteIndex * spriteSizeATK;
        } else if (this.direction === "West") {
          sy = 58 * spriteSize;
          sx = this.attackSpriteIndex * spriteSizeATK;
        } else if (this.direction === "Sud") {
          sy = 59 * spriteSize;
          sx = this.attackSpriteIndex * spriteSizeATK;
        } else if (this.direction === "Est") {
          sy = 60 * spriteSize;
          sx = this.attackSpriteIndex * spriteSizeATK;
        }
      } else if (this.dying) {
        sy = 20 * spriteSize;
        sx = this.dyingSpriteIndex * spriteSize;
      } else {
        if (this.direction === "North") {
          sy = 8 * spriteSize;
        } else if (this.direction === "West") {
          sy = 9 * spriteSize;
        } else if (this.direction === "Sud") {
          sy = 10 * spriteSize;
        } else if (this.direction === "Est") {
          sy = 11 * spriteSize;
        }
        sx = 0;
      }
  
      ctx.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        this.x - middle,
        this.y - middle,
        sWidth,
        sHeight
      );
    }
  }
  const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "character-spritesheet.png";

const centerX = canvas.width / 2 - 32;
const centerY = canvas.height / 2 - 32;

const p1 = new Player("Enzo", "Skin1", [centerX, centerY]);

p1.moving = false;
p1.dying = false;
p1.ATKing = false;

img.onload = () => {
  animate();
};

window.addEventListener("keydown", (e) => {
  if (e.key === "z") {
    p1.direction = "North";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "q") {
    p1.direction = "West";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "d") {
    p1.direction = "Est";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "s") {
    p1.direction = "Sud";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "e") {
    p1.ATKing = true;
    window.addEventListener("keyup", (e) => {
      p1.ATKing = false;
    });
  } else if (e.key === "r") {
    p1.dying = true;
    window.addEventListener("keyup", (e) => {
      p1.dying = false;
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  p1.animate();

  p1.draw(ctx, img);

  requestAnimationFrame(animate);
}


 