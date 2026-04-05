const seats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "RETAIN", from: "", swing: "5.7% swing to ALP", type: "house" },
    { name: "Narungga", party: "onp", person: "Bumuncha", status: "GAIN", from: "FROM IND", swing: "8.0% swing to LIB", type: "house" },
    { name: "Higgins", party: "alp", person: "Thecone", status: "RETAIN", from: "", swing: "3.2% swing to ALP", type: "house" },
    { name: "Chisholm", party: "onp", person: "Triple G gaming", status: "GAIN", from: "FROM OTH", swing: "12.0% swing to ONP", type: "house" },
    { name: "Macnamara", party: "onp", person: "itsmerealdd", status: "GAIN", from: "FROM OTH", swing: "15.4% swing to ONP", type: "house" },
    { name: "Maribyrnong", party: "lnp", person: "2023 Toyota Camry", status: "GAIN", from: "FROM OTH", swing: "10.0% swing to LIB", type: "house" },
    { name: "Wills", party: "lnp", person: "Nswsteamtrainfan10", status: "GAIN", from: "FROM OTH", swing: "9.5% swing to LIB", type: "house" },
    { name: "Fraser", party: "lnp", person: "Chris", status: "GAIN", from: "FROM OTH", swing: "11.0% swing to LIB", type: "house" },
    { name: "Dunkley", party: "alp", person: "Jehrhfdhdhhfhdj", status: "RETAIN", from: "", swing: "2.1% swing to ALP", type: "house" },
    { name: "Corangamite", party: "alp", person: "nathantombleson2024", status: "RETAIN", from: "", swing: "4.5% swing to ALP", type: "house" },
    { name: "Casey", party: "lnp", person: "officer_chilly", status: "RETAIN", from: "", swing: "1.2% swing to LIB", type: "house" },
    { name: "La Trobe", party: "alp", person: "BanditNinja", status: "RETAIN", from: "", swing: "6.7% swing to ALP", type: "house" },
    { name: "Monash", party: "lnp", person: "Harley", status: "RETAIN", from: "", swing: "0.5% swing to LIB", type: "house" },
    { name: "Calwell", party: "alp", person: "kiwi", status: "RETAIN", from: "", swing: "3.3% swing to ALP", type: "house" },
    { name: "Bruce", party: "alp", person: "Awol_21", status: "RETAIN", from: "", swing: "5.0% swing to ALP", type: "house" },
    // Senate
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 2", party: "lnp", person: "hitheresam", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 3", party: "onp", person: "Reald", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 4", party: "alp", person: "jeffery_harrold1", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 5", party: "onp", person: "siua10011", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 6", party: "alp", person: "asperytravel", status: "ELECTED", from: "", swing: "Quota Met", type: "senate" }
];

function switchView(view) {
    document.getElementById('house-view').style.display = (view === 'house') ? 'block' : 'none';
    document.getElementById('senate-view').style.display = (view === 'senate') ? 'block' : 'none';
    document.getElementById('btn-house').className = (view === 'house') ? 'tab-btn active' : 'tab-btn';
    document.getElementById('btn-senate').className = (view === 'senate') ? 'tab-btn active' : 'tab-btn';
    if(view === 'senate') drawSenateHorshoe();
    renderSeatList(view);
}

function drawSenateHorshoe() {
    const container = document.getElementById('senate-dots');
    container.innerHTML = "";
    const colors = { alp: "#e61e2b", lnp: "#005696", onp: "#f7941d" };
    const order = ["alp", "lnp", "onp"];
    const senateSeats = seats.filter(s => s.type === "senate").sort((a,b) => order.indexOf(a.party) - order.indexOf(b.party));
    senateSeats.forEach((s, i) => {
        const angle = Math.PI - (i * (Math.PI / (senateSeats.length - 1)));
        const x = 100 + 75 * Math.cos(angle);
        const y = 100 - 75 * Math.sin(angle);
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x); circle.setAttribute("cy", y); circle.setAttribute("r", 9);
        circle.setAttribute("fill", colors[s.party]);
        container.appendChild(circle);
    });
}

function renderSeatList(viewType) {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    seats.filter(s => s.type === viewType).forEach(s => {
        const card = document.createElement('div');
        card.className = 'seat-row-card';
        card.innerHTML = `
            <div class="seat-info">
                <h3>${s.name}</h3>
                <div class="seat-status-line">
                    <span class="status-badge bg-${s.party}">${s.party.toUpperCase()} ${s.status}</span>
                    <span class="from-tag">${s.from}</span>
                </div>
                <p class="candidate-name">${s.person}</p>
            </div>
            <div class="seat-swing">
                <div class="gauge-placeholder party-border-${s.party}"></div>
                <span>${s.swing}</span>
            </div>
        `;
        list.appendChild(card);
    });
}

window.onload = () => {
    document.getElementById('alp-count').innerText = "7";
    document.getElementById('lnp-count').innerText = "5";
    document.getElementById('onp-count').innerText = "3";
    document.getElementById('alp-bar').style.width = "46.6%";
    document.getElementById('lnp-bar').style.width = "33.3%";
    document.getElementById('onp-bar').style.width = "20%";
    
    const winner = document.getElementById('election-winner');
    winner.innerText = "Government Formed: LNP-ONP Coalition";
    winner.style.background = "linear-gradient(90deg, #005696, #f7941d)";

    switchView('house');
};
