L.mapquest.key = 'SAJ3CrNtg2eGqQiCO83uWVQENNY1Fjb1'; //Yukie's API key

// 'map' refers to a <div> element with the ID map
// gets the Web MapQuests SDK to display a map
var map = L.mapquest.map('map', {
  center: [39.952583, -75.165222], //lat and long of Philly
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

map.innerHTML(L.mapquest.control());

// Radius Search API with MapQuest
// http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=39.750307,-104.999472
// Has a school search (k-12) option