// --- ONLY EDIT THE SEATS LIST BELOW ---
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

const TOTAL_SEATS = 15;
let currentFilter = "all";

async function updateDashboard() {
    // 1. Calculate Totals
    const totals = { alp: 0, lnp: 0, onp: 0, oth: 0 };
    seats.forEach(s => {
        if (totals[s.party] !== undefined) totals[s.party]++;
    });

    // 2. Winner Logic (Coalition: LNP + ONP)
    const winnerDiv = document.getElementById('election-winner');
    const coalitionTotal = totals.lnp + totals.onp;
    
    winnerDiv.style.display = "block";
    
    if (coalitionTotal >= 8) {
        // Gradient from LNP Blue to ONP Orange
        winnerDiv.style.background = "linear-gradient(90deg, #005696 0%, #f7941d 100%)";
        winnerDiv.style.color = "white";
        winnerDiv.innerText = "Government Formed: LNP-ONP Coalition";
    } else if (totals.alp >= 8) {
        winnerDiv.style.background = "#e61e2b"; // ALP Red
        winnerDiv.style.color = "white";
        winnerDiv.innerText = "Government Formed: Australian Labor Party";
    } else {
        winnerDiv.style.background = "#222";
        winnerDiv.style.color = "#888";
        winnerDiv.innerText = "Hung Parliament: Negotiations Ongoing";
    }

    // 3. Update Counters
    const totalCounted = totals.alp + totals.lnp + totals.onp + totals.oth;
    const percent = ((totalCounted / TOTAL_SEATS) * 100).toFixed(1);
    document.getElementById('percent-counted').innerText = `${percent}% counted (${totalCounted}/${TOTAL_SEATS})`;

    // 4. Fetch GitHub Time
    try {
        const response = await fetch('https://api.github.com/repos/electoral-commision/election/commits?path=script.
