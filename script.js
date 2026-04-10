const seats = [
    { name: "Cairns", party: "alp", person: "Michael Healy", status: "HOLD", from: "ALP", swing: "2.1%", hidden: true },
    { name: "Cook", party: "alp", person: "Cynthia Lui", status: "HOLD", from: "ALP", swing: "1.5%", hidden: true },
    { name: "Townsville", party: "alp", person: "Scott Stewart", status: "HOLD", from: "ALP", swing: "3.2%", hidden: true },
    { name: "Traeger", party: "kap", person: "Robbie Katter", status: "HOLD", from: "KAP", swing: "0.0%", hidden: true },
    { name: "South Brisbane", party: "grn", person: "Amy MacMahon", status: "HOLD", from: "GRN", swing: "0.5%", hidden: true },
    { name: "Broadwater", party: "lnp", person: "David Crisafulli", status: "HOLD", from: "LNP", swing: "5.6%", hidden: true },
    { name: "Hinchinbrook", party: "kap", person: "Nick Dametto", status: "HOLD", from: "KAP", swing: "1.2%", hidden: true },
    { name: "Hill", party: "kap", person: "Shane Knuth", status: "HOLD", from: "KAP", swing: "0.8%", hidden: true },
    { name: "Mirani", party: "onp", person: "Stephen Andrew", status: "HOLD", from: "ONP", swing: "2.3%", hidden: true },
    { name: "Maiwar", party: "grn", person: "Michael Berkman", status: "HOLD", from: "GRN", swing: "1.1%", hidden: true },
    { name: "Gregory", party: "lnp", person: "Lachlan Millar", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Maryborough", party: "alp", person: "Bruce Saunders", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Rockhampton", party: "alp", person: "Barry O'Rourke", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Warrego", party: "lnp", person: "Ann Leahy", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Toowoomba N", party: "lnp", person: "Trevor Watts", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Southern Downs", party: "lnp", person: "James Lister", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Ferny Grove", party: "alp", person: "Mark Furner", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "McConnel", party: "alp", person: "Grace Grace", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Nudgee", party: "alp", person: "Leanne Linard", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Redcliffe", party: "alp", person: "Yvette D'Ath", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Lytton", party: "alp", person: "Joan Pease", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Mansfield", party: "alp", person: "Corrine McMillan", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Moggill", party: "lnp", person: "Christian Rowan", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Caloundra", party: "alp", person: "Jason Hunt", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Gympie", party: "lnp", person: "Tony Perrett", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Nanango", party: "lnp", person: "Deb Frecklington", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Noosa", party: "oth", person: "Sandy Bolton", status: "HOLD", from: "IND", swing: "0.0%", hidden: true },
    { name: "Coomera", party: "lnp", person: "Michael Crandon", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Mudgeeraba", party: "lnp", person: "Ros Bates", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Surfers Paradise", party: "lnp", person: "John-Paul Langbroek", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true },
    { name: "Logan", party: "alp", person: "Linus Power", status: "HOLD", from: "ALP", swing: "0.0%", hidden: true },
    { name: "Scenic Rim", party: "lnp", person: "Jon Krause", status: "HOLD", from: "LNP", swing: "0.0%", hidden: true }
];

const TOTAL_SEATS = 32;
let currentFilter = 'all';

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, grn: 0, kap: 0, onp: 0, oth: 0 };
    seats.forEach(s => { if (!s.hidden) totals[s.party]++; });

    Object.keys(totals).forEach(p => {
        const bar = document.getElementById(`${p}-bar`);
        const count = document.getElementById(`${p}-count`);
        if (bar) {
            bar.style.width = (totals[p] / TOTAL_SEATS * 100) + "%";
            count.innerText = totals[p];
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

    list.innerHTML = filtered.map(s => `
        <div class="seat-card">
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.hidden ? 'Calculating results...' : s.person}</div>
                <span class="badge ${s.hidden ? 'oth' : s.party}">
                    ${s.hidden ? 'IN DOUBT' : s.party.toUpperCase() + ' ' + s.status}
                </span>
            </div>
            <div class="swing-text">${s.hidden ? '--' : s.swing + ' swing'}</div>
        </div>
    `).join('');
}

function setFilter(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-bar span').forEach(el => el.classList.remove('active'));
    document.getElementById('filter-' + type).classList.add('active');
    renderSeatList();
}

window.onload = updateDashboard;
