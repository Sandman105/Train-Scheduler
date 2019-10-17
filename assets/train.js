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
    var firstTrainTime = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10,"years").format("X");
    var trainFrequency = $("#train-frequency").val().trim();
    var trainTrack = $("#train-track").val().trim();
    console.log(firstTrainTime);
    //If we don't return false, it will reload the page.
    

    //So the empty values in the object will hold the user input.
    var newTrainEmpty = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency,
        trackLocation: trainTrack,
    };

    //Seeing new values in console.log, no errors
    console.log(newTrainEmpty);

    trainDatabase.ref().push(newTrainEmpty);

    alert("Train Added");

    //Again, like we have been doing in all of our activities and I'm more focused on doing for each piece of code, console.log to see if I'm getting the right output.

    console.log(newTrainEmpty.name);
    console.log(newTrainEmpty.destination);
    console.log(newTrainEmpty.firstTrain);
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
    var trainDestination = dbSnapshot.val().destination;
    var firstTrainTime = dbSnapshot.val().firstTrain;
    var trainFrequency = dbSnapshot.val().frequency;
    var trainTrack = dbSnapshot.val().trackLocation;

    console.log("------These are the values returned from firebase------");
    console.log("This is the train name submitted by user: " + trainName);
    console.log("This is the train destination submitted by user: " + trainDestination);
    console.log("This is the first train time submitted by user: " + firstTrainTime);
    console.log("This is the train frequency submitted by user: " + trainFrequency);
    console.log("This is the track number submitter by user: " + trainTrack);

    var remainder = moment().diff(moment.unix(firstTrainTime), "minutes")%trainFrequency;
    var minutes = trainFrequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log("This is the remainder: " + remainder);
    console.log("This is how many minutes to next train: " + minutes);
    console.log("This is when the train arrives: " + arrival);

    
    //Convert string to start time moment object.
    //var firstArrival //Need to look up moment conversion

    //Need to get current time.
    //var currentTime
    
    //subtracted current time from start time
    //var difference = currentTime - firstArrival 

    //Divide the difference in minutes
    //Check if that difference is a whole numeber.
        //if true, train arrives right now
        //if else
            //round the number up, the difference divided by the minutes * frequency = time arrival of next train. 


    //var firstTrainTimeClean = moment.unix(firstTrainTime).format("HH:mm");
    //console.log(firstTrainTimeClean);


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(arrival),
        $("<td>").text(minutes),
        $("<td>").text(trainTrack),
      );

      $("#add-train > tbody").append(newRow);


});   