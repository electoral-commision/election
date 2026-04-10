const seats = [
    { name: "Cairns", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Cook", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Burdekin", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Townsville", party: "oth", person: "Candidate", status: "GAIN", from: "ALP", swing: "12.5%" },
    { name: "Traeger", party: "oth", person: "Candidate", status: "HOLD", from: "KAP", swing: "0.0%" },
    { name: "Burnett", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Callide", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Gregory", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Maryborough", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Rockhampton", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Warrego", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Toowoomba", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Southern Downs", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Ferny Grove", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "McConnel", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Nudgee", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Redcliffe", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Lytton", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Mansfield", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Moggill", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "South Brisbane", party: "oth", person: "Candidate", status: "HOLD", from: "GRN", swing: "0.0%" },
    { name: "Caloundra", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Gympie", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Nanango", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Noosa", party: "oth", person: "Candidate", status: "HOLD", from: "IND", swing: "0.0%" },
    { name: "Coomera", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Mudgeeraba", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Surfers Paradise", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Redlands", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Ipswich", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Logan", party: "oth", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Scenic Rim", party: "oth", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" }
];

const TOTAL_SEATS = 32;
let currentFilter = 'all';

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => { if (totals[s.party] !== undefined) totals[s.party]++; });

    // Winner Box Logic
    const winnerDiv = document.getElementById('election-winner');
    const coalition = totals.lnp + totals.onp;
    
    if (coalition >= 17) {
        winnerDiv.className = "winner-box coalition";
        winnerDiv.innerText = "Projected: LNP-ONP Coalition Government";
    } else if (totals.alp >= 17) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "Projected: ALP Majority Government";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Hung Parliament: Negotiations Ongoing";
    }

    document.getElementById('percent-counted').innerText = `100% counted (${TOTAL_SEATS}/${TOTAL_SEATS})`;

    // Update Bars
    ["alp", "lnp", "onp"].forEach(p => {
        document.getElementById(`${p}-count`).innerText = totals[p];
        document.getElementById(`${p}-bar`).style.width = (totals[p] / TOTAL_SEATS * 100) + "%";
    });

    renderSeatList();
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    
    const filtered = seats.filter(s => {
        if (currentFilter === 'doubt') return s.status === "IN DOUBT" || s.person === "";
        if (currentFilter === 'changing') return s.status === "GAIN";
        return true;
    });

    list.innerHTML = filtered.map(s => `
        <div class="seat-card">
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person || "Candidate Pending"}</div>
                <div class="badge-row">
                    <span class="badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</span>
                    <span class="from-text">FROM ${s.from}</span>
                </div>
            </div>
            <div class="swing-label">${s.swing}</div>
        </div>
    `).join('');
}

// Tab Controls
document.getElementById('btn-tally').onclick = () => {
    document.getElementById('view-tally').style.display = 'block';
    document.getElementById('view-map').style.display = 'none';
    document.getElementById('btn-tally').classList.add('active');
    document.getElementById('btn-map').classList.remove('active');
};

document.getElementById('btn-map').onclick = () => {
    document.getElementById('view-tally').style.display = 'none';
    document.getElementById('view-map').style.display = 'block';
    document.getElementById('btn-map').classList.add('active');
    document.getElementById('btn-tally').classList.remove('active');
};

// Filter Controls
function setFilter(type, el) {
    currentFilter = type;
    document.querySelectorAll('.filter-bar span').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    renderSeatList();
}

document.getElementById('filter-all').onclick = function() { setFilter('all', this); };
document.getElementById('filter-doubt').onclick = function() { setFilter('doubt', this); };
document.getElementById('filter-changing').onclick = function() { setFilter('changing', this); };

window.onload = updateDashboard;
