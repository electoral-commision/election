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
let current
