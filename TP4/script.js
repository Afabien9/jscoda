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

function genererEleves() {
    let tailleMinimum = 7;
    let tailleMaximum = 10;
    let noteMax = 20;
    let taille = Math.floor(Math.random() * (tailleMaximum - tailleMinimum + 1)) + tailleMinimum;
    let nouveauTableau = [];

    for (let i = 0; i < taille; i++) {
        let prenomAleatoire = listePrenoms[Math.floor(Math.random() * listePrenoms.length)];
        let nouvelEleve = {
            prenom: prenomAleatoire,
            noteFrancais: Math.floor(Math.random() * (noteMax + 1)),
            noteMaths: Math.floor(Math.random() * (noteMax + 1)),
            noteHistoire: Math.floor(Math.random() * (noteMax + 1)),
        };
        nouvelEleve.moyenne = (nouvelEleve.noteFrancais + nouvelEleve.noteMaths + nouvelEleve.noteHistoire) / 3;
        nouveauTableau.push(nouvelEleve);
    }
    return  nouveauTableau;
}

function afficherEleves(tabEleves) {
    for (let i = 0; i < tabEleves.length; i++) {
        console.log("Prénom: ", tabEleves[i].prenom,"||", "Moyenne:", tabEleves[i].moyenne.toFixed(2));
    }
}

function trouverMoyenneMin(tabEleves, indexDepart) {
    let indiceMin = indexDepart;
    for (let i = indexDepart + 1; i < tabEleves.length; i++) {
        if (tabEleves[i].moyenne < tabEleves[indiceMin].moyenne) {
            indiceMin = i;
        }
    }
    return indiceMin;
}

function afficherDonnees(tabEleves) {
    let minMoyenne = tabEleves[0].moyenne;
    let maxMoyenne = tabEleves[0].moyenne;

    for (let i = 1; i < tabEleves.length; i++) {
        if (tabEleves[i].moyenne < minMoyenne) minMoyenne = tabEleves[i].moyenne;
        if (tabEleves[i].moyenne > maxMoyenne) maxMoyenne = tabEleves[i].moyenne;
    }

    console.log("Nombre d'élèves :", tabEleves.length);
    let idxMin = trouverMoyenneMin(tabEleves, 0); 
    console.log("Moyenne la plus basse :", tabEleves[idxMin].moyenne.toFixed(2));
    console.log("Moyenne la plus haute :", maxMoyenne.toFixed(2));
}

function swap(tabEleves, indexA, indexB) {
    let temp = tabEleves[indexA];
    tabEleves [indexA] = tabEleves [indexB];
    tabEleves [indexB] = temp;
}

function triParSelection(tabEleves) {
    for (let i = 0; i < tabEleves.length; i++) {
        let minIdx = trouverMoyenneMin(tabEleves, i);
        if (minIdx !== i) {
            swap(tabEleves, i, minIdx)
        }
        
    }
    
}


console.log("--- Initialisation de la classe ---");
let maClasse = genererEleves();

console.log("--- Liste des élèvescnon triée ---");
afficherEleves(maClasse);

console.log("--- Statistiques de la classe ---");
afficherDonnees(maClasse);

console.log("--- Tri de la classe par moyenne ---");
triParSelection(maClasse);

console.log("--- Liste des élèves triée ---");
afficherEleves(maClasse);