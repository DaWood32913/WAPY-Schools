$(document).ready(function() {
  // L.mapquest api key
  L.mapquest.key = "t7tjvfXYnZqurjibcReSbSdBdd678z5W";

  var map = L.mapquest.map("map", {
    center: [41.409, -75.6624],
    layers: L.mapquest.tileLayer("map"),
    zoom: 12
  });

  map.addControl(L.mapquest.control());

  // ‘map’ refers to a <div> element with the ID map
  // gets the Web MapQuests SDK to display a map

  $("#submit").on("click", function(e) {
    e.preventDefault();

    // function resetMap() {
    //   zipCode = "";
    //   radius = "";
    //   results = "";
    //   userLat = "";
    //   userLng = "";
    //   map = "";
    //   $("#map").empty();
    //   $(".jumbotron").empty();
    // }
    // have radius, origin, matches customizable search queries
    zipCode = $("#zipcode")
      .val()
      .trim();
    radius = $("#radius")
      .val()
      .trim();
    results = $("#results")
      .val()
      .trim();

    console.log(zipCode);
    console.log(radius);
    console.log(results);

      var queryURL =
        "https://www.mapquestapi.com/search/v2/radius?origin=" +
        zipCode +
        "&radius=" +
        radius +
        "&maxMatches=" +
        results +
        "&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|821103&outFormat=json&key=" +
        L.mapquest.key;
   
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        //for (var i =0; i < response.)

        // variables for user values of coordinates
        var userLat = response.origin.latLng.lat;
        var userLng = response.origin.latLng.lng;
        
        // displays mapqiest map
          var map = L.mapquest.map("map", {
            center: [userLat, userLng], //lat and long of Philly
            layers: L.mapquest.tileLayer("map"),
            zoom: 12
          });

          map.addControl(L.mapquest.control());
          
          for (i = 0; i < response.searchResults.length; i++) {
        // var markerLat = response.searchResults.shapePoints;
        // var markerLng = response.searchResults.shapePoints; // displays mapqiest map
        console.log(response.searchResults[i].shapePoints[0]);
        console.log(response.searchResults[i].shapePoints[1]);
        // console.log(markerLng);
        L.marker([response.searchResults[i].shapePoints[0], response.searchResults[i].shapePoints[1]])
          .addTo(map)
          .bindPopup("<strong>" + response.searchResults[i].name + "</strong>")
          .openPopup();
      }
      });
      for (i = 0; i < response.searchResults.length; i++) {
        // var markerLat = response.searchResults.shapePoints;
        // var markerLng = response.searchResults.shapePoints; // displays mapqiest map
        // console.log(response.searchResults[i].shapePoints[0]);
        // console.log(response.searchResults[i].shapePoints[1]);
        // console.log(markerLng);
        L.marker([response.searchResults[i].shapePoints[0], response.searchResults[i].shapePoints[1]])
        .bindPopup("<strong>" + response.searchResults[i].name + "</strong>")
        //  .on("popup", function (popup){
        //    console.log(popup.getContent());
        //  }) 
        .addTo(map)
          // .openPopup();
      }

    });
    
  });
  $(".leaflet-popup").on("click", function (event){
    event.preventDefault();
    schoolName = $(this).schoolName.val().trim();
    console.log(schoolName);
  })
  // Radius Search API with MapQuest
  // http://www.mapquestapi.com/search/v2/radius?key=L.mapquest.key&maxMatches=4&origin=39.750307,-104.999472
});
