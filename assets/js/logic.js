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

  $("#submit").on("click", function(testFirebase) {
    testFirebase.preventDefault();

    // Initial Values
    var zippy = "";

    zippy = $("#zipcode")
      .val()
      .trim();
    database.ref().set({
      zippy: zippy
    });
  });

  database.ref().on(
    "value",
    function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().zippy);

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  // ======================================================================
  // Create Firebase event for adding train to the database and a row in the html when a user
  // adds an entry
  // database.ref().on("child_added", function(childSnapshot) {
  //   console.log(childSnapshot.val());

  // Store data in variables

  // var one = childSnapshot.val().one;
  // var two = childSnapshot.val().two;
  // var three = childSnapshot.val().three;
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
