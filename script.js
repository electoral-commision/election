const seats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", from: "FROM OTH", swing: "33.3% Gain" },
    { name: "Kooyong", party: "alp", person: "Bumuncha", status: "GAIN", from: "FROM OTH", swing: "50.0% Gain" },
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

const TOTAL_SEATS = 15;
let currentFilter = "all";

async function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => {
        if (totals[s.party] !== undefined) totals[s.party]++;
    });

    const winnerDiv = document.getElementById('election-winner');
    const coalitionTotal = totals.lnp + totals.onp;
    
    winnerDiv.style.display = "block";
    
    if (coalitionTotal >= 8) {
        winnerDiv.className = "winner-box coalition";
        winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    } else if (totals.alp >= 8) {
        winnerDiv.className = "winner-box alp-win";
        winnerDiv.innerText = "Government Formed: Australian Labor Party";
    } else {
        winnerDiv.className = "winner-box hung";
        winnerDiv.innerText = "Hung Parliament: Negotiations Ongoing";
    }

    const totalCounted = totals.alp + totals.lnp + totals.onp + totals.oth;
    const percent = ((totalCounted / TOTAL_SEATS) * 100).toFixed(1);
    document.getElementById('percent-counted').innerText = `${percent}% counted (${totalCounted}/${TOTAL_SEATS})`;

    try {
        const response = await fetch('https://api.github.com/repos/electoral-commision/election/commits?path=script.js&page=1&per_page=1');
        const data = await response.json();
        if (data && data[0]) {
            const commitDate = new Date(data[0].commit.committer.date);
            const timeString = commitDate.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
            document.getElementById('time-display').innerText = `Updated at ${timeString}`;
        }
    } catch (err) {
        document.getElementById('time-display').innerText = "Updated Live";
    }

    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);

    renderSeatList();
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";
    seats.forEach(s => {
        const isInDoubt = (s.party === "" || s.person === "");
        const isChanging = (s.status === "GAIN" || s.status === "WIN");
        if (currentFilter === "doubt" && !isInDoubt) return;
        if (currentFilter === "changing" && !isChanging) return;

        const card = document.createElement('div');
        card.className = 'seat-card';
        const partyClass = s.party ? `bg-${s.party}` : 'bg-pending';
        card.innerHTML = `
            <div>
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person || "Candidate Pending"}</div>
                <div class="badge-row">
                    <span class="badge ${partyClass}">${s.party ? s.party.toUpperCase() : 'PENDING'} ${s.status}</span>
                    <span class="from-text">${s.from}</span>
                </div>
            </div>
            <div class="swing-box"><div class="swing-label">${s.swing}</div></div>
        `;
        list.appendChild(card);
    });
}

function updateBar(id, count) {
    const bar = document.getElementById(`${id}-bar`);
    const label = document.getElementById(`${id}-count`);
    if(label) label.innerText = count;
    if(bar) bar.style.width = (count / TOTAL_SEATS * 100) + "%";
}

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
