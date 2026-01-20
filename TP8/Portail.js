// Configuration
const totalSkins = 29; 
let selectedSkin = "../assets/1.png"; // Skin par défaut

// Récupération des éléments
const skinSelector = document.getElementById("skin-selector");
const btnJouer = document.getElementById("btn-jouer");
const pseudoInput = document.getElementById("pseudo");
const serverUrlInput = document.getElementById("serverUrl");
const errorMessage = document.getElementById("error-message");

// Génération dynamique des skins via une boucle
for (let i = 1; i <= totalSkins; i++) {
  const skinPath = `assets/${i}.png`; // Format demandé
  
  const div = document.createElement("div");
  div.className = "skin-option";
  if (skinPath === selectedSkin) div.classList.add("selected");

  const previewContainer = document.createElement("div");
  previewContainer.className = "sprite-preview";

  const img = document.createElement("img");
  img.src = skinPath; // Utilise le chemin généré

  previewContainer.appendChild(img);
  div.appendChild(previewContainer);

  div.onclick = () => {
    document
      .querySelectorAll(".skin-option")
      .forEach((el) => el.classList.remove("selected"));
    div.classList.add("selected");
    selectedSkin = skinPath; // Met à jour le skin sélectionné
  };
  skinSelector.appendChild(div);
}

// Gestion du clic sur le bouton
btnJouer.onclick = () => {
  const pseudo = pseudoInput.value.trim();
  const serverUrl = serverUrlInput.value.trim();

  if (pseudo === "" || serverUrl === "") {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    errorMessage.style.display = "block";
    return;
  }

  // Sauvegarde locale avec le format demandé
  localStorage.setItem("playerPseudo", pseudo);
  localStorage.setItem("playerServerUrl", serverUrl);
  localStorage.setItem("skinPath", selectedSkin); 

  // Dans Portail.js
window.location.href = "Game.html"; // Assurez-vous que le nom du fichier est correct
};

// Nettoyage des erreurs lors de la saisie
[pseudoInput, serverUrlInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.style.borderColor = "";
    errorMessage.style.display = "none";
  });
});