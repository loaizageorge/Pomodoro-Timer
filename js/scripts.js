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
    
    // Variables used for the count down animation
    var percentPerSecond = convertToPercent(countMinutes);
    var totalPercent = 100;
    var timePercent = totalPercent+"%";
    
    $(".fill").css("height",timePercent);
    
    updateStartingScreen();
    // Handle Slider logic
    $('#work-time-slider').slider();
    $('#break-time-slider').slider();
    
    $('#work-time-slider').on("slide", function(slideEvt) {
	$('#work-time-slider-value').text(slideEvt.value);
    minutes = slideEvt.value;
    //countMinutes = minutes;
    if(isWorktime){
        percentPerSecond = convertToPercent(minutes);
    }    
    
    updateStartingScreen();

});
    
    $('#break-time-slider').on("slide", function(slideEvt) {
	$('#break-time-slider-value').text(slideEvt.value);
        breakMinutes = slideEvt.value;
        if(!isWorktime){
            percentPerSecond = convertToPercent(breakMinutes);
        }
        updateStartingScreen();

});

    

    // Handle Reset and Start/Stop buttons
    $("#reset-btn").click(function () {
        if(minutes!=countMinutes){
        clearInterval(countDown);
        pause = true;
        countSeconds = 0;
        $("#start-stop-btn").toggleClass("fa-play-circle fa-pause-circle");
        enableSliders();
            if(isWorktime){
                 countMinutes = minutes;
                 transitionToWork();
            }else{
                 countMinutes = breakMinutes;
                 transitionToBreak();
            }
            formatTimer();
        if($("#start-stop-btn").hasClass("fa-pause-circle")){
            $("#start-stop-btn").toggleClass("fa-pause-circle fa-play-circle ");
        }
        }
    });
    $("#start-stop-btn").click(function () {
        $("#start-stop-btn").toggleClass("fa-play-circle fa-pause-circle");
        if (pause == true) {
            countDown = setInterval(timer, 1000);
            disableSliders();
            pause = false;
        }
        else {
            clearInterval(countDown);
            enableSliders();
            pause = true;
        }
    });

    function setTimer() {
        if (isWorktime) {
            countMinutes = minutes;
            countSeconds = 0;
           transitionToWork();
        }
        else if (!isWorktime) {
            countMinutes = breakMinutes;
            countSeconds = 0;
             transitionToBreak();
            
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
            enableSliders();
            pause = true;
        }
        else if (countSeconds == 0 && countMinutes != 0) {
            countMinutes--;
            countSeconds = 59;
        }
        else {
            countSeconds--;
            fillUpCircle();
        }
        
        formatTimer(countMinutes, countSeconds);
    }

    function formatTimer() {
        if (countMinutes < 10 && countSeconds < 10) {
            $("#time").html("0" + countMinutes + ":" + "0" + countSeconds);
        }
        else if (countMinutes < 10) {
            $("#time").html("0" + countMinutes + ":" + countSeconds);
        }
        else if (countSeconds < 10) {
            $("#time").html(countMinutes + ":" + "0" + countSeconds);
        }
        else {
            $("#time").html(countMinutes + ":" + countSeconds);
        }
    }

    function printStatus() {
        if (isWorktime) {
            $("#timer-status").html("Focus on your work!");
            
             
        }
        else {
            $("#timer-status").html("Take a deep breath and relaaaax.."); 
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
                $("#time").html(minutes + ":" + "00");
                
                
            }
            else {
                countMinutes = breakMinutes;
                $("#work-time").html(minutes);
                $("#break-time").html(breakMinutes);
                $("#time").html(breakMinutes + ":" + "00");
            }
        }
        else {
            return false;
        }
    }
    
    function transitionToBreak(){
        $(".circle").css("background","rgb(248, 99, 99)");
        $(".fill").css("background","rgb(41, 221, 41)");
        percentPerSecond = convertToPercent(breakMinutes);
        totalPercent = 100;
        timePercent = totalPercent+"%";
        $(".fill").css("height",timePercent);
       
    }
    
    function transitionToWork(){
        $(".circle").css("background","rgb(41, 221, 41)");
        $(".fill").css("background","rgb(248, 99, 99)");
        percentPerSecond = convertToPercent(minutes);
        totalPercent = 100;
        timePercent = totalPercent+"%";
        $(".fill").css("height",timePercent);
        
    }
    
    function enableSliders(){
         $('#work-time-slider').slider("enable");
         $('#break-time-slider').slider("enable");
    }
    
    function disableSliders(){
         $('#work-time-slider').slider("disable");
         $('#break-time-slider').slider("disable");
    }
    /*************CIRCLE PROGRESS LOGIC ************/
    function convertToPercent(timeInMinutes) {
        var percentOfASecond = 100 / (timeInMinutes*60);
        percentOfASecond = (percentOfASecond.toFixed(4)) / 1;
        return percentOfASecond;
    }

    function fillUpCircle() {
        totalPercent = totalPercent - percentPerSecond;
        var percent = totalPercent + "%";
        $(".fill").css("height", percent);
    }

});