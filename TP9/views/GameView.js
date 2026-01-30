export default class GameView {
  constructor(game) {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.rankListUI = document.getElementById("rank-list");
    this.killFeedUI = document.getElementById("kill-feed");
    this.game = game;
    this.worldSize = 2000;
    this.spriteScale = 2.5;
    
    this.bg = new Image();
    this.bg.src = "../image.png"; 
    
    this.skins = {};
    for (let i = 1; i <= 29; i++) {
      let img = new Image();
      let path = `assets/${i}.png`;
      img.src = `../${path}`;
      this.skins[path] = img;
    }

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scale = Math.min(this.canvas.width / this.worldSize, this.canvas.height / this.worldSize);
  }

  // Méthode pour afficher une notification de mort
  addKillNotification(victimName, killerName = "L'arène") {
    const msg = document.createElement("div");
    msg.className = "kill-msg";
    msg.innerHTML = `<span class="victim">${victimName}</span> a succombé face à <span class="killer">${killerName}</span>`;
    this.killFeedUI.appendChild(msg);
    setTimeout(() => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 500);
    }, 4000);
  }

  render(alpha) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.imageSmoothingEnabled = false;

    const tx = (this.canvas.width - this.worldSize * this.scale) / 2;
    const ty = (this.canvas.height - this.worldSize * this.scale) / 2;
    this.ctx.translate(tx, ty);
    this.ctx.scale(this.scale, this.scale);

    if (this.bg.complete) this.ctx.drawImage(this.bg, 0, 0, this.worldSize, this.worldSize);

    for (let id in this.game.players) {
      let p = this.game.players[id];
      let img = this.skins[p.skinPath];
      
      if (img && img.complete) {
        p.interpolate(alpha);
        if (this.game.isRunning) p.animate();

        let sx, sy, sWidth, sHeight;
        let offsetX = 0, offsetY = 0;

        if (p.dying || p.dead) {
          sWidth = p.spriteSize; sHeight = p.spriteSize;
          sy = 20 * p.spriteSize;
          sx = Math.floor(p.deathSpriteIndex) * p.spriteSize;
        } else if (p.ATKing) {
          sWidth = p.spriteSizeATK; sHeight = p.spriteSizeATK;
          const rows = { North: 3840, West: 4032, Sud: 3456, Est: 3648 };
          sy = rows[p.direction] || 3840;
          sx = Math.floor(p.attackSpriteIndex) * p.spriteSizeATK;
          offsetX = (p.spriteSize - p.spriteSizeATK) / 2;
          offsetY = (p.spriteSize - p.spriteSizeATK) / 2;
        } else {
          sWidth = p.spriteSize; sHeight = p.spriteSize;
          const rows = { North: 10, West: 11, Sud: 8, Est: 9 };
          sy = (rows[p.direction] || 10) * p.spriteSize;
          sx = Math.floor(p.walkSpriteIndex) * p.spriteSize;
        }

        this.ctx.drawImage(
          img, sx, sy, sWidth, sHeight,
          p.renderX + (offsetX * this.spriteScale), 
          p.renderY + (offsetY * this.spriteScale), 
          sWidth * this.spriteScale, sHeight * this.spriteScale
        );

        this.drawPlayerUI(p);
      }
    }
    this.ctx.restore();
    this.updateLeaderboardUI();
  }

  drawPlayerUI(p) {
    const barWidth = 80; // Plus large
    const barHeight = 10; // Plus épais
    const centerX = p.renderX + (p.spriteSize * this.spriteScale) / 2;

    // Pseudo Ombré
    this.ctx.font = "bold 20px Rajdhani";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(p.pseudo, centerX + 1, p.renderY - 24);
    this.ctx.fillStyle = "white";
    this.ctx.fillText(p.pseudo, centerX, p.renderY - 25);

    // Barre de vie
    this.ctx.fillStyle = "rgba(0,0,0,0.6)";
    this.ctx.fillRect(centerX - barWidth/2, p.renderY - 15, barWidth, barHeight);
    
    const healthPercent = Math.max(0, p.hp / p.hpMax);
    this.ctx.fillStyle = healthPercent > 0.3 ? "#00ff88" : "#ff4d4d";
    this.ctx.fillRect(centerX - barWidth/2, p.renderY - 15, barWidth * healthPercent, barHeight);
  }

  updateLeaderboardUI() {
    const players = this.game.getLeaderboard();
    this.rankListUI.innerHTML = players.map((p, i) => `
      <div class="rank-item">
        <span>#${i+1} ${p.pseudo}</span>
        <span class="rank-lvl">Lvl ${p.level}</span>
      </div>
    `).join('');
  }
}