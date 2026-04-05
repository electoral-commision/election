// --- SEAT DATA ---
const seats = [
    // HOUSE OF REPRESENTATIVES (These count toward the 15 total)
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

    // SENATE (These appear in the list but DO NOT count toward the 15 total)
    { name: "Senate Seat 1", party: "alp", person: "itxw4sley._.", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 2", party: "lnp", person: "hitheresam", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 3", party: "onp", person: "Reald", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 4", party: "alp", person: "jeffery_harrold1", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 5", party: "onp", person: "siua10011", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" },
    { name: "Senate Seat 6", party: "alp", person: "asperytravel", status: "ELECTED", from: "SENATE", swing: "Quota Met", type: "senate" }
];

const TOTAL_HOUSE_SEATS = 15;
let currentFilter = "all";

async function updateDashboard() {
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    
    // Only tally 'house' type seats for the progress bars
    seats.forEach(s => {
        if (s.type === "house" && totals[s.party] !== undefined) {
            totals[s.party]++;
        }
    });

    // Coalition Logic: LNP + ONP
    const winnerDiv = document.getElementById('election-winner');
    const coalitionTotal = totals.lnp + totals.onp;
    winnerDiv.style.display = "block";
    
    if (coalitionTotal >= 8) {
        winnerDiv.style.background = "linear-gradient(90deg, #005696 0%, #f7941d 100%)";
        winnerDiv.style.color = "white";
        winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    } else if (totals.alp >= 8) {
        winnerDiv.style.background = "#e61e2b";
        winnerDiv.style.color = "white";
        winnerDiv.innerText = "Government Formed: Australian Labor Party";
    } else {
        winnerDiv.style.background = "#333";
        winnerDiv.style.color = "#eee";
        winnerDiv.innerText = "Hung Parliament: Negotiations Ongoing";
    }

    // Progress Counter (House Seats Only)
    const totalHouseCounted = totals.alp + totals.lnp + totals.onp + totals.oth;
    const percent = ((totalHouseCounted / TOTAL_HOUSE_SEATS) * 100).toFixed(1);
    document.getElementById('percent-counted').innerText = `${percent}% counted (${totalHouseCounted}/${TOTAL_HOUSE_SEATS})`;

    // GitHub Time Sync
    try {
        const response = await fetch('https://api.github.com/repos/electoral-commision/election/commits?path=script.js&page=1&per_page=1');
        const data = await response.json();
        if (data && data[0]) {
            const commitDate = new Date(data[0].commit.committer.date);
            const timeString = commitDate.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
            document.getElementById('time-display').innerText = `Updated at ${timeString}`;
        }
    } catch (err) {
        document.getElementById('time-display').innerText = "Updated Live";
    }

    // Update Bar Graphics
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
        const isChanging = (s.status === "GAIN");

        if (currentFilter === "doubt" && !isInDoubt) return;
        if (currentFilter === "changing" && !isChanging) return;

        const card = document.createElement('div');
        // Apply special class if it's a Senate seat
        card.className = `seat-card ${s.type === 'senate' ? 'senate-style' : ''}`;
        
        const partyClass = s.party ? `bg-${s.party}` : 'bg-pending';
        
        card.innerHTML = `
            <div>
                ${s.type === 'senate' ? '<span class="senate-label">FEDERAL SENATE</span>' : ''}
                <div class="seat-name">${s.name}</div>
                <div class="person-name">${s.person}</div>
                <div class="badge-row">
                    <span class="badge ${partyClass}">${s.party.toUpperCase()} ${s.status}</span>
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
    if(bar) bar.style.width = (count / TOTAL_HOUSE_SEATS * 100) + "%";
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
