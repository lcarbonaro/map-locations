// https://leafletjs.com/examples/quick-start/



document.addEventListener('DOMContentLoaded', () => {
    const usrLatLng = [44.23141937022383,-76.4809833928344];  // Kingston, Ontario
    const userLocation = L.latLng(usrLatLng[0],usrLatLng[1]);  
    
    const locations = [        
        {
            name: "Fiancée Jewellers",
            address: "216 Princess Street",
            city: "Kingston",
            province: "Ontario",
            postalCode: "K7L 1B2",
            phone: "613.542.8112",
            email: "fianceejewellery@gmail.com",
            website: "https://fiancee-jewellers.myshopify.com/pages/about-us",
            lat: 44.23223429415999,
            lng: -76.48632978953931
        },
        {
            name: "Frontenac Jewellers",
            address: "186 Princess Street",
            city: "Kingston",
            province: "ON",
            postalCode: "K7L 1B1",
            phone: "(613) 542-4666",
            email: null,
            website: "https://www.frontenacjewellers.com/",
            lat: 44.23203799472413,
            lng: -76.4854235165222
        },
        {
            name: "Paul Randolph Jewellers",
            address: "303 Bagot St. Lasalle Mews",
            city: "Kingston",
            province: "ON",
            postalCode: null,
            phone: "(613) 549-0777",
            email: null,
            website: "https://www.paulrandolph.ca/contact/",
            lat: 44.23250699337642,
            lng: -76.4838363318669
        },
        {
            name: "Cobico Jewellers",
            address: "637 Norris Crt Unit 7,",
            city: "Kingston",
            province: "ON",
            postalCode: "K7P 2R9",
            phone: "(613) 384-2996",
            email: "cobicojewellers@hotmail.com",
            website: "https://www.cobicojewellers.com/",
            lat: 44.26281457312589,
            lng: -76.56833943186558
        },
        {
            name: "Woodley's Jewellers",
            address: "109 King St E,",
            city: "Gananoque",
            province: "ON",
            postalCode: "K7G 1G3",
            phone: "613-382-3202",
            email: null,
            website: "https://woodleys.barkbuilder.com/en/home/",
            lat: 44.329863338692014,
            lng: -76.16204947419003
        },

        // Add more locations as needed

    ];
    
    let distMiles = document.querySelector('input').value; // distance in miles
    let map;

    document.querySelector('input').addEventListener('input', (event) => {
        distMiles = event.target.value; // distance in miles
        console.log(`Distance: ${distMiles} miles`);
        drawMap(); // Redraw the map with the new distance
    });
        
    drawMap(); // Initial map draw

    function drawMap() {  
        if (map) {
            map.remove(); // Remove the existing map instance
        }      
        map = L.map('map').setView(usrLatLng, 13); // Set initial view to a specific location

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const filteredLocations = locations.filter(location => {
            const loc = L.latLng(location.lat, location.lng);
            const distance = userLocation.distanceTo(loc);
            return distance <= distMiles * 1609; // distance in meters
        });
        
        displayLocations(filteredLocations);
        
        function displayLocations(locations) {
            locations.forEach(location => {
                L.marker([location.lat, location.lng]).addTo(map)
                    .bindPopup(location.name)
                    .openPopup();
            });
        }  // function displayLocations()        
        
    }  // function drawMap()
    
});