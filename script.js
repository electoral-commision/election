const seats = [
    { name: "Cairns", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Cook", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Burdekin", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Townsville", party: "onp", person: "Candidate", status: "GAIN", from: "ALP", swing: "12.5%" },
    { name: "Traeger", party: "oth", person: "Candidate", status: "HOLD", from: "KAP", swing: "0.0%" },
    { name: "Burnett", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Callide", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Gregory", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Maryborough", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Rockhampton", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Warrego", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Toowoomba", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Southern Downs", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Ferny Grove", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "McConnel", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Nudgee", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Redcliffe", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Lytton", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Mansfield", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Moggill", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "South Brisbane", party: "oth", person: "Candidate", status: "HOLD", from: "GRN", swing: "0.0%" },
    { name: "Caloundra", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Gympie", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Nanango", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Noosa", party: "oth", person: "Candidate", status: "HOLD", from: "IND", swing: "0.0%" },
    { name: "Coomera", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Mudgeeraba", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Surfers Paradise", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Redlands", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Ipswich", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Logan", party: "alp", person: "Candidate", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Scenic Rim", party: "lnp", person: "Candidate", status: "HOLD", from: "LNP", swing: "0.0%" }
];

const TOTAL_SEATS = 32;

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => { if (totals[s.party] !== undefined) totals[s.party]++; });

    // Winner Box
    const winnerDiv = document.getElementById('election-winner');
    const coalition = totals.lnp + totals.onp;
    
    if (coalition >= 17) {
        winnerDiv.className = "winner-box coalition";
        winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    } else if (totals.alp >= 17) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "Government Formed: ALP Majority";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Hung Parliament";
    }

    // Update Bars
    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);

    renderSeatList();
    colorMap();
}

function updateBar(id, count) {
    const bar = document.getElementById(`${id}-bar`);
    const label = document.getElementById(`${id}-count`);
    label.innerText = count;
    bar.style.width = (count / TOTAL_SEATS * 100) + "%";
}

function colorMap() {
    seats.forEach(seat => {
        const path = document.getElementById(seat.name);
        if (path) {
            path.setAttribute('class', `electorate fill-${seat.party}`);
            path.onmouseover = (e) => {
                const tip = document.getElementById('map-tooltip');
                tip.style.display = 'block';
                tip.innerHTML = `<strong>${seat.name}</strong><br>${seat.party.toUpperCase()}`;
            };
            path.onmousemove = (e) => {
                const tip = document.getElementById('map-tooltip');
                tip.style.left = e.pageX + 15 + 'px';
                tip.style.top = e.pageY + 15 + 'px';
            };
            path.onmouseout = () => {
                document.getElementById('map-tooltip').style.display = 'none';
            };
        }
    });
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = seats.map(s => `
        <div class="seat-card">
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</div>
            </div>
            <div class="swing-label">${s.swing} Swing</div>
        </div>
    `).join('');
}

// Tab Switching
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
    colorMap();
};

window.onload = updateDashboard;
