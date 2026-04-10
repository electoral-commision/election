// 1. PARTY CONFIGURATION
// [Full Name, Hex Color, Master Visibility (true = always show bar)]
const PARTY_CONFIG = {
    alp: ["Australian Labor Party", "#e61e2b", true],
    lnp: ["Liberal National Party", "#005696", true],
    grn: ["The Greens", "#539c35", true],
    kap: ["Katter's Australian Party", "#a54d44", true],
    onp: ["One Nation", "#f7941d", true],
    oth: ["Independent / Other", "#666666", true]
};

// 2. ELECTORATE DATA
const seats = [
    { name: "Cairns", party: "alp", person: "Michael Healy", status: "HOLD", from: "ALP", swing: "2.1%", hidden: false },
    { name: "Cook", party: "alp", person: "Cynthia Lui", status: "HOLD", from: "ALP", swing: "1.5%", hidden: false },
    { name: "Townsville", party: "alp", person: "Scott Stewart", status: "HOLD", from: "ALP", swing: "3.2%", hidden: false },
    { name: "Broadwater", party: "lnp", person: "David Crisafulli", status: "HOLD", from: "LNP", swing: "5.6%", hidden: false },
    { name: "South Brisbane", party: "grn", person: "Amy MacMahon", status: "HOLD", from: "GRN", swing: "0.5%", hidden: false },
    { name: "Traeger", party: "kap", person: "Robbie Katter", status: "HOLD", from: "KAP", swing: "0.0%", hidden: false },
    { name: "Mirani", party: "onp", person: "Stephen Andrew", status: "HOLD", from: "ONP", swing: "2.3%", hidden: false },
    { name: "Thuringowa", party: "alp", person: "Aaron Harper", status: "HOLD", from: "ALP", swing: "8.4%", hidden: false },
    { name: "Rockhampton", party: "alp", person: "Barry O'Rourke", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Maryborough", party: "alp", person: "Bruce Saunders", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Gregory", party: "lnp", person: "Lachlan Millar", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Maiwar", party: "grn", person: "Michael Berkman", status: "HOLD", from: "GRN", swing: "1.1%", hidden: false },
    { name: "Hinchinbrook", party: "kap", person: "Nick Dametto", status: "HOLD", from: "KAP", swing: "1.2%", hidden: false },
    { name: "Hill", party: "kap", person: "Shane Knuth", status: "HOLD", from: "KAP", swing: "0.8%", hidden: false },
    { name: "Bundaberg", party: "lnp", person: "Tom Smith", status: "HOLD", from: "ALP", swing: "4.2%", hidden: false },
    { name: "Nicklin", party: "lnp", person: "Marty Hunt", status: "HOLD", from: "ALP", swing: "2.7%", hidden: false },
    { name: "Warrego", party: "lnp", person: "Ann Leahy", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Toowoomba N", party: "lnp", person: "Trevor Watts", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Southern Downs", party: "lnp", person: "James Lister", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Ferny Grove", party: "alp", person: "Mark Furner", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "McConnel", party: "alp", person: "Grace Grace", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Nudgee", party: "alp", person: "Leanne Linard", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Redcliffe", party: "alp", person: "Yvette D'Ath", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Lytton", party: "alp", person: "Joan Pease", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Mansfield", party: "alp", person: "Corrine McMillan", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Moggill", party: "lnp", person: "Christian Rowan", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Caloundra", party: "alp", person: "Jason Hunt", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Gympie", party: "lnp", person: "Tony Perrett", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Nanango", party: "lnp", person: "Deb Frecklington", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false },
    { name: "Noosa", party: "oth", person: "Sandy Bolton", status: "HOLD", from: "IND", swing: "0.0%", hidden: false },
    { name: "Logan", party: "alp", person: "Linus Power", status: "HOLD", from: "ALP", swing: "0.0%", hidden: false },
    { name: "Scenic Rim", party: "lnp", person: "Jon Krause", status: "HOLD", from: "LNP", swing: "0.0%", hidden: false }
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
