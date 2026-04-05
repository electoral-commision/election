// Change this to your actual GitHub username and repository name
const REPO_NAME = "electoral-commision/election";

const houseSeats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", from: "FROM OTH", swing: "33.3% Gain" },
    { name: "Kooyong", party: "onp", person: "Bumuncha", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Higgins", party: "alp", person: "Thecone", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Fraser", party: "lnp", person: "Chris", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Casey", party: "lnp", person: "officer_chilly", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Monash", party: "lnp", person: "Harley", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Calwell", party: "alp", person: "kiwi", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Bruce", party: "alp", person: "Awol_21", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" }
];

const senateSeats = [
    { name: "Senator 1", party: "lnp", person: "Senator A", status: "ELECTED", from: "LNP", swing: "2.1% Gain" },
    { name: "Senator 2", party: "alp", person: "Senator B", status: "ELECTED", from: "ALP", swing: "1.5% Gain" },
    { name: "Senator 3", party: "onp", person: "Senator C", status: "ELECTED", from: "ONP", swing: "12.0% Gain" },
    { name: "Senator 4", party: "grn", person: "Senator D", status: "ELECTED", from: "GRN", swing: "0.5% Gain" },
    { name: "Senator 5", party: "lnp", person: "Senator E", status: "ELECTED", from: "LNP", swing: "3.2% Gain" },
    { name: "Senator 6", party: "alp", person: "Senator F", status: "ELECTED", from: "ALP", swing: "1.1% Gain" }
];

const senateChart = [
    { label: "LNP", count: 2, color: "#005696" },
    { label: "ALP", count: 2, color: "#e61e2b" },
    { label: "ONP", count: 1, color: "#f7941d" },
    { label: "GRN", count: 1, color: "#009c3d" }
];

let currentView = "house";

async function fetchLastEditTime() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_NAME}/commits?path=script.js&per_page=1`);
        const data = await response.json();
        if (data && data[0]) {
            const date = new Date(data[0].commit.committer.date);
            document.getElementById('time-display').innerText = `Updated at ${date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
        }
    } catch (e) {
        document.getElementById('time-display').innerText = "Live Update Active";
    }
}

function updateHouseDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0 };
    houseSeats.forEach(s => { if (totals[s.party] !== undefined) totals[s.party]++; });

    const winnerDiv = document.getElementById('election-winner');
    winnerDiv.style.display = "block";
    if ((totals.lnp + totals.onp) >= 8) {
        winnerDiv.style.background = "linear-gradient(90deg, #005696 0%, #f7941d 100%)";
        winnerDiv.innerText = "Government Formed: Coalition";
    } else if (totals.alp >= 8) {
        winnerDiv.style.background = "#e61e2b";
        winnerDiv.innerText = "Government Formed: Labor";
    }

    document.getElementById('alp-count').innerText = totals.alp;
    document.getElementById('alp-bar').style.width = (totals.alp / 15 * 100) + "%";
    document.getElementById('lnp-count').innerText = totals.lnp;
    document.getElementById('lnp-bar').style.width = (totals.lnp / 15 * 100) + "%";
    document.getElementById('onp-count').innerText = totals.onp;
    document.getElementById('onp-bar').style.width = (totals.onp / 15 * 100) + "%";
}

function renderSenateHorshoe() {
    const svg = document.getElementById('senate-svg');
    const legend = document.getElementById('senate-legend');
    svg.innerHTML = ''; legend.innerHTML = '';
    
    let seatIndex = 0;
    const totalSeats = 6;

    senateChart.forEach(party => {
        legend.innerHTML += `<div class="legend-item"><div class="dot-sample" style="background:${party.color}"></div>${party.label}: ${party.count}</div>`;
        for (let i = 0; i < party.count; i++) {
            const angle = Math.PI + (seatIndex / (totalSeats - 1)) * Math.PI;
            const cx = 200 + 130 * Math.cos(angle);
            const cy = 170 + 130 * Math.sin(angle);
            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", cx); dot.setAttribute("cy", cy); dot.setAttribute("r", 15);
            dot.setAttribute("fill", party.color);
            svg.appendChild(dot);
            seatIndex++;
        }
    });
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    const data = currentView === "house" ? houseSeats : senateSeats;
    list.innerHTML = "";
    data.forEach(s => {
        const card = document.createElement('div');
        card.className = 'seat-card';
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person}</div>
                <span class="badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</span>
                <span class="from-text">${s.from}</span>
            </div>
            <div class="swing-label">${s.swing}</div>`;
        list.appendChild(card);
    });
}

document.getElementById('tab-house').onclick = function() {
    currentView = "house";
    this.classList.add('active');
    document.getElementById('tab-senate').classList.remove('active');
    document.getElementById('house-view').style.display = 'block';
    document.getElementById('senate-view').style.display = 'none';
    renderSeatList();
};

document.getElementById('tab-senate').onclick = function() {
    currentView = "senate";
    this.classList.add('active');
    document.getElementById('tab-house').classList.remove('active');
    document.getElementById('house-view').style.display = 'none';
    document.getElementById('senate-view').style.display = 'block';
    renderSenateHorshoe();
    renderSeatList();
};

window.onload = () => {
    fetchLastEditTime();
    updateHouseDashboard();
    renderSeatList();
};
