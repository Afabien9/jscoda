// Liste des prénoms
const listePrenoms = [
  "Lucas", "Emma", "Noah", "Léa", "Hugo", "Chloé", "Louis", "Inès",
  "Gabriel", "Jade", "Arthur", "Mila", "Raphaël", "Lina", "Ethan", "Zoé",
  "Nathan", "Manon", "Tom", "Sarah", "Enzo", "Camille", "Maxime", "Anaïs",
  "Paul", "Clara", "Adam", "Eva", "Jules", "Maëlys", "Sacha", "Romane",
  "Timéo", "Louna", "Maël", "Ambre", "Théo", "Océane", "Yanis", "Iris",
  "Nolan", "Elsa", "Mathis", "Pauline", "Aaron", "Lou", "Samuel", "Amandine",
  "Eliott", "Solène"
];

// Paramètres pour générer une taille aléatoire de classe
let tailleMinimum = 7;
let tailleMaximum = 10;
let taille =
  Math.floor(Math.random() * (tailleMaximum - tailleMinimum + 1)) +
  tailleMinimum;

// Tableau contenant tous les élèves avec leurs notes et moyenne
let classe = [];
// Note maximale possible pour toutes les matières
let noteMax = 20;

for (let i = 0; i < taille; i++) {
  let prenomAleatoire =
    listePrenoms[Math.floor(Math.random() * listePrenoms.length)];
  let nouvelEleve = {
    prenom: prenomAleatoire,
    noteFrancais: Math.floor(Math.random() * (noteMax + 1)),
    noteMaths: Math.floor(Math.random() * (noteMax + 1)),
    noteHistoire: Math.floor(Math.random() * (noteMax + 1)),
  };
  nouvelEleve.moyenne =
    (nouvelEleve.noteFrancais +
      nouvelEleve.noteMaths +
      nouvelEleve.noteHistoire) /
    3;

  classe.push(nouvelEleve);
}

// Copie du tableau initial
let tableauInit = [...classe];

console.log("Tableau initial");
// Objet pour afficher seulement prénom et moyenne
let affichageInitial = [];
for (let i = 0; i < classe.length; i++) {
  affichageInitial.push({
    Prénom: classe[i].prenom,
    Moyenne: classe[i].moyenne.toFixed(2),
  });
}

console.table(affichageInitial);

console.log("Études");

// Recherche de la moyenne minimale et maximale de la classe
let minMoyenne = classe[0].moyenne;
let maxMoyenne = classe[0].moyenne;

for (let i = 1; i < classe.length; i++) {
  if (classe[i].moyenne < minMoyenne) minMoyenne = classe[i].moyenne;

  if (classe[i].moyenne > maxMoyenne) maxMoyenne = classe[i].moyenne;
}

console.table({
  "Nombre d'élèves": classe.length,
  "Moyenne Min": minMoyenne.toFixed(2),
  "Moyenne Max": maxMoyenne.toFixed(2),
});

console.log("Recherche du minimum");
// Indice de l'élève avec la plus faible moyenne
let indiceMin = 0;
for (let i = 1; i < classe.length; i++) {
  if (classe[i].moyenne < classe[indiceMin].moyenne) {
    indiceMin = i;
  }
}
console.table([
  {
    Élève: classe[indiceMin].prenom,
    Indice: indiceMin,
    Moyenne: classe[indiceMin].moyenne.toFixed(2),
  },
]);

console.log("Échange avec l'indice 0");
// Échange du premier élève avec celui ayant la plus faible moyenne
let tempPremier = classe[0];
classe[0] = classe[indiceMin];
classe[indiceMin] = tempPremier;

let affichageEchange = [];

for (let i = 0; i < classe.length; i++) {
  affichageEchange.push({
    Indice: i,
    Prénom: classe[i].prenom,
    Moyenne: classe[i].moyenne.toFixed(2),
  });
}
console.table(affichageEchange);

// Compteurs pour les statistiques du tri par sélection
let nbComparaisons = 0;
let nbEchanges = 0;

// Tri par sélection basé sur la moyenne générale
for (let i = 0; i < classe.length - 1; i++) {
  let minIdx = i;

  for (let j = i + 1; j < classe.length; j++) {
    nbComparaisons++;

    if (classe[j].moyenne < classe[minIdx].moyenne) {
      minIdx = j;
    }
  }
  if (minIdx !== i) {
    let temp = classe[i];
    classe[i] = classe[minIdx];
    classe[minIdx] = temp;
    nbEchanges++;
  }
}

console.log("Tableau Avant Tri");
console.table(affichageInitial);
console.log("Tableau Après Tri");
// Affichage du tableau trié par moyenne
let affichageFinal = [];

for (let i = 0; i < classe.length; i++) {
  affichageFinal.push({
    Prénom: classe[i].prenom,
    Moyenne: classe[i].moyenne.toFixed(2),
  });
}

console.table(affichageFinal);

console.log(
  "Stats : " + nbComparaisons + " comparaisons, " + nbEchanges + " échanges."
);

// Tri et affichage par matière : Mathématiques
console.log("Tri par notes de Maths");
for (let i = 0; i < classe.length - 1; i++) {
  let minIdx = i;
  for (let j = i + 1; j < classe.length; j++) {
    if (classe[j].noteMaths < classe[minIdx].noteMaths) {
      minIdx = j;
    }
  }

  let temp = classe[i];
  classe[i] = classe[minIdx];
  classe[minIdx] = temp;
}

let affichageMaths = [];
for (let i = 0; i < classe.length; i++) {
  affichageMaths.push({
    Prénom: classe[i].prenom,
    "Note Maths": classe[i].noteMaths,
  });
}
console.table(affichageMaths);

// Tri et affichage par matière : Français
console.log("Tri par notes de Français");
for (let i = 0; i < classe.length - 1; i++) {
  let minIdx = i;
  for (let j = i + 1; j < classe.length; j++) {
    if (classe[j].noteFrancais < classe[minIdx].noteFrancais) {
      minIdx = j;
    }
  }

  let temp = classe[i];
  classe[i] = classe[minIdx];
  classe[minIdx] = temp;
}

let affichageFrancais = [];
for (let i = 0; i < classe.length; i++) {
  affichageFrancais.push({
    Prénom: classe[i].prenom,
    "Note Français": classe[i].noteFrancais,
  });
}
console.table(affichageFrancais);

// Tri et affichage par matière : Histoire
console.log("Tri par notes d'Histoire");
for (let i = 0; i < classe.length - 1; i++) {
  let minIdx = i;
  for (let j = i + 1; j < classe.length; j++) {
    if (classe[j].noteHistoire < classe[minIdx].noteHistoire) {
      minIdx = j;
    }
  }

  let temp = classe[i];
  classe[i] = classe[minIdx];
  classe[minIdx] = temp;
}

let affichageHistoire = [];
for (let i = 0; i < classe.length; i++) {
  affichageHistoire.push({
    Prénom: classe[i].prenom,
    "Note Histoire": classe[i].noteHistoire,
  });
}
console.table(affichageHistoire);
