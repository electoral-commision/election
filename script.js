const seats = [
    { name: "Cairns", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "2.1% Swing", hidden: true },
    { name: "Cook", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "1.5% Swing", hidden: true },
    { name: "Burdekin", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.8% Swing", hidden: true },
    { name: "Townsville", party: "onp", person: "Candidate Name", status: "GAIN", from: "ALP", swing: "12.4% Swing", hidden: true },
    { name: "Traeger", party: "oth", person: "Candidate Name", status: "HOLD", from: "KAP", swing: "0.0% Swing", hidden: true },
    { name: "Burnett", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Callide", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Gregory", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Maryborough", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Rockhampton", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Warrego", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Toowoomba", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Southern Downs", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Ferny Grove", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "McConnel", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Nudgee", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Redcliffe", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Lytton", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Mansfield", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Moggill", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "South Brisbane", party: "oth", person: "Candidate Name", status: "HOLD", from: "GRN", swing: "0.0% Swing", hidden: true },
    { name: "Caloundra", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Gympie", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Nanango", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Noosa", party: "oth", person: "Candidate Name", status: "HOLD", from: "IND", swing: "0.0% Swing", hidden: true },
    { name: "Coomera", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Mudgeeraba", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Surfers Paradise", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true },
    { name: "Redlands", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Ipswich", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Logan", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0% Swing", hidden: true },
    { name: "Scenic Rim", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0% Swing", hidden: true }
];

const TOTAL_SEATS = 32;
let currentFilter = 'all';

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    
    // Only tally if NOT hidden
    seats.forEach(s => { 
        if (!s.hidden && totals[s.party] !== undefined) totals[s.party]++; 
    });

    const revealedCount = seats.filter(s => !s.hidden).length;
    const winnerDiv = document.getElementById('election-winner');
    const coalition = totals.lnp + totals.onp;

    if (revealedCount === 0) {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Awaiting First Results...";
    } else if (coalition >= 17) {
        winnerDiv.className = "winner-box coalition";
        winnerDiv.innerText = "Projected: LNP-ONP Coalition Government";
    } else if (totals.alp >= 17) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "Projected: ALP Majority Government";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Live Count in Progress";
    }

    document.getElementById('percent-counted').innerText = `${revealedCount} of ${TOTAL_SEATS} Declared`;

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
        if (currentFilter === 'doubt') return s.status === "IN DOUBT";
        if (currentFilter === 'changing') return s.status === "GAIN";
        return true;
    });

    list.innerHTML = filtered.map(s => {
        const name = s.hidden ? "CALCULATING..." : s.person;
        const status = s.hidden ? "WAITING FOR DATA" : `${s.party.toUpperCase()} ${s.status}`;
        const swing = s.hidden ? "---" : s.swing;
        const colorClass = s.hidden ? "oth" : s.party;

        return `
            <div class="seat-card" style="${s.hidden ? 'opacity: 0.7;' : ''}">
                <div>
                    <div class="seat-name">${s.name}</div>
                    <div class="person-name">${name}</div>
                    <div class="badge-row">
                        <span class="badge bg-${colorClass}">${status}</span>
                        <span class="from-text">${s.hidden ? "" : "FROM " + s.from}</span>
                    </div>
                </div>
                <div class="swing-label">${swing}</div>
            </div>
        `;
    }).join('');
}

// Controls
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
