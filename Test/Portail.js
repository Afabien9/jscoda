const skins = ["1.png", "2.png", "3.png", 
    "4.png", "5.png", "6.png", "7.png", "8.png", 
    "9.png", "10.png", "11.png", "12.png", "13.png",
    "14.png", "15.png", "16.png", "17.png", "18.png", 
    "19.png", "20.png", "21.png", "22.png", "23.png", 
    "24.png", "25.png", "26.png", "27.png", "28.png",
    "29.png",]; 

let selectedSkin1 = skins[0];
let selectedSkin2 = skins[1];

function createSkinGrid(containerId, playerNum) {
    const container = document.getElementById(containerId);
    skins.forEach(skinFile => {
        const div = document.createElement('div');
        div.className = 'skin-option';
        if((playerNum === 1 && skinFile === selectedSkin1) || (playerNum === 2 && skinFile === selectedSkin2)) {
            div.classList.add('selected');
        }

        const preview = document.createElement('div');
        preview.className = 'sprite-preview';
        const img = document.createElement('img');
        img.src = `spritesheets/${skinFile}`; 
        
        preview.appendChild(img);
        div.appendChild(preview);

        div.onclick = () => {
            document.querySelectorAll(`#${containerId} .skin-option`).forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            if(playerNum === 1) selectedSkin1 = skinFile;
            else selectedSkin2 = skinFile;
        };
        container.appendChild(div);
    });
}

createSkinGrid('skin-selector-1', 1);
createSkinGrid('skin-selector-2', 2);

document.getElementById('btn-jouer').onclick = () => {
    const p1 = document.getElementById('pseudo1').value || "J1";
    const p2 = document.getElementById('pseudo2').value || "J2";

    localStorage.setItem("p1_pseudo", p1);
    localStorage.setItem("p1_skin", `spritesheets/${selectedSkin1}`);
    localStorage.setItem("p2_pseudo", p2);
    localStorage.setItem("p2_skin", `spritesheets/${selectedSkin2}`);

    window.location.href = "Player.html";
};