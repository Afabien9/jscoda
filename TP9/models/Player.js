export default class Player {
  constructor(pseudo, x, y, skinPath) {
    this.pseudo = pseudo;
    this.x = x; this.y = y;
    this.prevX = x; this.prevY = y;
    this.renderX = x; this.renderY = y;
    this.skinPath = skinPath;
    this.hp = 100; this.hpMax = 100;
    this.level = 1;
    this.direction = "Sud";
    this.spriteSize = 64;
    this.spriteSizeATK = 193;

    this.walkSpriteIndex = 0;
    this.attackSpriteIndex = 0;
    this.deathSpriteIndex = 0;

    this.moving = false;
    this.ATKing = false;
    this.isAnimatingATK = false;
    this.dying = false;
    this.dead = false;
  }

  update(data) {
    if (!data) return;
    this.prevX = this.x; this.prevY = this.y;
    this.x = data.position[0] * 2000; 
    this.y = data.position[1] * 2000;
    this.hp = data.hp;
    this.level = data.lvl || 1;
    this.moving = data.isWalking || false;

    // Détection d'attaque pour forcer l'animation complète
    if (data.isAttacking && !this.isAnimatingATK) {
      this.isAnimatingATK = true;
      this.attackSpriteIndex = 0;
      this.ATKing = true;
    }

    this.dying = data.isDying || (this.hp <= 0);
    const directions = { 0: "Sud", 1: "West", 2: "North", 3: "Est" };
    if (data.direction !== undefined) this.direction = directions[data.direction] || "Sud";
  }

  interpolate(alpha) {
    this.renderX = this.prevX + (this.x - this.prevX) * alpha;
    this.renderY = this.prevY + (this.y - this.prevY) * alpha;
  }

  animate() {
    if (this.dying) {
      if (this.deathSpriteIndex < 5) this.deathSpriteIndex += 0.15;
      else this.dead = true;
      return;
    }

    if (this.isAnimatingATK) {
      this.attackSpriteIndex += 0.15; // Vitesse contrôlée pour 9 frames
      if (this.attackSpriteIndex >= 6) {
        this.attackSpriteIndex = 0;
        this.isAnimatingATK = false;
        this.ATKing = false;
      }
      this.walkSpriteIndex = 0;
    } else if (this.moving) {
      this.walkSpriteIndex = (this.walkSpriteIndex + 0.2) % 9;
    } else {
      this.walkSpriteIndex = 0;
    }
  }
}