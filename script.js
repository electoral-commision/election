const seats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", from: "FROM OTH", swing: "33.3% Gain" },
    { name: "Kooyong", party: "onp", person: "Bumuncha", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Higgins", party: "alp", person: "Thecone", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Fraser", party: "lnp", person: "Chris", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Casey", party: "lnp", person: "officer_chilly", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Monash", party: "lnp", person: "Harley", status: "GAIN", from: "FROM OTH", swing: "100% Gain" },
    { name: "Calwell", party: "alp", person: "kiwi", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
    { name: "Bruce", party: "alp", person: "Awol_21", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" }
];

// SENATE DATA: 6 SEATS TOTAL
const senateData = [
    { label: "LNP", count: 2, color: "#005696" },
    { label: "ALP", count: 2, color: "#e61e2b" },
    { label: "ONP", count: 1, color: "#f7941d" },
    { label: "GRN", count: 1, color: "#009c3d" }
];

const TOTAL_HOUSE_SEATS = 15;
let currentFilter = "all";

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => { if (totals[s.party] !== undefined) totals[s.party]++; });

    const winnerDiv = document.getElementById('election-winner');
    const coalitionTotal = totals.lnp + totals.onp;
    winnerDiv.style.display = "block";

    if (coalitionTotal >= 8) {
        winnerDiv.style.background = "linear-gradient(90deg, #005696 0%, #f7941d 100%)";
        winnerDiv.innerText = "LNP-ONP Coalition Government";
    } else if (totals.alp >= 8) {
        winnerDiv.style.background = "#e61e2b";
        winnerDiv.innerText = "Labor Party Government";
    } else {
        winnerDiv.style.background = "#222";
        winnerDiv.innerText = "Hung Parliament";
    }

    document.getElementById('percent-counted').innerText = `100% counted (${seats.length}/${TOTAL_HOUSE_SEATS})`;
    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);
    renderSeatList();
}

function renderSenateHorshoe() {
    const svg = document.getElementById('senate-svg');
    const legend = document.getElementById('senate-legend');
    svg.innerHTML = '';
    legend.innerHTML = '';

    let seatIndex = 0;
    const totalSenate = 6;

    senateData.forEach(party => {
        legend.innerHTML += `<div class="legend-item"><div class="dot-sample" style="background:${party.color}"></div>${party.label}: ${party.count}</div>`;

        for (let i = 0; i < party.count; i++) {
            // Calculate horseshoe coordinates
            const angle = Math.PI + (seatIndex / (totalSenate - 1)) * Math.PI;
            const radius = 130;
            const cx = 200 + radius * Math.cos(angle);
            const cy = 170 + radius * Math.sin(angle);

            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", cx); dot.setAttribute("cy", cy); dot.setAttribute("r", 12);
            dot.setAttribute("fill", party.color);
            svg.appendChild(dot);
            seatIndex++;
        }
    });
}

function updateBar(id, count) {
    const bar = document.getElementById(`${id}-bar`);
    const label = document.getElementById(`${id}-count`);
    if(label) label.innerText = count;
    if(bar) bar.style.width = (count / TOTAL_HOUSE_SEATS * 100) + "%";
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    seats.forEach(s => {
        if (currentFilter === "doubt" && s.status !== "IN DOUBT") return;
        const card = document.createElement('div');
        card.className = 'seat-card';
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person}</div>
                <div class="badge-row">
                    <span class="badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</span>
                    <span class="from-text">${s.from}</span>
                </div>
            </div>
            <div class="swing-box"><div class="swing-label">${s.swing}</div></div>`;
        list.appendChild(card);
    });
}

document.getElementById('tab-house').onclick = function() {
    this.classList.add('active');
    document.getElementById('tab-senate').classList.remove('active');
    document.getElementById('house-view').style.display = 'block';
    document.getElementById('senate-view').style.display = 'none';
};

document.getElementById('tab-senate').onclick = function() {
    this.classList.add('active');
    document.getElementById('tab-house').classList.remove('active');
    document.getElementById('house-view').style.display = 'none';
    document.getElementById('senate-view').style.display = 'block';
    renderSenateHorshoe();
};

window.onload = updateDashboard;
