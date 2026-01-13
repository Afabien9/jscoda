class Player {
  constructor(pseudo, skin, positionx, positiony) {
    
    this.pseudo = pseudo;
    this.skin = skin;
    this.positionx = positionx;
    this.positiony = positiony;

    
    this.isDying = false;
    this.isWalking = false;
    this.isAttacking = false;
    
    
    this.walkSpriteDuration = 2;   
    this.WalkSpriteIndex = 0;     
    this.WalkSpritNumber = 9;     
    this.currentWalkSpriteStep = 0;

    
    this.attackSpritDuration = 2;
    this.attackSpritIndex = 0;
    this.attackSpritNumber = 6;
    this.currentAttackPlayerSprite = 0;

    
    this.DyingSpritDuration = 2;
    this.DyingSpritIndex = 0;
    this.DyingSpritNumber = 6;
    this.currentDyingPlayerSprite = 0;
  }

  
  update(updateData) {
    this.hp = updateData.hp;
    this.hpMax = updateData.hpMax;
    this.attack = updateData.attack;
    this.level = updateData.level;
    this.speed = updateData.speed;
    this.cooldown = updateData.cooldown;
    this.cooldownMax = updateData.cooldownMax;
    this.heal = updateData.heal;
    this.isDying = updateData.isAlive;
    this.isWalking = updateData.isWalking;
    this.isattacking = updateData.isAttacking;
    this.walkSpriteDuration= updateData.walkSpriteDuration;
    this.WalkSpriteIndex = updateData.WalkSpriteIndex;
    this.WalkSpritNumber = updateData.WalkSpritNumber;
    this.currentWalkSpriteStep = updateData.currentWalkSpriteStep
    this.currentAttackPlayerSprite
    this.attackSpritDuration
    this.attackSpritIndex
    this.attackSpritNumber
  }


  animate() {
    let animationFinished = false;

    // Logique des états
    if (this.isDying) {
      this.currentDyingPlayerSprite++;
      if (this.currentDyingPlayerSprite >= this.DyingSpritDuration) {
        this.currentDyingPlayerSprite = 0;
        this.DyingSpritIndex++;
      }
      if (this.DyingSpritIndex >= this.DyingSpritNumber) {
        this.DyingSpritIndex = this.DyingSpritNumber - 1; 
        animationFinished = true; 
      }
    } 
    // Logique attaque
    else if (this.isAttacking) {
      this.currentAttackPlayerSprite++;
      if (this.currentAttackPlayerSprite >= this.attackSpritDuration) {
        this.currentAttackPlayerSprite = 0;
        this.attackSpritIndex++;
      }
      if (this.attackSpritIndex >= this.attackSpritNumber) {
        this.attackSpritIndex = 0; 
      }
    } 
    // Logique marche
    else if (this.isWalking) {
      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.WalkSpriteIndex++;
      }
      if (this.WalkSpriteIndex >= this.WalkSpritNumber) {
        this.WalkSpriteIndex = 0; 
      }
    }
    return animationFinished;
  }
}

//  INITIALISATION ET SIMULATION 

const alex = new Player("alex", 42, 1, [0, 0]);
let tempsRestantAction = 0; 

for (let i = 0; i < 30; i++) {
  
  
  if (tempsRestantAction <= 0 && !alex.isDying) {
    
    // Réinitialisation de tous les états
    alex.isWalking = false;
    alex.isAttacking = false;
    alex.isDying = false;
    
    alex.WalkSpriteIndex = 0;
    alex.currentWalkSpriteStep = 0;
    alex.attackSpritIndex = 0;
    alex.currentAttackPlayerSprite = 0;

    // Choix aléatoire
    const choix = Math.floor(Math.random() * 3); 
    if (choix === 0) alex.isWalking = true;
    else if (choix === 1) alex.isAttacking = true;
    else if (choix === 2) alex.isDying = true;
    
    // Définit la durée de l'action
    tempsRestantAction = Math.floor(Math.random() * 5) + 4;

    console.log("===========================================");
    console.log(` changement d'état : ${alex.isDying ? 'mort' : alex.isAttacking ? 'attaque' : 'marche'}`);
    console.log("===========================================");
  }

  tempsRestantAction--;
  const mortTerminee = alex.animate(); 

  // Affichage des données
  console.log("----------------MARCHE----------------")
  console.log("isWalking", alex.isWalking);
  console.log("WalkSpriteIndex", alex.WalkSpriteIndex);
  console.log("currentWalkSpriteStep", alex.currentWalkSpriteStep)

  console.log("----------------ATTAQUE----------------")
  console.log("isattack", alex.isAttacking);
  console.log("attackindex", alex.attackSpritIndex);
  console.log("cuurentattack", alex.currentAttackPlayerSprite)

  console.log("----------------MORT----------------")
  console.log("isdying", alex.isDying);
  console.log("dyingindex", alex.DyingSpritIndex);
  console.log("currentdying", alex.currentDyingPlayerSprite)

  if (alex.isDying === true) {
    console.log("vous etes Mort")
  }

  // Condition de sortie
  if (alex.isDying && mortTerminee) {
    console.log("\nFin du jeu");
    break;
  }
}