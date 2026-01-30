const serverForm = document.getElementById("server-form");
const addressInput = document.getElementById("server-address");
const currentIpDisplay = document.getElementById("current-ip");
const errorDisplay = document.getElementById("error-message");
// const dataOutput = document.getElementById("data-output");

// Charge l'adresse au démarrage si elle existe
let savedUrl = localStorage.getItem("serverUrl") || "";
if (savedUrl) {
    addressInput.value = savedUrl;
    currentIpDisplay.textContent = savedUrl;
    fetchStats(savedUrl); // Optionnel : charge les données direct
}


serverForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la page de se recharger

    const newUrl = addressInput.value.trim();

    if (!newUrl) {
        alert("Veuillez saisir une adresse !");
        return;
    }


    localStorage.setItem("serverUrl", newUrl);
    currentIpDisplay.textContent = newUrl;
    errorDisplay.textContent = ""; // Reset erreur
    
    console.log("Nouvelle adresse enregistrée :", newUrl);
    

    fetchStats(newUrl);
});

// Fonction asynchrone pour fetch les données
async function fetchStats(url) {
    try {
        const baseUrl = url.startsWith('http') ? url : `http://${url}`;
        const response = await fetch(`${baseUrl}api/listPlayers`);

        if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status}`);
        }

        const data = await response.json();
        
        // dataOutput.textContent = JSON.stringify(data, null, 2);
        console.log("Données reçues :", data);

    } catch (error) {
        console.error("Erreur réseau :", error.message)
        errorDisplay.textContent = "Impossible de joindre le serveur. Vérifiez l'adresse et le CORS.";
        dataOutput.textContent = "";
    }
}

const getBaseUrl = () => {
    let url = localStorage.getItem("serverUrl") || "";
    if (!url.startsWith('http')) url = `http://${url}`;
    return url.endsWith('/') ? url.slice(0, -1) : url;
};


async function loadPlayers() {
    try {
        const response = await fetch(`${getBaseUrl()}/api/listPlayers`);
        if (!response.ok) throw new Error("Erreur listPlayers");
        return await response.json();
    } catch (e) { console.error(e); return null; }
}


async function loadPlayerStats(name) {
    try {
        const response = await fetch(`${getBaseUrl()}/api/stats?name=/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Erreur stats");
        return await response.json();
    } catch (e) { console.error(e); return null; }
}

async function loadRanking() {
    const playersNames = await loadPlayers();
    if (!playersNames || !Array.isArray(playersNames)) return [];

    const rankingData = await Promise.all(
        playersNames.map(async (name) => {
            return await loadPlayerStats(name);
        })
    );

    return rankingData
        .filter(player => player !== null)
        .sort((a, b) => b.totalKills - a.totalKills);
}


async function displayDashboard() {
    const players = await loadPlayers();
    const ranking = await loadRanking();


    const listElement = document.getElementById("players-list");
    listElement.innerHTML = ""; // Vide avant de remplir

    if (players) {
        players.forEach(player => {
            const li = document.createElement("li");
            li.textContent = player.name;
            const btn = document.createElement("button");
            btn.textContent = "Stats";
            btn.onclick = () => showStats(player.name);
            li.appendChild(btn);
            listElement.appendChild(li);
        });
    }

    // 2. Affichage du classement (Tableau)
    const tableBody = document.querySelector("#ranking-table tbody");
    tableBody.innerHTML = "";
    
    if (ranking) {
        ranking.forEach((entry, index) => {
            const row = `<tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score} pts</td>
            </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }
}

async function showStats(name) {
    const stats = await loadPlayerStats(name);
    if (stats) {
        alert(`Stats de ${name} :\nVictoires: ${stats.wins}\nKills: ${stats.kills}`);
    }
}

const playerSelect = document.getElementById("player-select");
const rankingTableBody = document.querySelector("#ranking-table tbody");

let refreshInterval = null;

function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        updateDashboard();
    }, 5000);
}

async function updateDashboard() {
    try {
        const players = await loadPlayers();
        const ranking = await loadRanking();

        if (players) updatePlayerList(players);
        if (ranking) updateRankingTable(ranking);
        
        const selectedPlayer = playerSelect.value;
        if (selectedPlayer) {
            const stats = await loadPlayerStats(selectedPlayer);
            if (stats) displaySinglePlayerStats(stats);
        }
    } catch (err) {
        document.getElementById("error-message").textContent = err.message;
    }
}


function updatePlayerList(players) {
    const currentSelection = playerSelect.value;
    playerSelect.innerHTML = '<option value="">-- Choisir un joueur --</option>';
    
    players.forEach(player => {
        const option = document.createElement("option");
        option.value = player.name;
        option.textContent = player.name;
        if (player.name === currentSelection) option.selected = true;
        playerSelect.appendChild(option);
    });
}

function updateRankingTable(ranking) {
    const tableBody = document.querySelector("#ranking-table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    
    ranking.forEach((entry, index) => {
        const playerName = entry.name || "Inconnu";
        const kills = entry.totalKills ?? 0;
        const deaths = entry.totalDeaths ?? 0;
        const ratio = entry.kdRatio !== undefined ? entry.kdRatio.toFixed(2) : "0.00";

        const row = `<tr>
            <td>${index + 1}</td>
            <td>${playerName}</td>
            <td>${kills}</td>
            <td>${deaths}</td>
            <td>${ratio}</td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

function displaySinglePlayerStats(s) {
    if (!s) return;
    document.getElementById("stat-name").textContent = s.name || "-";
    document.getElementById("stat-kills").textContent = s.totalKills ?? 0;
    document.getElementById("stat-deaths").textContent = s.totalDeaths ?? 0;
    document.getElementById("stat-ratio").textContent = s.kdRatio !== undefined ? s.kdRatio.toFixed(2) : "0.00";
    document.getElementById("stat-last-pos").textContent = s.gamesPlayed || "0"; 
    document.getElementById("stat-avg-rank").textContent = "N/A"; 
}

// Écouteur sur le changement de sélection
playerSelect.addEventListener("change", () => {
    updateDashboard();
});

document.getElementById("server-form").addEventListener("submit", (e) => {
    e.preventDefault();
    updateDashboard();
    startAutoRefresh();
});