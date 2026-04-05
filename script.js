// --- ONLY EDIT THE SEATS LIST BELOW ---
// The top bars will update automatically when you add a 'party' to a seat.
const seats = [
    { name: "Melbourne", party: "alp", person: "Bounty", status: "GAIN", from: "", swing: "33%" },
    { name: "Kooyong", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Higgins", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Chisholm", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Macnamara", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Maribyrnong", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Wills", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Fraser", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Dunkley", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Corangamite", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Casey", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "La Trobe", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Monash", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Calwell", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." },
    { name: "Bruce", party: "", person: "", status: "IN DOUBT", from: "", swing: "Counting..." }
];

const TOTAL_SEATS = 15;
let currentFilter = "all";

async function updateDashboard() {
    // 1. Calculate Party Totals based on the seats list above
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => {
        if (s.party === "alp") totals.alp++;
        else if (s.party === "lnp") totals.lnp++;
        else if (s.party === "onp") totals.onp++;
        else if (s.party === "oth") totals.oth++;
    });

    // 2. Update Progress Counter
    const totalCounted = totals.alp + totals.lnp + totals.onp + totals.oth;
    const percent = ((totalCounted / TOTAL_SEATS) * 100).toFixed(1);
    document.getElementById('percent-counted').innerText = `${percent}% counted (${totalCounted}/${TOTAL_SEATS})`;

    // 3. FETCH GITHUB LAST MODIFIED TIME (Automated)
    try {
        const response = await fetch('https://api.github.com/repos/electoral-commision/election/commits?path=script.js&page=1&per_page=1');
        const data = await response.json();
        if (data && data[0]) {
            const commitDate = new Date(data[0].commit.committer.date);
            // Format time as (e.g., 1:41:37 PM)
            const timeString = commitDate.toLocaleTimeString('en-AU', { 
                hour: 'numeric', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });
            document.getElementById('time-display').innerText = `Updated at ${timeString}`;
        }
    } catch (err) {
        console.warn("GitHub API error:", err);
        document.getElementById('time-display').innerText = "Updated Live";
    }

    // 4. Update Bar Visuals
    updateBar("alp", totals.alp);
    updateBar("lnp", totals.lnp);
    updateBar("onp", totals.onp);
    updateBar("oth", totals.oth);

    renderSeatList();
}

function renderSeatList() {
    const list = document.getElementById('seat-list');
    list.innerHTML = "";

    seats.forEach(s => {
        const isInDoubt = (s.party === "" || s.person === "");
        const isChanging = (s.status === "GAIN" || s.status === "WIN" || s.from !== "");

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
                    ${s.from ? `<span class="from-text">${s.from}</span>` : ''}
                </div>
            </div>
            <div class="swing-box">
                <div class="swing-label">${s.swing}</div>
            </div>
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

// Button Listeners
document.getElementById('filter-all').onclick = function() { setFilter('all', this); };
document.getElementById('filter-doubt').onclick = function() { setFilter('doubt', this); };
document.getElementById('filter-changing').onclick = function() { setFilter('changing', this); };

function setFilter(type, el) {
    currentFilter = type;
    document.querySelectorAll('.filter-bar span').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    renderSeatList();
}

window.onload = updateDashboard;
