$(document).ready(function(){
    var minutes=25;
    var breakMinutes=5;
    var isWorktime = true;
    var started = false;
    $("#timer").html(minutes+":"+"00");
    
$("#start").click(function(){
    
    newTimer(minutes,breakMinutes,isWorktime);
   

});  
});

function newTimer(minutes,breakMinutes,isWorktime){
    if(isWorktime){
    var countMinutes = minutes;
    var countSeconds = 0;
    }
    else if(!isWorktime){
    var countMinutes = breakMinutes;
    var countSeconds = 0; 
    }
    var countDown = function(){
        if(countSeconds==0 && countMinutes==0){
            clearInterval(setIntervalID);
            isWorktime = !isWorktime;
            newTimer(minutes,breakMinutes,isWorktime);
            
        } else if(countSeconds==0 && countMinutes!=0){
            countMinutes--;
            countSeconds = 59;
            
        } else{
            countSeconds--;
        }
        formatTimer(countMinutes,countSeconds);
        //$("#timer").html(minutes+":"+seconds);     
    };
    clearInterval(setIntervalID);  
    printStatus(isWorktime);
    formatTimer(countMinutes,countSeconds);
    var setIntervalID = setInterval(countDown,1000);
    

};

function formatTimer(minutes,seconds){
    if(minutes<10 && seconds<10){
         $("#timer").html("0"+minutes+":"+"0"+seconds);
    }else if(minutes<10){
         $("#timer").html("0"+minutes+":"+seconds);
    }else if(seconds<10){
         $("#timer").html(minutes+":"+"0"+seconds);
    }else{
     $("#timer").html(minutes+":"+seconds);
    }
};

function printStatus(isWorkTime){
    if(isWorkTime){
        $("#timer-status").html("Get to Work!");
    }
    else{
        $("#timer-status").html("Take a Break");
    }
};
