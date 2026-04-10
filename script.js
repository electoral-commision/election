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
    { name: "Broadwater", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Bundaberg", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Cairns", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Caloundra", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Cook", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Ferny Grove", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Gregory", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Gympie", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Hill", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Hinchinbrook", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Logan", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Lytton", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Maiwar", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Mansfield", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Maryborough", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "McConnel", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Mirani", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Moggill", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Nanango", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Nicklin", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Noosa", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Nudgee", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Redcliffe", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Rockhampton", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Scenic Rim", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "South Brisbane", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Southern Downs", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Thuringowa", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Toowoomba N", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Townsville", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Traeger", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Warrego", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true }
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
