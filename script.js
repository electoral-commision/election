// 1. PARTY CONFIGURATION
const PARTY_CONFIG = {
    alp: ["Australian Labor Party", "#E51F30", true],
    lnp: ["Liberal National Party", "#166FF3", true],
    grn: ["The Greens", "#4E8321", true],
    kap: ["Katter's Australian Party", "#AA6255", true],
    onp: ["One Nation", "#f7941d", true],
    oth: ["Independent / Other", "#757575", true]
};

// 2. ELECTORATE DATA (33 Seats)
const seats = [
    { name: "Cairns", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Cook", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Burdekin", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Townsville", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Traeger", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Burnett", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Callide", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Gregory", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Maryborough", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Rockhampton", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Warrego", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Toowoomba", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Southern Downs", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Ferny Grove", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "McConnel", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Nudgee", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Redcliffe", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Lytton", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Mansfield", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Moggill", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "South Brisbane", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Caloundra", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Gympie", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Nanango", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Noosa", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Coomera", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Mudgeeraba", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Surfers Paradise", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Redlands", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Ipswich", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Logan", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Scenic Rim", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true },
    { name: "Mirani", party: "", person: "Candidate Name", status: "TBD", from: "TBD", swing: "0.0%", hidden: true }
];

let currentFilter = 'all';

async function fetchLastUpdateTime() {
    // REPLACE THESE WITH YOUR REPO DETAILS
    const owner = 'YOUR_USERNAME'; 
    const repo = 'YOUR_REPO_NAME'; 
    const filePath = 'index.html';
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        if (data.length > 0) {
            const commitDate = new Date(data[0].commit.committer.date);
            const formattedDate = commitDate.toLocaleString('en-AU', { 
                day: 'numeric', month: 'short', year: 'numeric', 
                hour: '2-digit', minute: '2-digit', hour12: true 
            });
            document.getElementById('last-updated').innerText = `Updated ${formattedDate}`;
        }
    } catch (error) {
        console.error('GitHub Fetch Error:', error);
        document.getElementById('last-updated').innerText = `Live`;
    }
}

function updateDashboard() {
    const tallyContainer = document.getElementById('bar-rows-container');
    const legendContainer = document.getElementById('map-legend');
    const majorityEl = document.getElementById('majority-count');
    const liveCountEl = document.getElementById('live-count');
    
    const totalSeats = seats.length;
    const countedSeats = seats.filter(s => !s.hidden).length;
    const majorityRequired = Math.floor(totalSeats / 2) + 1;

    if (majorityEl) majorityEl.innerText = majorityRequired;
    if (liveCountEl) liveCountEl.innerText = `${countedSeats} of ${totalSeats} districts counted`;

    const totals = {};
    const hasSeats = new Set();
    Object.keys(PARTY_CONFIG).forEach(code => totals[code] = 0);

    seats.forEach(s => {
        if (!s.hidden) {
            totals[s.party]++;
            hasSeats.add(s.party);
        }
    });

    tallyContainer.innerHTML = '';
    legendContainer.innerHTML = '';

    Object.keys(PARTY_CONFIG).forEach(code => {
        const [fullName, color, masterShow] = PARTY_CONFIG[code];
        if (masterShow || hasSeats.has(code)) {
            const width = (totals[code] / totalSeats * 100);
            tallyContainer.innerHTML += `
                <div class="party-row">
                    <div class="party-label">${code.toUpperCase()}</div>
                    <div class="bar-container">
                        <div class="bar" style="width: ${width}%; background-color: ${color};"></div>
                        <span class="count-text">${totals[code]}</span>
                    </div>
                </div>`;

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

document.getElementById('btn-tally').onclick = () => toggleView('tally');
document.getElementById('btn-map').onclick = () => toggleView('map');

function toggleView(view) {
    document.getElementById('tally-view').style.display = view === 'tally' ? 'block' : 'none';
    document.getElementById('map-view').style.display = view === 'map' ? 'block' : 'none';
    document.getElementById('btn-tally').classList.toggle('active', view === 'tally');
    document.getElementById('btn-map').classList.toggle('active', view === 'map');
}

window.onload = () => {
    updateDashboard();
    fetchLastUpdateTime();
};
