// 1. PARTY CONFIGURATION
// [Full Name, Hex Color, Master Visibility (true = always show bar)]
const PARTY_CONFIG = {
    alp: ["Australian Labor Party", "#E51F30", true],
    lnp: ["Liberal National Party", "#166FF3", true],
    grn: ["The Greens", "#4E8321", true],
    kap: ["Katter's Australian Party", "#AA6255", true],
    onp: ["One Nation", "#f7941d", true],
    oth: ["Independent / Other", "#757575", true]
};

// 2. ELECTORATE DATA
const seats = [
    { name: "Broadwater", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Bundaberg", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Cairns", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Caloundra", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Cook", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Ferny Grove", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Gregory", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Gympie", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Hill", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Hinchinbrook", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Logan", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Lytton", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Maiwar", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Mansfield", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Maryborough", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "McConnel", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Mirani", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Moggill", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Nanango", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Nicklin", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Noosa", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Nudgee", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Redcliffe", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Rockhampton", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Scenic Rim", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "South Brisbane", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Southern Downs", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Thuringowa", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Toowoomba N", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Townsville", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Traeger", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false },
    { name: "Warrego", party: "oth", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: false }
];

let currentFilter = 'all';

function updateDashboard() {
    const tallyContainer = document.getElementById('bar-rows-container');
    const legendContainer = document.getElementById('map-legend');
    const totals = {};
    const hasSeats = new Set();

    // Reset totals based on config
    Object.keys(PARTY_CONFIG).forEach(code => totals[code] = 0);

    // Calculate actual wins
    seats.forEach(s => {
        if (!s.hidden) {
            totals[s.party]++;
            hasSeats.add(s.party);
        }
    });

    tallyContainer.innerHTML = '';
    legendContainer.innerHTML = '';

    // Automatically generate Bars and Legends
    Object.keys(PARTY_CONFIG).forEach(code => {
        const [fullName, color, masterShow] = PARTY_CONFIG[code];
        
        // Show if master is true OR they have at least 1 seat (Override)
        if (masterShow || hasSeats.has(code)) {
            const width = (totals[code] / 32 * 100);
            
            // Generate Bar HTML
            tallyContainer.innerHTML += `
                <div class="party-row">
                    <div class="party-label">${code.toUpperCase()}</div>
                    <div class="bar-container">
                        <div class="bar" style="width: ${width}%; background-color: ${color};"></div>
                        <span class="count-text">${totals[code]}</span>
                    </div>
                </div>`;

            // Generate Map Legend Dot
            legendContainer.innerHTML += `
                <span class="legend-item">
                    <span class="dot" style="background-color: ${color};"></span> ${code.toUpperCase()}
                </span>`;
        }
    });

    renderSeatList();
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    
    const filtered = seats.filter(s => {
        if (currentFilter === 'doubt') return s.hidden || s.status === "IN DOUBT";
        if (currentFilter === 'changing') return !s.hidden && s.status === "GAIN";
        return true;
    });

    list.innerHTML = filtered.map(s => {
        const config = PARTY_CONFIG[s.party] || ["Unknown", "#444"];
        return `
        <div class="seat-card">
            <div class="seat-info">
                <h3>${s.name}</h3>
                <p>${s.hidden ? 'Calculating live results...' : s.person}</p>
                <span class="badge" style="background-color: ${s.hidden ? '#444' : config[1]}">
                    ${s.hidden ? 'IN DOUBT' : s.party.toUpperCase() + ' ' + s.status}
                </span>
            </div>
            <div class="swing-display">${s.hidden ? '--' : s.swing}</div>
        </div>`;
    }).join('');
}

function setFilter(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-bar span').forEach(el => el.classList.remove('active'));
    document.getElementById('filter-' + type).classList.add('active');
    renderSeatList();
}

// Tab Switching
document.getElementById('btn-tally').onclick = () => toggleView('tally');
document.getElementById('btn-map').onclick = () => toggleView('map');

function toggleView(view) {
    document.getElementById('tally-view').style.display = view === 'tally' ? 'block' : 'none';
    document.getElementById('map-view').style.display = view === 'map' ? 'block' : 'none';
    document.getElementById('btn-tally').classList.toggle('active', view === 'tally');
    document.getElementById('btn-map').classList.toggle('active', view === 'map');
}

// Initial Load
window.onload = updateDashboard;
