# map-locations
Map out a list of locations, including within a certain radius

## Prompt 1:
I want to build a web page using plain HTML, CSS, JS. 
I have a list of locations and I want to show them as points on a map. 
How may I approach this?
---

That sounds like a fun project! Here's a step-by-step approach to help you get started:

### 1. **Set Up Your HTML Structure**
Create a basic HTML file to hold your map and list of locations.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map of Locations</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Map of Locations</h1>
    <div id="map"></div>
    <script src="script.js"></script>
</body>
</html>
```

### 2. **Style Your Map with CSS**
Add some basic styles to make your map look nice.

```css
/* styles.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#map {
    width: 80%;
    height: 500px;
    margin-top: 20px;
}
```

### 3. **Add JavaScript to Display the Map**
Use JavaScript to integrate a mapping library like Leaflet.js, which is great for displaying maps with markers.

First, include the Leaflet.js library in your HTML file:

```html
<head>
    <!-- Other head elements -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</head>
<body>
    <!-- Other body elements -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</body>
```

Then, add the JavaScript to initialize the map and add markers:

```javascript
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([51.505, -0.09], 13); // Set initial view to a specific location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const locations = [
        { lat: 51.505, lng: -0.09, name: 'Location 1' },
        { lat: 51.515, lng: -0.1, name: 'Location 2' },
        // Add more locations as needed
    ];

    locations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(location.name)
            .openPopup();
    });
});
```

### 4. **Test Your Web Page**
Open your HTML file in a browser to see the map with the locations marked.

Feel free to ask if you need more details or run into any issues! 😊


## Prompt 2:
Thanks! That sounds like a great start. 
Now what if I only want to show the locations from the list that are within say 5 miles of my current location? 
Can Leaflet.js handle that, and if so how?
---

Yes, Leaflet.js can handle filtering locations within a specific radius from your current location. Here's how you can do it:

### 1. **Get the User's Current Location**
Use the browser's Geolocation API to get the user's current location.

```javascript
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    filterLocations(userLat, userLng);
}

function error() {
    console.error('Unable to retrieve your location');
}
```

### 2. **Calculate Distance Between Two Points**
Leaflet.js provides a `distanceTo` method that calculates the distance between two points using the Haversine formula.

### 3. **Filter Locations Within 5 Miles**
Use the `distanceTo` method to filter locations within a 5-mile radius.

```javascript
function filterLocations(userLat, userLng) {
    const userLocation = L.latLng(userLat, userLng);
    const locations = [
        { lat: 51.505, lng: -0.09, name: 'Location 1' },
        { lat: 51.515, lng: -0.1, name: 'Location 2' },
        // Add more locations as needed
    ];

    const filteredLocations = locations.filter(location => {
        const loc = L.latLng(location.lat, location.lng);
        const distance = userLocation.distanceTo(loc);
        return distance <= 8046.72; // 5 miles in meters
    });

    displayLocations(filteredLocations);
}

function displayLocations(locations) {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    locations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(location.name)
            .openPopup();
    });
}
```

### 4. **Integrate Everything**
Make sure to call the `navigator.geolocation.getCurrentPosition` method when the DOM is fully loaded.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    navigator.geolocation.getCurrentPosition(success, error);
});
```

This setup will filter and display only the locations within a 5-mile radius of the user's current location. Let me know if you need any more help! 😊
