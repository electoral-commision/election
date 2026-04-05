const REPO_NAME = "electoral-commision/election";

const houseSeats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", swing: "33.3% Gain" },
    { name: "Kooyong", party: "onp", person: "Bumuncha", status: "GAIN", swing: "50.0% Gain" },
    { name: "Higgins", party: "alp", person: "Thecone", status: "GAIN", swing: "50.0% Gain" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", status: "GAIN", swing: "100% Gain" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", status: "GAIN", swing: "100% Gain" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", status: "GAIN", swing: "100% Gain" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", status: "GAIN", swing: "100% Gain" },
    { name: "Fraser", party: "lnp", person: "Chris", status: "GAIN", swing: "100% Gain" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", status: "GAIN", swing: "50.0% Gain" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", status: "GAIN", swing: "50.0% Gain" },
    { name: "Casey", party: "lnp", person: "officer_chilly", status: "GAIN", swing: "50.0% Gain" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", status: "GAIN", swing: "100% Gain" },
    { name: "Monash", party: "lnp", person: "Harley", status: "GAIN", swing: "100% Gain" },
    { name: "Calwell", party: "alp", person: "kiwi", status: "GAIN", swing: "50.0% Gain" },
    { name: "Bruce", party: "alp", person: "Awol_21", status: "GAIN", swing: "50.0% Gain" }
];

const senateSeats = [
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", status: "ELECTED", swing: "1.1 Quotas" },
    { name: "Senate Seat 2", party: "alp", person: "jeffery_harrold1", status: "ELECTED", swing: "0.9 Quotas" },
    { name: "Senate Seat 3", party: "alp", person: "asperytravel", status: "ELECTED", swing: "0.8 Quotas" },
    { name: "Senate Seat 4", party: "lnp", person: "hitheresam", status: "ELECTED", swing: "1.0 Quotas" },
    { name: "Senate Seat 5", party: "onp", person: "Reald", status: "ELECTED", swing: "0.7 Quotas" },
    { name: "Senate Seat 6", party: "onp", person: "siua10011", status: "ELECTED", swing: "0.6 Quotas" }
];

let activeTab = "house";

async function fetchEditTime() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_NAME}/commits?path=script.js&per_page=1`);
        const data = await response.json();
        if (data[0]) {
            const date = new Date(data[0].commit.committer.date);
            document.getElementById('time-display').innerText = `Updated ${date.toLocaleTimeString('en-AU', {hour:'numeric', minute:'2-digit', hour12:true})}`;
        }
    } catch (e) { document.getElementById('time-display').innerText = "Live Update Active"; }
}

function renderList(data) {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    const source = data || (activeTab === "senate" ? senateSeats : houseSeats);
    source.forEach(s => {
        const card = document.createElement('div');
        card.className = 'seat-card';
        card.innerHTML = `<div><div class="seat-name">${s.name}</div><div class="person-name">${s.person}</div>
        <span class="badge ${s.party}">${s.party.toUpperCase()} ${s.status}</span></div>
        <div class="swing-label">${s.swing}</div>`;
        list.appendChild(card);
    });
}

function renderHexMap() {
    const grid = document.getElementById('hex-grid');
    grid.innerHTML = "";
    houseSeats.forEach(s => {
        const hex = document.createElement('div');
        hex.className = `hex ${s.party}`;
        hex.innerText = s.name.substring(0,2).toUpperCase();
        hex.title = `${s.name}: ${s.person}`;
        grid.appendChild(hex);
    });
}

function renderSenate() {
    const svg = document.getElementById('senate-svg');
    svg.innerHTML = '';
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    senateSeats.forEach((s, i) => {
        const angle = Math.PI + (i / (senateSeats.length - 1)) * Math.PI;
        const cx = 200 + 140 * Math.cos(angle);
        const cy = 175 + 140 * Math.sin(angle);
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", cx); dot.setAttribute("cy", cy); dot.setAttribute("r", 18);
        dot.setAttribute("fill", colors[s.party]);
        svg.appendChild(dot);
    });
}

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('house-view').style.display = (tab === 'house') ? 'block' : 'none';
    document.getElementById('map-view').style.display = (tab === 'map') ? 'block' : 'none';
    document.getElementById('senate-view').style.display = (tab === 'senate') ? 'block' : 'none';
    
    if (tab === 'house') {
        document.getElementById('tab-house').classList.add('active');
    } else if (tab === 'map') {
        document.getElementById('tab-map').classList.add('active');
        renderHexMap();
    } else {
        document.getElementById('tab-senate').classList.add('active');
        renderSenate();
    }
    renderList();
}

document.getElementById('seat-search').oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const source = activeTab === "senate" ? senateSeats : houseSeats;
    const filtered = source.filter(s => s.name.toLowerCase().includes(val) || s.person.toLowerCase().includes(val));
    renderList(filtered);
};

document.getElementById('tab-house').onclick = () => switchTab('house');
document.getElementById('tab-map').onclick = () => switchTab('map');
document.getElementById('tab-senate').onclick = () => switchTab('senate');

window.onload = () => {
    fetchEditTime();
    const totals = { alp: 8, lnp: 4, onp: 3 };
    ["alp", "lnp", "onp"].forEach(p => {
        document.getElementById(`${p}-count`).innerText = totals[p];
        document.getElementById(`${p}-bar`).style.width = (totals[p]/15*100) + "%";
    });
    switchTab('house');
};
