const houseData = [
    { name: "Melbourne", person: "Bounty", party: "alp", swing: "33.3% Gain", margin: 33.3, date: 1 },
    { name: "Kooyong", person: "Bumuncha", party: "onp", swing: "50.0% Gain", margin: 50.0, date: 2 },
    { name: "Higgins", person: "Thecone", party: "alp", swing: "50.0% Gain", margin: 50.0, date: 3 },
    { name: "Chisholm", person: "Triple G gaming", party: "onp", swing: "100% Gain", margin: 100.0, date: 4 },
    { name: "Macnamara", person: "itsmerealdd", party: "onp", swing: "100% Gain", margin: 100.0, date: 5 },
    { name: "Maribyrnong", person: "2023 Toyota Camry", party: "lnp", swing: "100% Gain", margin: 100.0, date: 6 }
];

let currentView = 'house';
let currentSort = 'latest';

function renderList(data = houseData) {
    const container = document.getElementById('list-container');
    container.innerHTML = "";
    
    // Apply Sorting
    let sorted = [...data];
    if (currentSort === 'az') sorted.sort((a,b) => a.name.localeCompare(b.name));
    else if (currentSort === 'latest') sorted.sort((a,b) => b.date - a.date);
    else if (currentSort === 'margin') sorted.sort((a,b) => b.margin - a.margin);

    sorted.forEach(s => {
        container.innerHTML += `
            <div class="seat-card">
                <div>
                    <div class="s-name">${s.name}</div>
                    <div class="s-person">${s.person}</div>
                    <div class="s-badge" style="color:var(--${s.party})">${s.party.toUpperCase()} GAIN</div>
                </div>
                <div class="s-swing">${s.swing}</div>
            </div>`;
    });
}

function renderHexMap() {
    const grid = document.getElementById('hex-grid');
    grid.innerHTML = "";
    houseData.forEach(s => {
        const div = document.createElement('div');
        div.className = `hex ${s.party}`;
        div.innerText = s.name.substring(0,2).toUpperCase();
        // Click to filter list by this seat
        div.onclick = () => renderList([s]);
        grid.appendChild(div);
    });
}

// Event Listeners for Buttons
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        document.getElementById('house-view').style.display = view === 'house' ? 'block' : 'none';
        document.getElementById('map-view').style.display = view === 'map' ? 'block' : 'none';
        if (view === 'map') renderHexMap();
        renderList();
    };
});

document.querySelectorAll('.chip-mini').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.chip-mini').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.dataset.sort;
        renderList();
    };
});

document.getElementById('seat-search').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = houseData.filter(s => s.name.toLowerCase().includes(term) || s.person.toLowerCase().includes(term));
    renderList(filtered);
};

// Initial Run
window.onload = () => renderList();
