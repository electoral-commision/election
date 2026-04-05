const houseData = [
    { name: "Melbourne", code: "ME", person: "Bounty", party: "alp", status: "GAIN", swing: "33.3%", margin: 33.3, date: 1, inDoubt: false, x: 50, y: 50 },
    { name: "Kooyong", code: "KO", person: "Bumuncha", party: "onp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 2, inDoubt: true, x: 58, y: 50 },
    { name: "Higgins", code: "HI", person: "Thecone", party: "alp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 3, inDoubt: false, x: 58, y: 58 },
    { name: "Chisholm", code: "CH", person: "Triple G gaming", party: "onp", status: "GAIN", swing: "100%", margin: 100.0, date: 4, inDoubt: false, x: 66, y: 54 },
    { name: "Macnamara", code: "MA", person: "itsmerealdd", party: "onp", status: "GAIN", swing: "100%", margin: 100.0, date: 5, inDoubt: true, x: 50, y: 58 },
    { name: "Maribyrnong", code: "MR", person: "2023 Toyota Camry", party: "lnp", status: "GAIN", swing: "100%", margin: 100.0, date: 6, inDoubt: false, x: 42, y: 50 },
    { name: "Wills", code: "WI", person: "Nswsteamtrainfan10", party: "lnp", status: "GAIN", swing: "100%", margin: 100.0, date: 7, inDoubt: false, x: 50, y: 42 },
    { name: "Fraser", code: "FR", person: "Chris", party: "lnp", status: "GAIN", swing: "100%", margin: 100.0, date: 8, inDoubt: false, x: 42, y: 42 },
    { name: "Dunkley", code: "DU", person: "Jehrhfdhdhhfhdj", party: "alp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 9, inDoubt: true, x: 58, y: 74 },
    { name: "Corangamite", code: "CR", person: "nathantombleson2024", party: "alp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 10, inDoubt: false, x: 25, y: 80 },
    { name: "Casey", code: "CA", person: "officer_chilly", party: "lnp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 11, inDoubt: false, x: 74, y: 42 },
    { name: "La Trobe", code: "LA", person: "BanditNinja", party: "alp", status: "GAIN", swing: "100%", margin: 100.0, date: 12, inDoubt: false, x: 74, y: 58 },
    { name: "Monash", code: "MO", person: "Harley", party: "lnp", status: "GAIN", swing: "100%", margin: 100.0, date: 13, inDoubt: false, x: 85, y: 85 },
    { name: "Calwell", code: "CL", person: "kiwi", party: "alp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 14, inDoubt: false, x: 42, y: 34 },
    { name: "Bruce", code: "BR", person: "Awol_21", party: "alp", status: "GAIN", swing: "50.0%", margin: 50.0, date: 15, inDoubt: false, x: 66, y: 66 }
];

const senateData = [
    { name: "Senate Seat 1", person: "itxw4sley._.", party: "alp", status: "ELECTED", swing: "1.1 Quotas", margin: 1.1, date: 1 },
    { name: "Senate Seat 2", person: "jeffery_harrold1", party: "alp", status: "ELECTED", swing: "0.9 Quotas", margin: 0.9, date: 2 },
    { name: "Senate Seat 3", person: "asperytravel", party: "alp", status: "ELECTED", swing: "0.8 Quotas", margin: 0.8, date: 3 },
    { name: "Senate Seat 4", person: "hitheresam", party: "lnp", status: "ELECTED", swing: "1.0 Quotas", margin: 1.0, date: 4 },
    { name: "Senate Seat 5", person: "Reald", party: "onp", status: "ELECTED", swing: "0.7 Quotas", margin: 0.7, date: 5 },
    { name: "Senate Seat 6", person: "siua10011", party: "onp", status: "ELECTED", swing: "0.6 Quotas", margin: 0.6, date: 6 }
];

let currentView = 'house', currentSort = 'latest', filters = { search: '', doubt: false, changing: false };

function renderList() {
    const container = document.getElementById('list-container');
    container.innerHTML = "";
    
    let data = currentView === 'senate' ? [...senateData] : [...houseData];

    // Filter logic
    if (filters.search) {
        const t = filters.search.toLowerCase();
        data = data.filter(s => s.name.toLowerCase().includes(t) || s.person.toLowerCase().includes(t));
    }
    
    // Only apply Doubt/Change filters to House Views
    if (currentView !== 'senate') {
        if (filters.doubt) data = data.filter(s => s.inDoubt);
        if (filters.changing) data = data.filter(s => s.status === "GAIN");
    }

    // Sort Logic
    if (currentSort === 'az') data.sort((a,b) => a.name.localeCompare(b.name));
    else if (currentSort === 'latest') data.sort((a,b) => b.date - a.date);
    else if (currentSort === 'margin') data.sort((a,b) => b.margin - a.margin);

    data.forEach(s => {
        container.innerHTML += `
            <div class="seat-card">
                <div>
                    <div class="s-name">${s.name}</div>
                    <div class="s-person">${s.person}</div>
                    <div class="s-badge ${s.party}">${s.party.toUpperCase()} ${s.status}</div>
                </div>
                <div class="s-swing" style="color:var(--${s.party})">${s.swing} ${currentView === 'senate' ? '' : 'Gain'}</div>
            </div>`;
    });
}

function renderHexMap() {
    const map = document.getElementById('vic-map');
    if (!map) return;
    map.innerHTML = "";
    houseData.forEach(s => {
        const hex = document.createElement('div');
        hex.className = `hex-geo ${s.party}`;
        hex.style.left = s.x + "%"; 
        hex.style.top = s.y + "%";
        hex.innerHTML = `<div>${s.code}</div><div class="hex-swing">${s.swing}</div>`;
        hex.onclick = () => { 
            filters.search = s.name; 
            document.getElementById('seat-search').value = s.name; 
            renderList(); 
        };
        map.appendChild(hex);
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
        circle.setAttribute("cx", cx); circle.setAttribute("cy", cy); circle.setAttribute("r", 16);
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

function updateTally() {
    const t = { alp: 0, lnp: 0, onp: 0 };
    houseData.forEach(s => t[s.party]++);
    ["alp", "lnp", "onp"].forEach(p => {
        const bar = document.getElementById(`bar-${p}`);
        if (bar) bar.style.width = (t[p]/15*100) + "%";
        const count = document.getElementById(`count-${p}`);
        if (count) count.innerText = t[p];
    });
}

// Global UI Listeners
document.querySelectorAll('.tab-btn').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = btn.dataset.view;
    
    document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
    document.getElementById(`${currentView}-view`).style.display = 'block';
    
    if (currentView === 'map') renderHexMap();
    if (currentView === 'senate') renderSenate();
    renderList();
});

document.querySelectorAll('.chip-mini').forEach(btn => btn.onclick = () => {
    document.querySelectorAll('.chip-mini').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    renderList();
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

window.onload = () => { updateTally(); renderList(); };
