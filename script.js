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
        winnerDiv.innerText = "LNP-ONP COALITION GOVERNMENT";
    } else if (totals.alp >= 17) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "ALP MAJORITY GOVERNMENT";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "HUNG PARLIAMENT";
    }

    // Update Progress Bars
    ["alp", "lnp", "onp"].forEach(id => {
        const count = totals[id];
        document.getElementById(`${id}-count`).innerText = count;
        document.getElementById(`${id}-bar`).style.width = (count / TOTAL_SEATS * 100) + "%";
    });

    // Render Seat List
    const list = document.getElementById('seat-list');
    list.innerHTML = seats.map(s => `
        <div class="seat-card">
            <strong>${s.name}</strong>
            <span class="badge ${s.party}">${s.party.toUpperCase()} ${s.status}</span>
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

window.onload = updateDashboard;
