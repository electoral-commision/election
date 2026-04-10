const seats = [
    { name: "Cairns", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Cook", party: "lnp", person: "Candidate Name", status: "GAIN", from: "ALP", swing: "5.2%" },
    { name: "Burdekin", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "1.0%" },
    { name: "Townsville", party: "onp", person: "Candidate Name", status: "GAIN", from: "ALP", swing: "12.0%" },
    { name: "Traeger", party: "oth", person: "Candidate Name", status: "HOLD", from: "KAP", swing: "0.0%" },
    { name: "Burnett", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Callide", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Gregory", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Maryborough", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Rockhampton", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Warrego", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Toowoomba", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Southern Downs", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Ferny Grove", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "McConnel", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Nudgee", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Redcliffe", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Lytton", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Mansfield", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Moggill", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "South Brisbane", party: "oth", person: "Candidate Name", status: "HOLD", from: "GRN", swing: "0.0%" },
    { name: "Caloundra", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Gympie", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Nanango", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Noosa", party: "oth", person: "Candidate Name", status: "HOLD", from: "IND", swing: "0.0%" },
    { name: "Coomera", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Mudgeeraba", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Surfers Paradise", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" },
    { name: "Redlands", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Ipswich", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Logan", party: "alp", person: "Candidate Name", status: "HOLD", from: "ALP", swing: "0.0%" },
    { name: "Scenic Rim", party: "lnp", person: "Candidate Name", status: "HOLD", from: "LNP", swing: "0.0%" }
];

const TOTAL_SEATS = seats.length;
let currentFilter = "all";

// --- Dashboard Logic ---
async function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => { if (totals[s.party] !== undefined) totals[s.party]++; });

    // Winner Box
    const winnerDiv = document.getElementById('election-winner');
    const coalitionTotal = totals.lnp + totals.onp;
    winnerDiv.style.display = "block";
    
    if (coalitionTotal >= (TOTAL_SEATS / 2)) {
        winnerDiv.className = "winner-box coalition";
        winnerDiv.innerText = "Projected Government: LNP-ONP Coalition";
    } else if (totals.alp >= (TOTAL_SEATS / 2)) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "Projected Government: ALP";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Hung Parliament Likely";
    }

    document.getElementById('percent-counted').innerText = `100% counted (${TOTAL_SEATS}/${TOTAL_SEATS})`;
    
    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);

    renderSeatList();
    colorMap();
}

function updateBar(id, count) {
    const bar = document.getElementById(`${id}-bar`);
    const label = document.getElementById(`${id}-count`);
    if(label) label.innerText = count;
    if(bar) bar.style.width = (count / TOTAL_SEATS * 100) + "%";
}

// --- Map Logic ---
function colorMap() {
    seats.forEach(seat => {
        const path = document.getElementById(seat.name);
        if (path) {
            path.setAttribute('class', `electorate fill-${seat.party}`);
            
            path.onmousemove = (e) => {
                const tip = document.getElementById('map-tooltip');
                tip.style.display = 'block';
                tip.style.left = e.pageX + 15 + 'px';
                tip.style.top = e.pageY + 15 + 'px';
                tip.innerHTML = `<strong>${seat.name}</strong><br>${seat.party.toUpperCase()} ${seat.status}`;
            };
            path.onmouseout = () => document.getElementById('map-tooltip').style.display = 'none';
        }
    });
}

// --- Tab & Filter Logic ---
document.getElementById('btn-tally').onclick = function() {
    this.classList.add('active');
    document.getElementById('btn-map').classList.remove('active');
    document.getElementById('view-tally').style.display = 'block';
    document.getElementById('view-map').style.display = 'none';
};

document.getElementById('btn-map').onclick = function() {
    this.classList.add('active');
    document.getElementById('btn-tally').classList.remove('active');
    document.getElementById('view-tally').style.display = 'none';
    document.getElementById('view-map').style.display = 'block';
};

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    seats.forEach(s => {
        const card = document.createElement('div');
        card.className = 'seat-card';
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person}</div>
                <div class="badge-row">
                    <span class="badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</span>
                    <span class="from-text">FROM ${s.from}</span>
                </div>
            </div>
            <div class="swing-box"><div class="swing-label">${s.swing} Swing</div></div>
        `;
        list.appendChild(card);
    });
}

window.onload = updateDashboard;
