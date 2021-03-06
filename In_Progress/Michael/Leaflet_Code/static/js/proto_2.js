function createMap(bothRests, dogRests, wheelRests) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "streetmap":streetmap
  };

  // Create an overlayMaps object to hold the each Restaurant layer
  var overlayMaps_both = {
    "Both Service Dog & Wheelchair Restaurants": bothRests
  };

  // Create an overlayMaps object to hold the Both Restaurants layer
  var overlayMaps_dog = {
    "Service Dog Friendly Restaurants": dogRests,
  };

  // Create an overlayMaps object to hold the Both Restaurants layer
  var overlayMaps_wheel = {
    "Wheelchair Accessible Restaurants": wheelRests,
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [37.7749, -122.4194],
    zoom: 12,
    layers: [lightmap, streetmap, bothRests, dogRests, wheelRests]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps_both, overlayMaps_dog, overlayMaps_wheel, {
    collapsed: false
  }).addTo(map);
}

function createMarkers_both(response) {

  // Pull the "name" property off of response.features
  var both_rests = response.features;

  // Initialize an array to hold "both"restaurant markers
  var bothrestMarkers = [];

  // Loop through the both_rests array
  for (var index = 0; index < both_rests.length; index++) {
    var both = both_rests[index];
    

    // For each restaurant, create a marker and bind a popup with the station's name
    var bothrestMarker = L.marker([both.geometry.coordinates[1], both.geometry.coordinates[0]])
      .bindPopup("<h3>" + both.properties.name + "<h3><h3>Neighborhood: " + both.properties.neighborhood + "<h3>");

    // Add the marker to the restMarkers array
    bothrestMarkers.push(bothrestMarker);
  }
    // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bothrestMarkers));
}
/////
function createMarkers_dog(response) {

    // Pull the "name" property off of response.features
    var dog_rests = response.features;
  
    // Initialize an array to hold "both"restaurant markers
    var dogrestMarkers = [];
  
    // Loop through the both_rests array
    for (var index = 0; index < dog_rests.length; index++) {
      var dog = dog_rests[index];
      
  
      // For each restaurant, create a marker and bind a popup with the station's name
      var dogrestMarker = L.marker([dog.geometry.coordinates[1], dog.geometry.coordinates[0]])
        .bindPopup("<h3>" + dog.properties.name + "<h3><h3>Neighborhood: " + dog.properties.neighborhood + "<h3>");
  
      // Add the marker to the restMarkers array
      dogrestMarkers.push(dogrestMarker);
    }
      // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(dogrestMarkers));
  }
/////
function createMarkers_wheel(response) {

    // Pull the "name" property off of response.features
    var wheel_rests = response.features;
  
    // Initialize an array to hold "both"restaurant markers
    var wheelrestMarkers = [];
  
    // Loop through the both_rests array
    for (var index = 0; index < wheel_rests.length; index++) {
      var wheel = wheel_rests[index];
      
  
      // For each restaurant, create a marker and bind a popup with the station's name
      var wheelrestMarker = L.marker([wheel.geometry.coordinates[1], wheel.geometry.coordinates[0]])
        .bindPopup("<h3>" + wheel.properties.name + "<h3><h3>Neighborhood: " + wheel.properties.neighborhood + "<h3>");
  
      // Add the marker to the restMarkers array
      wheelrestMarkers.push(wheelrestMarker);
    }
      // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(wheelrestMarkers));
  }
////
// Reference Both Restaurants JSON to get restaurant information. Call createMarkers when complete
d3.json("static/js/both_dog_wc_geojson.json", createMarkers_both);
// Reference Both Restaurants JSON to get restaurant information. Call createMarkers when complete
d3.json("static/js/both_dog_wc_geojson.json", createMarkers_dog);
// Reference Both Restaurants JSON to get restaurant information. Call createMarkers when complete
d3.json("static/js/both_dog_wc_geojson.json", createMarkers_wheel);

