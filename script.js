const seats = [
    // HOUSE DISTRICTS (7 ALP, 5 LNP, 3 ONP)
    { name: "Melbourne", party: "alp", person: "Bounty", type: "house" },
    { name: "Higgins", party: "alp", person: "Thecone", type: "house" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", type: "house" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", type: "house" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", type: "house" },
    { name: "Calwell", party: "alp", person: "kiwi", type: "house" },
    { name: "Bruce", party: "alp", person: "Awol_21", type: "house" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", type: "house" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", type: "house" },
    { name: "Fraser", party: "lnp", person: "Chris", type: "house" },
    { name: "Casey", party: "lnp", person: "officer_chilly", type: "house" },
    { name: "Monash", party: "lnp", person: "Harley", type: "house" },
    { name: "Kooyong", party: "onp", person: "Bumuncha", type: "house" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", type: "house" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", type: "house" },

    // SENATE SEATS
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", type: "senate" },
    { name: "Senate Seat 2", party: "alp", person: "jeffery_harrold1", type: "senate" },
    { name: "Senate Seat 3", party: "alp", person: "asperytravel", type: "senate" },
    { name: "Senate Seat 4", party: "lnp", person: "hitheresam", type: "senate" },
    { name: "Senate Seat 5", party: "onp", person: "Reald", type: "senate" },
    { name: "Senate Seat 6", party: "onp", person: "siua10011", type: "senate" }
];

function switchView(view) {
    const houseEl = document.getElementById('house-view');
    const senateEl = document.getElementById('senate-view');
    const btnHouse = document.getElementById('btn-house');
    const btnSenate = document.getElementById('btn-senate');

    if (view === 'house') {
        houseEl.style.display = 'block';
        senateEl.style.display = 'none';
        btnHouse.classList.add('active');
        btnSenate.classList.remove('active');
    } else {
        houseEl.style.display = 'none';
        senateEl.style.display = 'block';
        btnHouse.classList.remove('active');
        btnSenate.classList.add('active');
        drawSenateHorshoe();
    }
    renderSeatList(view);
}

function drawSenateHorshoe() {
    const container = document.getElementById('senate-dots');
    container.innerHTML = "";
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    
    // Sort so Red is Left, Blue is Middle, Orange is Right
    const order = ["alp", "lnp", "onp"];
    const senateSeats = seats
        .filter(s => s.type === "senate")
        .sort((a, b) => order.indexOf(a.party) - order.indexOf(b.party));

    const radius = 75;
    const centerX = 100;
    const centerY = 100;

    senateSeats.forEach((s, i) => {
        const angle = Math.PI - (i * (Math.PI / (senateSeats.length - 1)));
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 9);
        circle.setAttribute("fill", colors[s.party]);
        container.appendChild(circle);
    });
}

function renderSeatList(viewType) {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    
    seats.filter(s => s.type === viewType).forEach(s => {
        const card = document.createElement('div');
        card.className = 'seat-card';
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person}</div>
                <span class="badge bg-${s.party}">${s.party.toUpperCase()}</span>
            </div>
        `;
        list.appendChild(card);
    });
}

function init() {
    const winnerDiv = document.getElementById('election-winner');
    winnerDiv.style.background = "linear-gradient(90deg, #005696, #f7941d)";
    winnerDiv.style.color = "white";
    winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    
    // Set time
    const now = new Date();
    document.getElementById('time-display').innerText = "Updated at " + now.toLocaleTimeString();
    
    switchView('house');
}

window.onload = init;
