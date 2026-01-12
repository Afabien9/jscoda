class Player {
  constructor(pseudo, skin, positionx, positiony) {
    this.pseudo = pseudo;
    this.skin = skin;
    this.positionx = positionx;
    this.positiony = positiony;

    this.hp = 10;
    this.hpMax = 100
    this.attack = 20;
    this.level = 1;
    this.speed = 1;
    this.cooldown = 0;
    this.cooldownMax = 1;
    this.regen = 1;
    this.isAlive = true;
    this.defend = 1
  }
  update(updateData){
    this.hp = hp;
    this.hpMax = hpMax
    this.attack = attack;
    this.level = level;
    this.speed = speed;
    this.cooldown = cooldown;
    this.cooldownMax = cooldownMax;
    this.regen = regen;
    this.isAlive = true;
  }

  updateTakePlayer(updateData) {
    if (!this.isAlive) {
      console.log(
        `${this.pseudo} est déjà KO et ne peut plus subir de dégâts.`
      );
      return;
    }

    this.hp -= updateData;
    console.log(
      `${this.pseudo} subit -${updateData} dégâts. PV restants : ${this.hp}`
    );

    if (this.hp <= 0) {
      this.hp = 0;
      this.isAlive = false;
      console.log(`--- ${this.pseudo} est mort au combat ! ---`);
    }

    if (this.isAlive) {
      this.level += 1;
      this.hp += 5;
      this.attack = this.attack*(1.2);
      console.log(
        `Félicitations ! ${this.pseudo} passe au niveau ${this.level}. PV augmentés ! `,
      );
      console.log("hp", player1.hp)
console.log("attack", player1.attack.toFixed(2))
console.log("level", player1.level)
console.log("speed", player1.speed)
console.log("regen", player1.regen)
console.log("isalive", player1.isAlive)
console.log("defend", player1.defend)
    }
  }
}


  
console.log("=== Test de la classe Player ===");
  
const player1 = new Player("AFB", "Armure en or");


console.log("Joueur créé :", player1);

player1.updateTakePlayer(player1.defend);

player1.updateTakePlayer(player1.defend);

player1.updateTakePlayer(player1.defend);

player1.updateTakePlayer(player1.cooldownMax);

console.log("=== Test de la classe Player ===");

console.log("position", player1.positionx, "______", player1.positiony)


console.log("État final :", player1);

console.log("cooldown", player1.cooldownMax)