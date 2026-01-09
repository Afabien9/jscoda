//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

// Créer une copie du tableau initial
let Notesinitiales = [...notes];
console.log("Taille du tableau :", notes.length);

// Initialiser les variables pour stocker les valeurs min et max
let Minval = notes[0];
let Maxval = notes[0];

// Parcourir le tableau pour trouver la valeur minimale et maximale
for (let i = 0; i < notes.length; i++) {
  if (notes[i] < Minval) Minval = notes[i];
  if (notes[i] > Maxval) Maxval = notes[i];
}

// Afficher les résultats des valeurs min et max trouvées
console.log("Plus petite valeur :", Minval);
console.log("Plus grande valeur :", Maxval);
console.log("Tableau :", notes);

// Trouver l'indice du minimum dans le tableau
let Indicemin = 0;

for (let j = 0; j < notes.length; j++) {
  if (notes[j] < notes[Indicemin]) {
    Indicemin = j;
  }
}

// Échanger le premier élément avec le minimum trouvé
let temp = notes[0];
notes[0] = notes[Indicemin];
notes[Indicemin] = temp;

console.log("Premier min trouvé :", notes[0], "à l'indice :", Indicemin);

console.log("==========================CROISSANT==========================");

console.log("Tableau :", notes);

// Variables pour compter les mouvements et vérifications lors du tri croissant
let k = 0;
let Nbverifications = 0;

// Tri par sélection en ordre croissant
for (let i = 0; i < notes.length - 1; i++) {
  let MinId = i;

  // Chercher le minimum parmi les éléments restants
  for (let j = i + 1; j < notes.length; j++) {
    Nbverifications++;
    if (notes[j] < notes[MinId]) {
      MinId = j;
    }
  }

  // Échanger l'élément courant avec le minimum trouvé
  let temp = notes[i];
  notes[i] = notes[MinId];
  notes[MinId] = temp;
  k += 1;
  console.log("Tableau croissant pendant le tri :", notes);
}

// Afficher les statistiques du tri croissant
console.log("Nombre de mouvement croissant :", k);
console.log("Vérifications croissant :", Nbverifications);

console.log("Tableau croissant AVANT tri :", Notesinitiales);
console.log("Tableau croissant APRÈS tri :", notes);

console.log("==========================DÉCROISSANT==========================");

console.log("Tableau :", notes);

// Variables pour compter les mouvements et vérifications lors du tri décroissant
let Nbverifdecroissant = 0;
let Nbechangesdecroissant = 0;

// Tri par sélection en ordre décroissant
for (let i = 0; i < notes.length - 1; i++) {
  let Maxid = i;

  // Chercher le maximum parmi les éléments restants
  for (let j = i + 1; j < notes.length; j++) {
    Nbverifdecroissant++;
    if (notes[j] > notes[Maxid]) {
      Maxid = j;
    }
  }

  // Échanger l'élément courant avec le maximum trouvé seulement si nécessaire
  if (Maxid !== i) {
    let temp = notes[i];
    notes[i] = notes[Maxid];
    notes[Maxid] = temp;
    Nbechangesdecroissant++;
    console.log("Tableau décroissant pendant le tri :", notes);
  }
}

// Afficher les statistiques du tri décroissant
console.log("Nombre de mouvement décroissant :", Nbechangesdecroissant);
console.log("Vérifications décroissant :", Nbverifdecroissant);

console.log("Tableau décroissant AVANT tri :", Notesinitiales);
console.log("Tableau décroissant tri :", notes);
