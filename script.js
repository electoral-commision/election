// --- DATA: 15 House Seats & 6 Senate Seats ---
const houseData = [
    { name: "Melbourne", person: "Bounty", party: "alp", status: "GAIN", swing: "33.3% Gain", margin: 33.3, date: 1, inDoubt: false },
    { name: "Kooyong", person: "Bumuncha", party: "onp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 2, inDoubt: true },
    { name: "Higgins", person: "Thecone", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 3, inDoubt: false },
    { name: "Chisholm", person: "Triple G gaming", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 4, inDoubt: false },
    { name: "Macnamara", person: "itsmerealdd", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 5, inDoubt: true },
    { name: "Maribyrnong", person: "2023 Toyota Camry", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 6, inDoubt: false },
    { name: "Wills", person: "Nswsteamtrainfan10", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 7, inDoubt: false },
    { name: "Fraser", person: "Chris", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 8, inDoubt: false },
    { name: "Dunkley", person: "Jehrhfdhdhhfhdj", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 9, inDoubt: true },
    { name: "Corangamite", person: "nathantombleson2024", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 10, inDoubt: false },
    { name: "Casey", person: "officer_chilly", party: "lnp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 11, inDoubt: false },
    { name: "La Trobe", person: "BanditNinja", party: "alp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 12, inDoubt: false },
    { name: "Monash", person: "Harley", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 13, inDoubt: false },
    { name: "Calwell", person: "kiwi", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 14, inDoubt: false },
    { name: "Bruce", person: "Awol_21", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 15, inDoubt: false }
];

const senateData = [
    { name: "Senate Seat 1", person: "itxw4sley._.", party: "alp", status: "ELECTED", swing: "1.1 Quotas", margin: 1.1, date: 1 },
    { name: "Senate Seat 2", person: "jeffery_harrold1", party: "alp", status: "ELECTED", swing: "0.9 Quotas", margin: 0.9, date: 2 },
    { name: "Senate Seat 3", person: "asperytravel", party: "alp", status: "ELECTED", swing: "0.8 Quotas", margin: 0.8, date: 3 },
    { name: "Senate Seat 4", person: "hitheresam", party: "lnp", status: "ELECTED", swing: "1.0 Quotas", margin: 1.0, date: 4 },
    { name: "Senate Seat 5", person: "Reald", party: "onp", status: "ELECTED", swing: "0.7 Quotas", margin: 0.7, date: 5 },
    { name: "Senate Seat 6", person: "siua10011", party: "onp", status: "ELECTED", swing: "0.6 Quotas", margin: 0.6, date: 6 }
];

// --- APP STATE ---
let currentView = 'house';
let currentSort = 'latest';
let filters = { search: '', doubt: false, changing: false };

// --- RENDERING LOGIC ---

function renderList() {
    const container = document.getElementById('list-container');
    container.innerHTML = "";
    
    let data = currentView === 'senate' ? [...senateData] : [...houseData];

    // Filter Logic
    if (filters.search) {
        const term = filters.search.toLowerCase();
        data = data.filter(s => s.name.toLowerCase().includes(term) || s.person.toLowerCase().includes(term));
    }
    if (currentView !== 'senate') {
        if (filters.doubt) data = data.filter(s => s.inDoubt);
        if (filters.changing) data = data.filter(s => s.status === "GAIN");
    }

    // Sort Logic
    if (currentSort === 'az') {
        data.sort((a,b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'latest') {
        data.sort((a,b) => b.date - a.date);
    } else if (currentSort === 'margin') {
        data.sort((a,b) => b.margin - a.margin);
    }

    // Render Cards
    data.forEach(s => {
        container.innerHTML += `
            <div class="seat-card">
                <div>
                    <div class="s-name">${s.name}</div>
                    <div class="s-person">${s.person}</div>
                    <div class="s-badge" style="color:var(--${s.party})">${s.party.toUpperCase()} ${s.status}</div>
                </div>
                <div class="s-swing">${s.swing}</div>
            </div>`;
    });
}

function updateTally() {
    const totals = { alp: 0, lnp: 0, onp: 0 };
    houseData.forEach(s => totals[s.party]++);
    
    const maxSeats = 15; // Total seats in houseData
    ["alp", "lnp", "onp"].forEach(p => {
        const bar = document.getElementById(`bar-${p}`);
        const countDisplay = document.getElementById(`count-${p}`);
        if (bar && countDisplay) {
            bar.style.width = (totals[p] / maxSeats * 100) + "%";
            countDisplay.innerText = totals[p];
        }
    });

    // Update Banner
    const banner = document.getElementById('winner-banner');
    if (banner) {
        if (totals.lnp + totals.onp >= 8) {
            banner.innerText = "COALITION GOVERNMENT FORMED";
            banner.style.background = "linear-gradient(90deg, var(--lnp), var(--onp))";
        } else if (totals.alp >= 8) {
            banner.innerText = "LABOR GOVERNMENT FORMED";
            banner.style.background = "var(--alp)";
        }
    }
}

function renderHexMap() {
    const grid = document.getElementById('hex-grid');
    if (!grid) return;
    grid.innerHTML = "";
    houseData.forEach(s => {
        const hex = document.createElement('div');
        hex.className = `hex ${s.party}`;
        hex.innerText = s.name.substring(0,2).toUpperCase();
        hex.title = `${s.name}: ${s.person}`;
        hex.onclick = () => {
            filters.search = s.name;
            document.getElementById('seat-search').value = s.name;
            renderList();
        };
        grid.appendChild(hex);
    });
}

function renderSenate() {
    const svg = document.getElementById('senate-svg');
    if (!svg) return;
    svg.innerHTML = '';
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    
    senateData.forEach((s, i) => {
        const angle = Math.PI + (i / (senateData.length - 1)) * Math.PI;
        const cx = 200 + 140 * Math.cos(angle);
        const cy = 175 + 140 * Math.sin(angle);
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx); 
        circle.setAttribute("cy", cy); 
        circle.setAttribute("r", 16);
        circle.setAttribute("fill", colors[s.party]);
        circle.style.cursor = "pointer";
        circle.onclick = () => { 
            filters.search = s.person; 
            document.getElementById('seat-search').value = s.person;
            renderList(); 
        };
        svg.appendChild(circle);
    });
}

// --- EVENT LISTENERS ---

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        
        // Switch View Sections
        document.getElementById('house-view').style.display = currentView === 'house' ? 'block' : 'none';
        document.getElementById('map-view').style.display = currentView === 'map' ? 'block' : 'none';
        document.getElementById('senate-view').style.display = currentView === 'senate' ? 'block' : 'none';

        if (currentView === 'map') renderHexMap();
        if (currentView === 'senate') renderSenate();
        
        // Reset Search on tab change
        filters.search = '';
        document.getElementById('seat-search').value = '';
        renderList();
    };
});

document.querySelectorAll('.chip-mini').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.chip-mini').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.dataset.sort;
        renderList();
    };
});

document.getElementById('filter-doubt').onclick = function() {
    this.classList.toggle('active');
    filters.doubt = !filters.doubt;
    renderList();
};

document.getElementById('filter-changing').onclick = function() {
    this.classList.toggle('active');
    filters.changing = !filters.changing;
    renderList();
};

document.getElementById('seat-search').oninput = (e) => {
    filters.search = e.target.value;
    renderList();
};

// --- INITIALIZE ---
window.onload = () => {
    updateTally();
    renderList();
};
