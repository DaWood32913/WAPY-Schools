// $(document).ready(function() {

//     L.mapquest.key = 'SAJ3CrNtg2eGqQiCO83uWVQENNY1Fjb1'; //Yukie's API key

//     // 'map' refers to a <div> element with the ID map
//     // gets the Web MapQuests SDK to display a map

//     var map = L.mapquest.map('map', {
//       center: [39.952583, -75.165222], //lat and long of Philly
//       layers: L.mapquest.tileLayer('map'),
//       zoom: 12
//     });
    
//     map.addControl(L.mapquest.control());

//     // taking user input values
//     var location = $(".location").val();
//     var numOfMatches = $(".numOfMatches").val();
//     var radius = $(".userRadius").val();
    
//     var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + location + "&radius=" + radius + "&maxMatches=" + numOfMatches + "&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|821103&outFormat=json&key=" + L.mapquest.key;

//     // have radius, origin, matches customizable search queries 
//     // display markers of where the schools are located per search
//     // list of all search results in HTML
    
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//     .then(function(response) {
    
//         var radiusResult = response;
//         console.log(radiusResult);
    
//     });

// // Radius Search API with MapQuest
// // http://www.mapquestapi.com/search/v2/radius?key=L.mapquest.key&maxMatches=4&origin=39.750307,-104.999472


// // Has a school search (k-12) option

// })

$(document).ready(function() {
    // L.mapquest.
    key = "t7tjvfXYnZqurjibcReSbSdBdd678z5W";
   
    // ‘map’ refers to a <div> element with the ID map
    // gets the Web MapQuests SDK to display a map
   
    $("#submit").on("click", function(e) {

      console.log("aaron");

      e.preventDefault();
      
      userArea = $("#userArea").val();
      zipCode = $("#zipcode").val();
      radius = $("#radius").val();
      results = $("#results").val();

      console.log(userArea);
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
        key;
    //   L.mapquest.key = "t7tjvfXYnZqurjibcReSbSdBdd678z5W";
      //“https://www.mapquestapi.com/search/v2/radius?key=” + key + “&maxMatches=10&origin=” + zipCode + “&hostedData=mqap.ntpois|group_sic_code=?|821103&outFormat=json”;
   
    //   var map = L.mapquest.map(“map”, {
    //     center: [39.952583, -75.165222], //lat and long of Philly
    //     layers: L.mapquest.tileLayer(“map”),
    //     zoom: 12
    //   });
    //   map.addControl(L.mapquest.control()); //
    //   // have radius, origin, matches customizable search queries
    //   // display markers of where the schools are located per search
    //   // list of all search results in HTML
   
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // console.log(radiusResult);
        //for (var i =0; i < response.)
      });
    });
   
    // Radius Search API with MapQuest
    // http://www.mapquestapi.com/search/v2/radius?key=L.mapquest.key&maxMatches=4&origin=39.750307,-104.999472
   
    // Has a school search (k-12) option
   });