// --- CONFIG ---
const REPO_NAME = "electoral-commision/election"; // For time edited feature

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
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", status: "ELECTED", from: "VIC SENATE", swing: "1.1 Quotas" },
    { name: "Senate Seat 2", party: "alp", person: "jeffery_harrold1", status: "ELECTED", from: "VIC SENATE", swing: "0.9 Quotas" },
    { name: "Senate Seat 3", party: "alp", person: "asperytravel", status: "ELECTED", from: "VIC SENATE", swing: "0.8 Quotas" },
    { name: "Senate Seat 4", party: "lnp", person: "hitheresam", status: "ELECTED", from: "VIC SENATE", swing: "1.0 Quotas" },
    { name: "Senate Seat 5", party: "onp", person: "Reald", status: "ELECTED", from: "VIC SENATE", swing: "0.7 Quotas" },
    { name: "Senate Seat 6", party: "onp", person: "siua10011", status: "ELECTED", from: "VIC SENATE", swing: "0.6 Quotas" }
];

let currentView = "house";

async function fetchEditTime() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_NAME}/commits?path=script.js&per_page=1`);
        const data = await response.json();
        if (data[0]) {
            const date = new Date(data[0].commit.committer.date);
            document.getElementById('time-display').innerText = `Updated ${date.toLocaleTimeString('en-AU', {hour: 'numeric', minute:'2-digit', hour12:true})}`;
        }
    } catch (e) { document.getElementById('time-display').innerText = "Live Update Active"; }
}

function updateHouseView() {
    const totals = { alp: 0, lnp: 0, onp: 0 };
    houseSeats.forEach(s => totals[s.party]++);

    const winnerDiv = document.getElementById('election-winner');
    winnerDiv.style.display = "block";
    if ((totals.lnp + totals.onp) >= 8) {
        winnerDiv.style.background = "linear-gradient(90deg, #005696 0%, #f7941d 100%)";
        winnerDiv.innerText = "Government Formed: Coalition";
    } else if (totals.alp >= 8) {
        winnerDiv.style.background = "#e61e2b";
        winnerDiv.innerText = "Government Formed: Labor";
    }

    ["alp", "lnp", "onp"].forEach(p => {
        document.getElementById(`${p}-count`).innerText = totals[p];
        document.getElementById(`${p}-bar`).style.width = (totals[p] / 15 * 100) + "%";
    });
}

function renderSenateHorshoe() {
    const svg = document.getElementById('senate-svg');
    const legend = document.getElementById('senate-legend');
    svg.innerHTML = ''; legend.innerHTML = '';
    
    // Group totals for legend
    const totals = { alp: 3, lnp: 1, onp: 2 }; 
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };

    Object.keys(totals).forEach(p => {
        legend.innerHTML += `<div class="legend-item"><div class="dot-sample" style="background:${colors[p]}"></div>${p.toUpperCase()}: ${totals[p]}</div>`;
    });

    // Draw dots
    let seatIdx = 0;
    senateSeats.forEach(s => {
        const angle = Math.PI + (seatIdx / (senateSeats.length - 1)) * Math.PI;
        const cx = 200 + 140 * Math.cos(angle);
        const cy = 175 + 140 * Math.sin(angle);
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", cx); dot.setAttribute("cy", cy); dot.setAttribute("r", 18);
        dot.setAttribute("fill", colors[s.party]);
        svg.appendChild(dot);
        seatIdx++;
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
    fetchEditTime();
    updateHouseView();
    renderSeatList();
};
