const totalSkins = 29; 
let selectedSkin = "assets/1.png";

const skinSelector = document.getElementById("skin-selector");
const btnJouer = document.getElementById("btn-jouer");
const pseudoInput = document.getElementById("pseudo");
const serverUrlInput = document.getElementById("serverUrl");
const errorMessage = document.getElementById("error-message");

// On vide le sélecteur au cas où
skinSelector.innerHTML = "";

for (let i = 1; i <= totalSkins; i++) {
  const skinPath = `assets/${i}.png`;
  
  const div = document.createElement("div");
  div.className = "skin-option";
  if (skinPath === selectedSkin) div.classList.add("selected");

  const previewContainer = document.createElement("div");
  previewContainer.className = "sprite-preview";

  const img = document.createElement("img");
  img.src = skinPath;
  
  // Debug : si l'image ne charge pas, on met un fond rouge pour voir le carré
  img.onerror = () => {
    console.error("Image introuvable : " + skinPath);
    div.style.backgroundColor = "red"; 
  };

  previewContainer.appendChild(img);
  div.appendChild(previewContainer);

  div.onclick = () => {
    document.querySelectorAll(".skin-option").forEach((el) => el.classList.remove("selected"));
    div.classList.add("selected");
    selectedSkin = skinPath;
  };
  
  skinSelector.appendChild(div);
}

btnJouer.onclick = () => {
  const pseudo = pseudoInput.value.trim();
  const serverUrl = serverUrlInput.value.trim();

  if (pseudo === "" || serverUrl === "") {
    errorMessage.textContent = "Veuillez remplir tous les champs.";
    errorMessage.style.display = "block";
    return;
  }

  localStorage.setItem("playerPseudo", pseudo);
  localStorage.setItem("playerServerUrl", serverUrl);
  localStorage.setItem("skinPath", selectedSkin); 

  window.location.href = "views/Game.html";
};