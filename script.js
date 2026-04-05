// ... existing houseSeats and senateSeats arrays ...

function renderMap() {
    const grid = document.getElementById('map-grid');
    grid.innerHTML = "";
    
    houseSeats.forEach(s => {
        const square = document.createElement('div');
        square.className = `map-square ${s.party}`;
        square.title = `${s.name} - ${s.person}`;
        // Abbreviate name for square
        square.innerText = s.name.substring(0, 3).toUpperCase();
        grid.appendChild(square);
    });
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = (currentView === 'senate' ? senateSeats : houseSeats).filter(s => 
        s.name.toLowerCase().includes(term) || s.person.toLowerCase().includes(term)
    );
    renderList(filtered);
}

// --- Tab Switching ---
document.getElementById('tab-house').onclick = function() {
    switchTab('house');
};

document.getElementById('tab-house-map').onclick = function() {
    switchTab('map');
};

document.getElementById('tab-senate').onclick = function() {
    switchTab('senate');
};

function switchTab(view) {
    currentView = view;
    // Reset Actives
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('house-view').style.display = 'none';
    document.getElementById('map-view').style.display = 'none';
    document.getElementById('senate-view').style.display = 'none';

    if(view === 'house') {
        document.getElementById('tab-house').classList.add('active');
        document.getElementById('house-view').style.display = 'block';
        renderList(houseSeats);
    } else if(view === 'map') {
        document.getElementById('tab-house-map').classList.add('active');
        document.getElementById('map-view').style.display = 'block';
        renderMap();
    } else {
        document.getElementById('tab-senate').classList.add('active');
        document.getElementById('senate-view').style.display = 'block';
        renderSenateHorshoe();
        renderList(senateSeats);
    }
}

document.getElementById('seat-search').oninput = handleSearch;

// Init
window.onload = () => {
    fetchEditTime();
    switchTab('house');
};
