$(document).ready(function() {
  L.mapquest.key = "t7tjvfXYnZqurjibcReSbSdBdd678z5W";

  var map = L.mapquest.map("map", {
    center: [41.409, -75.6624],
    layers: L.mapquest.tileLayer("map"),
    zoom: 12
  });

  map.addControl(L.mapquest.control());

  $("#submit").on("click", function(e) {
    e.preventDefault();

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

      var userLat = response.origin.latLng.lat;
      var userLng = response.origin.latLng.lng;
      console.log(userLat);
      console.log(userLng);
      map.setView([userLat, userLng]);

      // map.addControl(L.mapquest.control());

      for (i = 0; i < response.searchResults.length; i++) {
        console.log(response.searchResults[i].shapePoints[0]);
        console.log(response.searchResults[i].shapePoints[1]);

        L.marker([
          response.searchResults[i].shapePoints[0],
          response.searchResults[i].shapePoints[1]
        ])
          .addTo(map)
          .bindPopup("<strong>" + response.searchResults[i].name + "</strong>")
          .openPopup();
       }
       L.popup()
       .on("click", function(evt){
         evt.preventDefault();
         var schoolName = $(this).getContent("");
         console.log(schoolName);
       })
    });
  });

  // $(".leaflet-popup").on("click", function (event){
  //   event.preventDefault();
  //   schoolName = $(this).schoolName.val().trim();
  //   console.log(schoolName);
  // })
  // Radius Search API with MapQuest
  // http://www.mapquestapi.com/search/v2/radius?key=L.mapquest.key&maxMatches=4&origin=39.750307,-104.999472
});
