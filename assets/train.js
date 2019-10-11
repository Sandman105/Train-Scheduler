//As we've been talking about, these first three parts are the skeleton, we'll use this format again.

var firebaseConfig = {
    apiKey: "AIzaSyC70r8vIlqpDVryfO9F3b7pVlV9K9PgxtQ",
    authDomain: "train-schedule-f9a80.firebaseapp.com",
    databaseURL: "https://train-schedule-f9a80.firebaseio.com",
    projectId: "train-schedule-f9a80",
    storageBucket: "",
    messagingSenderId: "892687017487",
    appId: "1:892687017487:web:1a1ecd947cb1fb2101657a",
    measurementId: "G-NKSZTF31P7"
};

firebase.initializeApp(firebaseConfig);

var trainDatabase = firebase.database();




//CLICK FUNCTION===============================================================

$("#submit-train").on("click", function (event) {

    event.preventDefault();
    console.log("Test submit: " + event);

    //So when the click happens, we need to create a new row. So reference the table body class "add-train"

    //Can I create an array that holds the <tr> and <td> with an empty value for each piece of <td>, six <td> total, and then reference that index of each individual element for each variable value, for trainName.

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    var trainTrack = $("#train-track").val().trim();

    //So the empty values in the object will hold the user input.
    var newTrainEmpty = {
        name: trainName,
        location: trainDestination,
        newArrival: firstTrainTime,
        frequency: trainFrequency,
        trackLocation: trainTrack,
    };

    //Seeing new values in console.log, no errors
    console.log(newTrainEmpty);

    trainDatabase.ref().push(newTrainEmpty);

    //Again, like we have been doing in all of our activities and I'm more focused on doing for each piece of code, console.log to see if I'm getting the right output.

    console.log(newTrainEmpty.name);
    console.log(newTrainEmpty.location);
    console.log(newTrainEmpty.newArrival);
    console.log(newTrainEmpty.frequency);
    console.log(newTrainEmpty.trackLocation);

    //As we did in other examples in our activities, clear out the values that were entered, so start a new set of values. Tested, values cleared after submitting new values.
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train-time").val("");
    $("#train-frequency").val("");
    $("#train-track").val("");

});

//child_added event is typically used when retrieving a list of items from the database. Checking the console.log, seeing the items that were already added, returned.
trainDatabase.ref().on("child_added", function (dbSnapshot) {
    console.log("---------------")
    console.log(dbSnapshot.val());

    var trainName = dbSnapshot.val().name;
    var trainDestination = dbSnapshot.val().location;
    var firstTrainTime = dbSnapshot.val().newArrival;
    var trainFrequency = dbSnapshot.val().frequency;
    var trainTrack = dbSnapshot.val().trackLocation;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
    console.log(trainTrack);

    var firstTrainTimeClean = moment.unix(firstTrainTime).format("HH");
    console.log(firstTrainTimeClean);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrainTimeClean),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainTrack),
      );

      $("#add-train > tbody").append(newRow);


});   