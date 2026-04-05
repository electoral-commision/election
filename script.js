const seats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", from: "FROM OTH", swing: "33.3% Gain", type: "house" },
    { name: "Kooyong", party: "onp", person: "Bumuncha", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "Higgins", party: "alp", person: "Thecone", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Fraser", party: "lnp", person: "Chris", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "Casey", party: "lnp", person: "officer_chilly", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Monash", party: "lnp", person: "Harley", status: "GAIN", from: "FROM OTH", swing: "100% Gain", type: "house" },
    { name: "Calwell", party: "alp", person: "kiwi", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },
    { name: "Bruce", party: "alp", person: "Awol_21", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain", type: "house" },

    // SENATORS
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", status: "ELECTED", from: "SENATE", type: "senate" },
    { name: "Senate Seat 2", party: "lnp", person: "hitheresam", status: "ELECTED", from: "SENATE", type: "senate" },
    { name: "Senate Seat 3", party: "onp", person: "Reald", status: "ELECTED", from: "SENATE", type: "senate" },
    { name: "Senate Seat 4", party: "alp", person: "jeffery_harrold1", status: "ELECTED", from: "SENATE", type: "senate" },
    { name: "Senate Seat 5", party: "onp", person: "siua10011", status: "ELECTED", from: "SENATE", type: "senate" },
    { name: "Senate Seat 6", party: "alp", person: "asperytravel", status: "ELECTED", from: "SENATE", type: "senate" }
];

function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0 };
    const senateList = [];

    seats.forEach(s => {
        if (s.type === "house") {
            totals[s.party]++;
        } else {
            senateList.push(s);
        }
    });

    // House Winner Logic
    const winnerDiv = document.getElementById('election-winner');
    const coalition = totals.lnp + totals.onp;
    winnerDiv.style.display = "block";
    if (coalition >= 8) {
        winnerDiv.style.background = "linear-gradient(90deg, #005696, #f7941d)";
        winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    }

    // Progress Bar
    document.getElementById('percent-counted').innerText = `100% counted (${totals.alp + totals.lnp + totals.onp}/15)`;
    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);

    drawSenateHorshoe(senateList);
    renderSeatList();
}

function drawSenateHorshoe(senators) {
    const container = document.getElementById('senate-dots');
    container.innerHTML = "";
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    
    const radius = 70;
    const centerX = 100;
    const centerY = 90;

    senators.forEach((s, i) => {
        // Calculate angle from 180 to 0 degrees
        const angle = Math.PI - (i * (Math.PI / (senators.length - 1)));
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 8);
        circle.setAttribute("fill", colors[s.party]);
        container.appendChild(circle);
    });
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    seats.forEach(s => {
        const card = document.createElement('div');
        card.className = `seat-card ${s.type === 'senate' ? 'senate-style' : ''}`;
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name} ${s.type === 'senate' ? ' (SENATE)' : ''}</div>
                <div class="person-name">${s.person}</div>
                <div class="badge-row">
                    <span class="badge bg-${s.party}">${s.party.toUpperCase()}</span>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function updateBar(id, count) {
    document.getElementById(`${id}-count`).innerText = count;
    document.getElementById(`${id}-bar`).style.width = (count / 15 * 100) + "%";
}

window.onload = updateDashboard;
