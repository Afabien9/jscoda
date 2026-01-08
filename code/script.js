const classname = "bachelor fullstack";
let numberstudent = 20;
let isopen = true;

console.log("Classe : ", classname);
console.log("Nombre d'élèves : ", numberstudent);
console.log("La classe est ouverte : ", isopen);

//création d4un seul étudiant
let Student1 = {
  Firstname: "alexis",
  Frenchgrade: 19,
  Mathgrade: 18,
};
console.log("Prénom de l'élève", Student1.Firstname);
console.log("==================================================");

//création de la liste des élèves
let Morestudent = [
  { Firstname: "Tom", Frenchgrade: 10, Mathgrade: 10 },
  { Firstname: "Achille", Frenchgrade: 10, Mathgrade: 10 },
  { Firstname: "Théo", Frenchgrade: 14, Mathgrade: 13 },
  { Firstname: "Lucas", Frenchgrade: 10, Mathgrade: 12 },
  { Firstname: "Chloé", Frenchgrade: 18, Mathgrade: 10 },
];

//ajout de l'élève seul dans le tableau
Morestudent.unshift(Student1);

//création et ajout d'un élève dans le tableau
Morestudent.push({ Firstname: "Léa", Frenchgrade: 18, Mathgrade: 16 });
console.log("Nouvel élève ajouté. Nouveau total : " + Morestudent.length);

console.log("==================================================");

console.log("Liste des prénoms :");
for (let i = 0; i < Morestudent.length; i++) {
  console.log("- " + Morestudent[i].Firstname);
}

console.log("==================================================");

//moyenne de l'élève
console.log("Moyennes individuelles :");
for (let i = 0; i < Morestudent.length; i++) {
  let Average = (Morestudent[i].Mathgrade + Morestudent[i].Frenchgrade) / 2;
  console.log(Morestudent[i].Firstname + " a une moyenne de : ", Average);
}

console.log("==================================================");

//resultats d'admission
for (let i = 0; i < Morestudent.length; i++) {
  let Average = (Morestudent[i].Mathgrade + Morestudent[i].Frenchgrade) / 2;
  if (Average >= 10) {
    console.log(Morestudent[i].Firstname + " est Admis");
  } else {
    console.log(Morestudent[i].Firstname + " est Refusé");
  }
}

console.log("==================================================");

//calcul des mentions en rapport avec la moyenne
console.log("Calcul des mentions :");

for (let i = 0; i < Morestudent.length; i++) {
  let Average = (Morestudent[i].Mathgrade + Morestudent[i].Frenchgrade) / 2;
  let mention = "";

  if (Average >= 16) {
    mention = "Très bien";
  } else if (Average >= 14) {
    mention = "Bien";
  } else if (Average >= 12) {
    mention = "Assez bien";
  } else if (Average >= 10) {
    mention = "Passable";
  } else {
    mention = "Insuffisant";
  }

  console.log("Mention pour " + Morestudent[i].Firstname + " : " + mention);
}

//statistique d'admission ou de reject
let Received = 0;
let j = 0;

while (j < Morestudent.length) {
  let Average = (Morestudent[j].Mathgrade + Morestudent[j].Frenchgrade) / 2;
  if (Average >= 10) {
    Received++;
  }
  j++;
}
console.log("==================================================");

console.log("Nombre total d'élèves admis : " + Received);

console.log("==================================================");

//calcul de la moyenne de classe

let Classaverage = 0;

//j'apelle mon index [i], je dit que si i est inferieur a la taille du tableau, je le note et je fait +1

for (let i = 0; i < Morestudent.length; i++) {

//je calcul la de math de tous les éléves que j'addition, puis je fait la meme chose pour les notes de français

  Classaverage += (Morestudent[i].Mathgrade + Morestudent[i].Frenchgrade) / 2;
}

/*je dit que la moyenne générale est égale a la moyenne de français et 
de math de la classe puis je la divise par le nombre d'élèves present dans le tableau*/ 
let Generalaverage = Classaverage / Morestudent.length;
console.log("Moyenne générale de la classe : " + Generalaverage.toFixed(2));

console.log("==================================================");

//si le tous le nombre déléves reçu est strictement égal au nombre d'élève dans le tableau, j'affiche le message
if (Received === Morestudent.length) {
  console.log("Toute les élèves sont admis ");
}
