// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.feature object to the createfeature function
  console.log(data);
  var earthquakes = data;
  for (var i = 0; i < earthquakes.length; i++) {

    // Conditionals for earthquakes points
    var color = "";
    if (earthquakes[i].feature.properties.mag > 6) {
      color = "yellow";
    }
    else if (earthquakes[i].feature.properties.mag > 5.5) {
      color = "blue";
    }
    else if (earthquakes[i].feature.properties.mag > 5) {
      color = "green";
    }
    else {
      color = "red";
    }
  
    // Add circles to map
    L.circle(earthquakes[i].feature.geometry.coordinates, {
      fillOpacity: 0.75,
      color: "black",
      fillColor: color,
      // Adjust radius
      radius: earthquakes[i].feature.properties.mag * 500
    }).bindPopup("<h1>" + earthquakes[i].feature.properties.place + "</h1> <hr> <h3>Points: " + new Date(earthquakes[i].feature.properties.time) + "</h3>").addTo(myMap);
  }
});