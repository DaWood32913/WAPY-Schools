$(document).ready(function() {
  // =================================================================
  //              CODE THAT WE NEED TO USE for FIREBASE   (start of code)
  // ======================================================================
  var firebaseConfig = {
    apiKey: "AIzaSyCAZFgMB7e3742Byngzlg7Zni_YAWCGIcg",
    authDomain: "schoolsearchteamproject.firebaseapp.com",
    databaseURL: "https://schoolsearchteamproject.firebaseio.com",
    projectId: "schoolsearchteamproject",
    storageBucket: "schoolsearchteamproject.appspot.com",
    messagingSenderId: "115968045002",
    appId: "1:115968045002:web:ba31da0a72e159ea"
  };

  // // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // // Reference to the database we're writing to.
  var database = firebase.database();

  database.ref().on(
    "value",
    function(snapshot) {
      // Log everything that's coming out of snapshot
      // console.log(snapshot.val());

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  // ======================================================================
  // Create Firebase event for adding train to the database and a row in the html when a user
  // adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store data in variables

    var schoolName = childSnapshot.val().schoolName;
    var schoolType = childSnapshot.val().schoolType;
    var schoolWeb = childSnapshot.val().schoolWeb;

    $("table")
      .find("tbody")
      .append(
        [
          "<tr>",
          "<td>" + schoolName + "</td>",
          "<td>" + schoolType + "</td>",
          "<td>" + schoolWeb + "</td>",
          "</tr>"
        ].join("")
      );
  });
  // var four = childSnapshot.val().four;
  // var five = childSnapshot.val().five;
  // var six = childSnapshot.val().six;

  // console.log(one);
  // console.log(two);
  // console.log(three);
  // console.log(four);
  // console.log(five);
  // console.log(six);

  // Creates the new Row of data

  // $("#table > tbody").append(
  //   "<tr><td>" +
  //     one +
  //     "</td><td>" +
  //     two +
  //     "</td><td>" +
  //     three +
  //     "</td><td>" +
  //     four +
  //     "</td><td>" +
  //     five +
  //     "</td></tr>"
  // );
  // });

  // database.ref().on("value", function(snapshot) {});

  // =================================================================
  //              CODE THAT WE MIGHT NEED TO USE    (end of code)
  // ======================================================================

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

    // console.log(zipCode);
    // console.log(radius);
    // console.log(results);

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
      var state = response.origin.adminArea3;
      console.log(state);
      // console.log(userLat);
      // console.log(userLng);
      map.setView([userLat, userLng]);

      // map.addControl(L.mapquest.control());

      for (i = 0; i < response.searchResults.length; i++) {
        // console.log(response.searchResults[i].shapePoints[0]);
        // console.log(response.searchResults[i].shapePoints[1]);

        L.marker([
          response.searchResults[i].shapePoints[0],
          response.searchResults[i].shapePoints[1]
        ])
          .addTo(map)
          .bindPopup("<strong>" + response.searchResults[i].name + "</strong>")
          .openPopup();
      }

      $(".leaflet-popup").on("click", function(evt) {
        evt.preventDefault();

        var school = $(this)
          .find(".leaflet-popup-content")
          .text();

        console.log(school);

        var schoolURL =
          "https://api.schooldigger.com/v1.2/schools?st=" +
          state +
          "&q=" +
          school +
          "&qSearchSchoolNameOnly=true&appID=55dad4c8&appKey=8512eecb93df3e030cb4b4da02440018";

        $.ajax({
          url: schoolURL,
          method: "GET"
        }).then(function(resp) {
          console.log(resp);

          $("table")
            .find("tbody")
            .html(
              [
                "<tr:last>",
                "<td>" + resp.schoolList[0].schoolName + "</td>",
                "<td>" + resp.schoolList[0].schoolLevel + "</td>",
                "<td>" + resp.schoolList[0].url + "</td>",
                "</tr>"
              ].join("")
            );
          $("#favorite").on("click", function(testFirebase) {
            testFirebase.preventDefault();

            // Initial Values
            var schoolName = resp.schoolList[0].schoolName;
            var schoolType = resp.schoolList[0].schoolLevel;
            var schoolWeb = resp.schoolList[0].url;

            database.ref().push({
              schoolName: schoolName,
              schoolType: schoolType,
              schoolWeb: schoolWeb
            });
          });
        });
      });
    });
  });
});
