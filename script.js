const houseData = [
    { name: "Melbourne", person: "Bounty", party: "alp", status: "GAIN", swing: "33.3% Gain", margin: 33.3, date: 1 },
    { name: "Kooyong", person: "Bumuncha", party: "onp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 2 },
    { name: "Higgins", person: "Thecone", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 3 },
    { name: "Chisholm", person: "Triple G gaming", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 4 },
    { name: "Macnamara", person: "itsmerealdd", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 5 },
    { name: "Maribyrnong", person: "2023 Toyota Camry", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 6 },
    { name: "Wills", person: "Nswsteamtrainfan10", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 7 },
    { name: "Fraser", person: "Chris", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 8 },
    { name: "Dunkley", person: "Jehrhfdhdhhfhdj", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 9 },
    { name: "Corangamite", person: "nathantombleson2024", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 10 },
    { name: "Casey", person: "officer_chilly", party: "lnp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 11 },
    { name: "La Trobe", person: "BanditNinja", party: "alp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 12 },
    { name: "Monash", person: "Harley", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 13 },
    { name: "Calwell", person: "kiwi", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 14 },
    { name: "Bruce", person: "Awol_21", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 15 },
    { name: "Bass", person: "Undecided", party: "", status: "IN DOUBT", swing: "N/A", margin: 0, date: 16 } // Example of Seat in Doubt
];

const senateData = [
    { name: "Senate Seat 1", person: "itxw4sley._.", party: "alp", status: "ELECTED", swing: "1.1 Quotas", margin: 1.1, date: 1 },
    { name: "Senate Seat 2", person: "jeffery_harrold1", party: "alp", status: "ELECTED", swing: "0.9 Quotas", margin: 0.9, date: 2 },
    { name: "Senate Seat 3", person: "asperytravel", party: "alp", status: "ELECTED", swing: "0.8 Quotas", margin: 0.8, date: 3 },
    { name: "Senate Seat 4", person: "lnp", party: "lnp", status: "ELECTED", swing: "1.0 Quotas", margin: 1.0, date: 4 },
    { name: "Senate Seat 5", person: "Reald", party: "onp", status: "ELECTED", swing: "0.7 Quotas", margin: 0.7, date: 5 },
    { name: "Senate Seat 6", person: "siua10011", party: "onp", status: "ELECTED", swing: "0.6 Quotas", margin: 0.6, date: 6 }
];

let currentView = 'house';
let currentSort = 'latest';
let activeFilters = { search: '', inDoubt: false, changing: false };

function renderList() {
    const container = document.getElementById('list-container');
    container.innerHTML = "";
    
    let data = currentView === 'senate' ? [...senateData] : [...houseData];

    if (activeFilters.search) {
        data = data.filter(s => s.name.toLowerCase().includes(activeFilters.search) || s.person.toLowerCase().includes(term));
    }

    // UPDATED LOGIC: A seat is in doubt ONLY if party is empty
    if (activeFilters.inDoubt) {
        data = data.filter(s => s.party === "");
    }

    if (activeFilters.changing) {
        data = data.filter(s => s.status === "GAIN");
    }

    if (currentSort === 'az') data.sort((a,b) => a.name.localeCompare(b.name));
    else if (currentSort === 'latest') data.sort((a,b) => b.date - a.date);
    else if (currentSort === 'margin') data.sort((a,b) => b.margin - a.margin);

    data.forEach(s => {
        const partyClass = s.party ? s.party : 'doubt';
        const partyLabel = s.party ? s.party.toUpperCase() : 'NO PARTY';
        container.innerHTML += `
            <div class="seat-card">
                <div>
                    <div class="s-name">${s.name}</div>
                    <div class="s-person">${s.person}</div>
                    <div class="s-badge" style="background:var(--${partyClass})">${partyLabel} ${s.status}</div>
                </div>
                <div class="s-swing">${s.swing}</div>
            </div>`;
    });
}

function renderHexMap() {
    const grid = document.getElementById('hex-grid');
    grid.innerHTML = "";
    houseData.forEach(s => {
        const div = document.createElement('div');
        div.className = `hex ${s.party || 'doubt'}`;
        div.innerText = s.name.substring(0,2).toUpperCase();
        div.onclick = () => {
            activeFilters.search = s.name.toLowerCase();
            document.getElementById('seat-search').value = s.name;
            renderList();
        };
        grid.appendChild(div);
    });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        document.getElementById('house-view').style.display = currentView === 'house' ? 'block' : 'none';
        document.getElementById('map-view').style.display = currentView === 'map' ? 'block' : 'none';
        document.getElementById('senate-view').style.display = currentView === 'senate' ? 'block' : 'none';
        if (currentView === 'map') renderHexMap();
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
    activeFilters.inDoubt = !activeFilters.inDoubt;
    renderList();
};const houseData = [
    { name: "Melbourne", person: "Bounty", party: "alp", status: "GAIN", swing: "33.3% Gain", margin: 33.3, date: 1 },
    { name: "Kooyong", person: "Bumuncha", party: "onp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 2 },
    { name: "Higgins", person: "Thecone", party: "alp", status: "GAIN", swing: "50.0% Gain", margin: 50.0, date: 3 },
    { name: "Chisholm", person: "Triple G gaming", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 4 },
    { name: "Macnamara", person: "itsmerealdd", party: "onp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 5 },
    { name: "Maribyrnong", person: "2023 Toyota Camry", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 6 },
    { name: "Wills", person: "Nswsteamtrainfan10", party: "lnp", status: "GAIN", swing: "100% Gain", margin: 100.0, date: 7 },
    { name: "Bass", person: "Undecided", party: "", status: "IN DOUBT", swing: "N/A", margin: 0, date: 8 }
];

const senateData = [
    { name: "Senate Seat 1", person: "itxw4sley._.", party: "alp", status: "ELECTED", swing: "1.1 Quotas", margin: 1.1, date: 1 },
    { name: "Senate Seat 2", person: "jeffery_harrold1", party: "alp", status: "ELECTED", swing: "0.9 Quotas", margin: 0.9, date: 2 },
    { name: "Senate Seat 3", person: "asperytravel", party: "alp", status: "ELECTED", swing: "0.8 Quotas", margin: 0.8, date: 3 },
    { name: "Senate Seat 4", person: "hitheresam", party: "lnp", status: "ELECTED", swing: "1.0 Quotas", margin: 1.0, date: 4 },
    { name: "Senate Seat 5", person: "Reald", party: "onp", status: "ELECTED", swing: "0.7 Quotas", margin: 0.7, date: 5 },
    { name: "Senate Seat 6", person: "siua10011", party: "onp", status: "ELECTED", swing: "0.6 Quotas", margin: 0.6, date: 6 }
];

let currentView = 'house';
let currentSort = 'latest';
let activeFilters = { search: '', inDoubt: false, changing: false, wonBy: '' };

function renderList() {
    const container = document.getElementById('list-container');
    container.innerHTML = "";
    let data = currentView === 'senate' ? [...senateData] : [...houseData];

    if (activeFilters.search) {
        data = data.filter(s => s.name.toLowerCase().includes(activeFilters.search) || s.person.toLowerCase().includes(activeFilters.search));
    }
    if (activeFilters.inDoubt) {
        data = data.filter(s => s.party === "");
    }
    if (activeFilters.changing) {
        data = data.filter(s => s.status === "GAIN");
    }
    if (activeFilters.wonBy) {
        data = data.filter(s => s.party === activeFilters.wonBy);
    }

    if (currentSort === 'az') data.sort((a,b) => a.name.localeCompare(b.name));
    else if (currentSort === 'latest') data.sort((a,b) => b.date - a.date);
    else if (currentSort === 'margin') data.sort((a,b) => b.margin - a.margin);

    data.forEach(s => {
        const partyClass = s.party || 'doubt';
        const partyLabel = s.party ? s.party.toUpperCase() : 'NO PARTY';
        container.innerHTML += `
            <div class="seat-card">
                <div>
                    <div class="s-name">${s.name}</div>
                    <div class="s-person">${s.person}</div>
                    <div class="s-badge" style="background:var(--${partyClass})">${partyLabel} ${s.status}</div>
                </div>
                <div class="s-swing">${s.swing}</div>
            </div>`;
    });
}

function renderSenateSVG() {
    const svg = document.getElementById('senate-svg');
    svg.innerHTML = '';
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    senateData.forEach((s, i) => {
        const angle = Math.PI + (i / (senateData.length - 1)) * Math.PI;
        const radius = 150, centerX = 200, centerY = 180;
        const cx = centerX + radius * Math.cos(angle);
        const cy = centerY + radius * Math.sin(angle);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx); circle.setAttribute("cy", cy); circle.setAttribute("r", 15);
        circle.setAttribute("fill", colors[s.party] || "#444");
        svg.appendChild(circle);
    });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        document.getElementById('house-view').style.display = currentView === 'house' ? 'block' : 'none';
        document.getElementById('senate-view').style.display = currentView === 'senate' ? 'block' : 'none';
        if (currentView === 'senate') renderSenateSVG();
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

document.getElementById('filter-doubt').onclick = function() { this.classList.toggle('active'); activeFilters.inDoubt = !activeFilters.inDoubt; renderList(); };
document.getElementById('filter-changing').onclick = function() { this.classList.toggle('active'); activeFilters.changing = !activeFilters.changing; renderList(); };
document.getElementById('filter-won').onchange = (e) => { activeFilters.wonBy = e.target.value; renderList(); };
document.getElementById('seat-search').oninput = (e) => { activeFilters.search = e.target.value.toLowerCase(); renderList(); };

window.onload = () => renderList();

document.getElementById('filter-changing').onclick = function() {
    this.classList.toggle('active');
    activeFilters.changing = !activeFilters.changing;
    renderList();
};

document.getElementById('seat-search').oninput = (e) => {
    activeFilters.search = e.target.value.toLowerCase();
    renderList();
};

window.onload = () => renderList();
