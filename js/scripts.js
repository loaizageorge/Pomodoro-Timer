$(document).ready(function () {
    var minutes = 1;
    var breakMinutes = 1;
    
    var countMinutes =1;
    var countSeconds = 0;
    
    var isWorktime = true;
    var pause = false;
    
    var countDown;
    
    
    updateStartingScreen();
    
    $("#start").click(function () {
        if(pause==false){
            countDown=setInterval(timer,1000);
            pause = true;
        }
        else{
            clearInterval(countDown);
            pause = false;
        }
        
    });
    
    // Increment or Decrement Work and Break Time Buttons
    $("#container-buttons").on("click", "#work-time-decrement", function () {
        minutes--;
        updateStartingScreen();
    });
    $("#container-buttons").on("click", "#work-time-increment", function () {
        minutes++;
        updateStartingScreen();
    });
    $("#container-buttons").on("click", "#break-time-decrement", function () {
        breakMinutes--;
        updateStartingScreen();
    });
    $("#container-buttons").on("click", "#break-time-increment", function () {
        breakMinutes++;
        updateStartingScreen();
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

function timer(){
     printStatus();
     if (countSeconds == 0 && countMinutes == 0) {
            isWorktime = !isWorktime;
            setTimer();
            updateStartingScreen();
            clearInterval(countDown);
            printStatus();    
            pause = false;
            
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
    }else{
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
    if(isWorktime){
    countMinutes = minutes;
    breakMinutes = breakMinutes;
    }
    else{
        countMinutes=breakMinutes;
    }
    $("#work-time").html(minutes);
    $("#break-time").html(breakMinutes);
    $("#timer").html(minutes + ":" + "00");
}
});