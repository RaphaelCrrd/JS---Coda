document.addEventListener('DOMContentLoaded', () => {
    const spriteList = document.getElementById('spriteList');
    const loginForm = document.getElementById('loginForm');

    // 1. Création du message d'erreur
    const errorMsg = document.createElement('p');
    errorMsg.style.color = "#ff4444";
    errorMsg.style.textAlign = "center";
    errorMsg.style.fontSize = "14px";
    errorMsg.style.display = "none";
    document.querySelector('.btn-join').before(errorMsg);

    // 2. Génération des 29 Canvas (Manip du DOM)
    for (let i = 1; i <= 29; i++) {
        const item = document.createElement('div');
        item.className = 'sprite-item';

        const skinPath = `assets/${i}.png`;
        // const skinPath = `../assets/${i}.png`;

        item.innerHTML = `
            <label class="sprite-box" for="sprite${i}">
                <canvas id="canvas${i}" width="64" height="64"></canvas>
            </label>
            <input type="radio" id="sprite${i}" name="skinPath" value="${skinPath}">
        `;
        spriteList.appendChild(item);

        // Dessin sur le canvas
        const canvas = document.getElementById(`canvas${i}`);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = skinPath;

        img.onload = () => {
            // Paramètres : image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
            ctx.drawImage(img, 0, 128, 64, 64, 0, 0, 64, 64);
        };
    }

    // 3. Soumission et Sauvegarde LocalStorage
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pseudo = loginForm.pseudo.value.trim();
        const serverUrl = loginForm.backend.value.trim(); // "backend" est le name de l'input
        const selectedSkin = loginForm.querySelector('input[name="skinPath"]:checked');

        // Validation
        if (!pseudo || !serverUrl || !selectedSkin) {
            errorMsg.textContent = "Erreur : Toutes les informations sont requises !";
            errorMsg.style.display = "block";
            return;
        }

        // Sauvegarde localStorage
        localStorage.setItem('pseudo', pseudo);
        localStorage.setItem('serverUrl', serverUrl);
        localStorage.setItem('skinPath', selectedSkin.value);

        errorMsg.style.display = "none";
        alert("Informations sauvegardées !");
        
        window.location.href = "game.html";
    });
});