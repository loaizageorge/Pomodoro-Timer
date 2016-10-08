$(document).ready(function () {
    // Default time used for resets and session transitions 
    var minutes = 25;
    var breakMinutes = 5;
    // The time that is actually decremented    
    var countMinutes = 25;
    var countSeconds = 0;
    // App starts paused and in a work session
    var isWorktime = true;
    var pause = true;
    var countDown; // Is used to store the setInterval function so it can be cleared from anywhere.
    var timesUp = document.getElementById("buzzer");
    updateStartingScreen();
    // Handle Slider logic    
    $('#work-time-slider').slider({
        formatter: function (value) {
            if (pause) {
                // Automatically update the numbers on both the clock(if currently on that session)    
                $("#work-time").html(value);
                $("#timer").html(value + ":00");
                minutes = value;
                countMinutes = value;
                countSeconds = 0;
                return 'Current value: ' + value;
            }
        }
    });
    $('#break-time-slider').slider({
        formatter: function (value) {
            if (pause) {
                $("#break-time").html(value);
                breakMinutes = value;
                countSeconds = 0;
                return 'Current value: ' + value;
            }
        }
    });
    // Handle Reset and Start/Stop buttons
    $("#reset-btn").click(function () {
        clearInterval(countDown);
        pause = true;
        countMinutes = minutes;
        countSeconds = 0;
        $("#start-stop-btn").toggleClass("fa-play-circle fa-pause-circle");
        formatTimer();
    });
    $("#start-stop-btn").click(function () {
        $("#start-stop-btn").toggleClass("fa-play-circle fa-pause-circle");
        if (pause == true) {
            countDown = setInterval(timer, 1000);
            pause = false;
        }
        else {
            clearInterval(countDown);
            pause = true;
        }
    });
    // Increment or Decrement Work and Break Time Buttons
    $("#container-buttons").on("click", "#work-time-decrement", function () {
        if (minutes > 1) {
            minutes--;
            updateStartingScreen();
        }
    });
    $("#container-buttons").on("click", "#work-time-increment", function () {
        if (minutes < 60) {
            minutes++;
            updateStartingScreen();
        }
    });
    $("#container-buttons").on("click", "#break-time-decrement", function () {
        if (breakMinutes > 1) {
            breakMinutes--;
            updateStartingScreen();
        }
    });
    $("#container-buttons").on("click", "#break-time-increment", function () {
        if (breakMinutes < 30) {
            breakMinutes++;
            updateStartingScreen();
        }
    });

    function setTimer() {
        if (isWorktime) {
            countMinutes = minutes;
            countSeconds = 0;
        }
        else if (!isWorktime) {
            countMinutes = breakMinutes;
            countSeconds = 0;
        }
    }

    function timer() {
        printStatus();
        if (countSeconds == 0 && countMinutes == 0) {
            timesUp.play();
            isWorktime = !isWorktime;
            setTimer();
            updateStartingScreen();
            clearInterval(countDown);
            printStatus();
            $("#start-stop-btn").toggleClass("fa-play-circle fa-pause-circle");
            pause = true;
        }
        else if (countSeconds == 0 && countMinutes != 0) {
            countMinutes--;
            countSeconds = 59;
        }
        else {
            countSeconds--;
        }
        formatTimer(countMinutes, countSeconds);
    }

    function formatTimer() {
        if (countMinutes < 10 && countSeconds < 10) {
            $("#timer").html("0" + countMinutes + ":" + "0" + countSeconds);
        }
        else if (countMinutes < 10) {
            $("#timer").html("0" + countMinutes + ":" + countSeconds);
        }
        else if (countSeconds < 10) {
            $("#timer").html(countMinutes + ":" + "0" + countSeconds);
        }
        else {
            $("#timer").html(countMinutes + ":" + countSeconds);
        }
    }

    function printStatus() {
        if (isWorktime) {
            $("#timer-status").html("Get to Work!");
        }
        else {
            $("#timer-status").html("Take a Break");
        }
    }

    function updateStartingScreen() {
        if (pause) {
            if (isWorktime) {
                countMinutes = minutes;
                breakMinutes = breakMinutes;
                countSeconds = 0;
                $("#work-time").html(minutes);
                $("#break-time").html(breakMinutes);
                $("#timer").html(minutes + ":" + "00");
            }
            else {
                countMinutes = breakMinutes;
                $("#work-time").html(minutes);
                $("#break-time").html(breakMinutes);
                $("#timer").html(breakMinutes + ":" + "00");
            }
        }
        else {
            return false;
        }
    }
});