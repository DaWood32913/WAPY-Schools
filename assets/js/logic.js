$(document).ready(function() {

    L.mapquest.key = 'SAJ3CrNtg2eGqQiCO83uWVQENNY1Fjb1'; //Yukie's API key

    // 'map' refers to a <div> element with the ID map
    // gets the Web MapQuests SDK to display a map

    var map = L.mapquest.map('map', {
      center: [39.952583, -75.165222], //lat and long of Philly
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });
    
    map.addControl(L.mapquest.control());

    var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin=19139&radius=10&maxMatches=30&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|821103&outFormat=json&key=SAJ3CrNtg2eGqQiCO83uWVQENNY1Fjb1"

    // have radius, origin, matches customizable search queries 
    // display markers of where the schools are located per search
    // list of all search results in HTML

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
    
        var radiusResult = response;
        console.log(radiusResult);
    
    });

// Radius Search API with MapQuest
// http://www.mapquestapi.com/search/v2/radius?key=L.mapquest.key&maxMatches=4&origin=39.750307,-104.999472


// Has a school search (k-12) option



})